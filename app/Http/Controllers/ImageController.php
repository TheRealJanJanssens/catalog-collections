<?php

namespace App\Http\Controllers;

use App\Http\Requests\Images\StoreRequest;
use App\Http\Requests\Images\UpdateRequest;
use App\Models\Annotation;
use App\Models\Image;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(StoreRequest $request)
    {
        try {
            // Handle polymorphic relationship data
            $imageableType = $request->input('imageable_type');
            $imageableId = $request->input('imageable_id');

            $uploadedImages = [];

            // Loop through each uploaded image
            foreach ($request->file('images') as $index => $imageFile) {
                $path = $imageFile->store('uploads', 'public'); // Store the image

                // Handle annotation (if provided)
                $annotationContent = $request->input("annotations.$index");
                $annotation = $annotationContent
                    ? Annotation::create(['content' => $annotationContent])  // Create annotation if provided
                    : null;

                // Store the image details in the database
                $imageModel = Image::create([
                    'path' => $path,
                    'annotation_uuid' => $annotation ? $annotation->id : null,  // Link to annotation
                    'rotation' => $request->input("rotations.$index"),
                    'crop' => $request->input("crops.$index"),
                    'order' => $request->input("orders.$index"),
                    'imageable_id' => $imageableId,          // Polymorphic ID
                    'imageable_type' => $imageableType,      // Polymorphic Type
                ]);

                // Add the uploaded image data to the response
                $uploadedImages[] = [
                    'id' => $imageModel->id,
                    'tempId' => $request->input("ids.$index"),
                    'path' => asset('storage/' . $path),
                    'annotation' => $imageModel->annotation ? $imageModel->annotation->content : null,
                    'rotation' => $imageModel->rotation,
                    'crop' => $imageModel->crop,
                    'order' => $imageModel->order,
                ];
            }

            // Return response
            return response()->json([
                'message' => 'Images uploaded successfully',
                'images' => $uploadedImages
            ], 200);

        } catch (\Exception $e) {

            if(env('APP_DEBUG')){
                Log::error('Error in image upload: ' . $e->getMessage());
            }

            return response()->json([
                'message' => 'Error uploading images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateRequest $request)
    {
        try {
            $updatedImages = [];

            // Loop through each image to be updated
            foreach ($request->input('images') as $index => $imageData) {
                $image = Image::findOrFail($imageData['id']);  // Find the existing image

                // If a new image file is uploaded, replace the old one
                if ($request->hasFile("images.$index.file")) {
                    // Delete the old image file
                    Storage::disk('public')->delete($image->path);

                    // Store the new image file
                    $path = $request->file("images.$index.file")->store('uploads', 'public');
                    $image->path = $path;
                }

                // Handle annotation update or creation
                $annotationContent = $imageData['annotation'];
                if ($annotationContent) {
                    if ($image->annotation) {
                        $image->annotation->update(['content' => $annotationContent]);
                    } else {
                        $annotation = Annotation::create(['content' => $annotationContent]);
                        $image->annotation_uuid = $annotation->id;
                    }
                } else {
                    // If annotation is not provided, clear the annotation relationship
                    $image->annotation()->delete();
                    $image->annotation_uuid = null;
                }

                // Update the rest of the image data
                $image->rotation = $imageData['rotation'];
                $image->crop = $imageData['crop'];
                $image->order = $imageData['order'];
                $image->save();

                // Add the updated image data to the response
                $updatedImages[] = [
                    'id' => $image->id,
                    'path' => asset('storage/' . $image->path),
                    'annotation' => $image->annotation ? $image->annotation->content : null,
                    'rotation' => $image->rotation,
                    'crop' => $image->crop,
                    'order' => $image->order,
                ];
            }

            // Sort the updated images by their order
            usort($updatedImages, function ($a, $b) {
                return $a['order'] - $b['order'];
            });

            // Return response
            return response()->json([
                'message' => 'Images updated successfully',
                'images' => $updatedImages
            ], 200);

        } catch (\Exception $e) {
            if(env('APP_DEBUG')){
                Log::error('Error in image update: ' . $e->getMessage());
            }

            return response()->json([
                'message' => 'Error updating images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Image $image)
    {
        if(env('APP_DEBUG')){
            Log::debug('Image to be deleted: '. $image);
        }

        try{
            Storage::disk('public')->delete($image->path);
            $image->delete();

            return response()->json([
                'message' => 'Image deleted successfully',
                'images' => []
            ], 200);
        } catch (\Exception $e) {
            if(env('APP_DEBUG')){
                Log::error('Error in image deletion: ' . $e->getMessage());
            }

            return response()->json([
                'message' => 'Error deleting image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
