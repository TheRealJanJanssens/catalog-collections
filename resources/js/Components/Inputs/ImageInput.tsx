import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Button from '../Button';
import Modal from '../Modal';
import Draggable from 'react-draggable';
import _ from 'lodash';

interface ImageItem {
    id: string;
    file?: File;
    preview: string;
    annotation: string;
    rotation: number;
    crop: { x: number; y: number; width: number; height: number };
    order: number;
    isExisting?: boolean;
}

interface ImageInputProps {
    className?: string;
    uploadUrl: string;
    updateUrl: string;
    deleteUrl: string;
    onImagesUploaded?: (response: any) => void;
    onImagesUpdated?: (response: any) => void;
    onImageDeleted?: (response: any) => void;
    maxImages?: number;
    autoUpload?: boolean;
    existingImages?: ImageItem[];
    onImagesChanged?: (images: ImageItem[]) => void;
    imageable_type?: string;
    imageable_id?: number;
    imageable_key?: string;
}


const isDebugMode = import.meta.env.VITE_APP_DEBUG ?? false;

export default forwardRef(function ImageInput(
    {
        className = '',
        uploadUrl,
        updateUrl,
        deleteUrl,
        onImagesUploaded,
        onImagesUpdated,
        onImageDeleted,
        maxImages = 10,
        autoUpload = false,
        existingImages = [],
        onImagesChanged,
        imageable_type,
        imageable_id,
        imageable_key,
        ...props
    }: ImageInputProps,
    ref,
) {
    const [images, setImages] = useState<ImageItem[]>(existingImages.map(img => ({ ...img, isExisting: true })));
    const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const editorRef = useRef<typeof AvatarEditor | null>(null);
    const dropzoneRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (onImagesChanged) {
            onImagesChanged(images);
        }
    }, [images, onImagesChanged]);

    useImperativeHandle(ref, () => ({
        openFileDialog: () => {
            if (dropzoneRef.current) {
                dropzoneRef.current.click();
            }
        },
        getImages: () => images,
    }));

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newImages = acceptedFiles.map((file, index) => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: URL.createObjectURL(file),
            annotation: '',
            rotation: 0,
            crop: { x: 0, y: 0, width: 1, height: 1 },
            order: images.length + index,
            isExisting: false,
        }));
        setImages(prev => [...prev, ...newImages].slice(0, maxImages));
        if (autoUpload) {
            handleUpload([...images, ...newImages].slice(0, maxImages));
        }
    }, [images, maxImages, autoUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {'image/*': []},
        maxFiles: maxImages - images.length,
    });

    const handleUpload = async (imagesToUpload = images) => {
        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();

        if (imageable_type) {
            formData.append('imageable_type', imageable_type);
        }
        if (imageable_id) {
            formData.append('imageable_id', imageable_id.toString());
        }
        if (imageable_key) {
            formData.append('imageable_key', imageable_key.toString());
        }

        imagesToUpload.filter(image => !image.isExisting).forEach((image, index) => {
            if (image.file) {
                formData.append(`images[]`, image.file);
            } else {
                formData.append(`images[]`, image.preview);
            }
            formData.append(`ids[]`, image.id);
            formData.append(`annotations[]`, image.annotation);
            formData.append(`rotations[]`, image.rotation.toString());
            formData.append(`crops[]`, JSON.stringify(image.crop));
            formData.append(`orders[]`, image.order.toString());
        });

        try {
            const response = await axios.post(route(uploadUrl), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setUploadProgress(percentCompleted);
                }
            });

            if (isDebugMode) {
                console.log('Upload successful:', response.data);
            }

            const updatedImages = imagesToUpload.map((img) => {
                if (!img.isExisting) {
                    const serverImage = response.data.images.find((uploaded: any) => uploaded.tempId === img.id);
                    return {
                        ...img,
                        id: serverImage.id,
                        isExisting: true,
                    };
                }
                return img;
            });

            setImages(updatedImages);

            onImagesUploaded && onImagesUploaded(response.data);

        } catch (error) {
            if (isDebugMode) {
                console.error('Upload failed:', error);
            }
        } finally {
            setUploading(false);
        }
    };

    const handleUpdate = async (imagesToUpdate = images) => {
        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();

        if (imageable_type) {
            formData.append('imageable_type', imageable_type);
        }
        if (imageable_id) {
            formData.append('imageable_id', imageable_id.toString());
        }
        if (imageable_key) {
            formData.append('imageable_key', imageable_key.toString());
        }

        imagesToUpdate.forEach((image, index) => {
            formData.append(`images[${index}][id]`, image.id);
            formData.append(`images[${index}][annotation]`, image.annotation);
            formData.append(`images[${index}][rotation]`, image.rotation.toString());
            formData.append(`images[${index}][crop]`, JSON.stringify(image.crop));
            formData.append(`images[${index}][order]`, image.order.toString());
            if (image.file) {
                formData.append(`images[${index}][file]`, image.file);
            }
        });

        try {
            const response = await axios.post(route(updateUrl), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                    setUploadProgress(percentCompleted);
                }
            });

            if (isDebugMode) {
                console.log('Update successful:', response.data);
            }
            onImagesUpdated && onImagesUpdated(response.data);
        } catch (error) {
            if (isDebugMode) {
                console.error('Update failed:', error);
            }
        } finally {
            setUploading(false);
        }
    };

    const openEditModal = (image: ImageItem) => {
        setEditingImage(image);
    };

    const closeEditModal = () => {
        setEditingImage(null);
    };

    const handleRotate = (direction: 'left' | 'right') => {
        if (editingImage) {
            const newRotation = editingImage.rotation + (direction === 'left' ? -90 : 90);
            setEditingImage({ ...editingImage, rotation: newRotation });
        }
    };

    const handleCrop = () => {
        if (editorRef.current && editingImage) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const croppedImageUrl = canvas.toDataURL();
            const crop = editorRef.current.getCroppingRect();
            setEditingImage({ ...editingImage, preview: croppedImageUrl, crop });
        }
    };

    const handleAnnotationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (editingImage) {
            setEditingImage({ ...editingImage, annotation: e.target.value });
        }
    };

    const saveChanges = () => {
        if (editingImage) {
            const updatedImages = images.map(img =>
                img.id === editingImage.id ? editingImage : img
            );
            setImages(updatedImages);
            closeEditModal();
            if (autoUpload) {
                if (editingImage.isExisting) {
                    handleUpdate(updatedImages);
                } else {
                    handleUpload(updatedImages);
                }
            }
        }
    };

    const removeImage = async (imageId: string) => {
        const imageToRemove = images.find(img => img.id === imageId);
        if (!imageToRemove) return;

        if (imageToRemove.isExisting) {
            try {
                const response = await axios.delete(route(deleteUrl, {id: imageId}), {
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                });

                if (isDebugMode) {
                    console.log('Image deleted successfully:', response.data);
                }

                onImageDeleted && onImageDeleted(response.data);
            } catch (error) {
                if (isDebugMode) {
                    console.error('Failed to delete image:', error);
                }
                // You might want to show an error message to the user here
                return; // Don't remove the image from the state if the deletion failed
            }
        }

        const updatedImages = images.filter(img => img.id !== imageId);
        setImages(updatedImages);
    };

    const onDragStop = (imageId: string, e: any, data: { x: number; y: number }) => {
        const updatedImages = [...images];
        const draggedImageIndex = updatedImages.findIndex(img => img.id === imageId);
        const draggedImage = updatedImages[draggedImageIndex];

        // Calculate the new position based on drag
        const newIndex = Math.min(
            Math.max(Math.round(draggedImageIndex + data.x / 100), 0),
            updatedImages.length - 1
        );

        // Remove the dragged image from its original position
        updatedImages.splice(draggedImageIndex, 1);
        // Insert the dragged image at its new position
        updatedImages.splice(newIndex, 0, draggedImage);

        // Update order for all images
        const reorderedImages = updatedImages.map((img, index) => ({
            ...img,
            order: index,
        }));

        if (isDebugMode) {
            console.log('Image order update triggered');
        }

        setImages(reorderedImages);

        //make sure this only sends an update request when something changes
        if (autoUpload && !_.isEqual(images, reorderedImages)) {
            handleUpdate(reorderedImages);
        }
    };

    return (
        <div className={`mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-md ${className}`} {...props}>
            <div
                {...getRootProps()}
                className={`mb-4 border-2 border-dashed p-8 ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
            >
                <input {...getInputProps()} ref={dropzoneRef} />
                {isDragActive ? (
                    <p className="text-center">Drop the files here ...</p>
                ) : (
                    <p className="text-center">
                        Drag 'n' drop some files here, or click to select files (max {maxImages - images.length} more)
                    </p>
                )}
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <Draggable
                        key={String(image.id)}
                        onStop={(e, data) => onDragStop(image.id, e, data)}
                        position={{x: 0, y: 0}}
                    >
                        <div className="relative cursor-move">
                            <img
                                src={image.preview}
                                alt="Preview"
                                className="h-32 w-full rounded object-cover"
                                onClick={() => openEditModal(image)}
                            />
                            <p className="mt-1 truncate text-sm">
                                {image.file?.name || 'Existing image'}
                            </p>
                            <button
                                onClick={() => removeImage(image.id)}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    </Draggable>
                ))}
            </div>

            {!autoUpload && images.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <Button variant={'primary'}
                        onClick={() => handleUpload(images.filter(img => !img.isExisting))}
                        disabled={uploading || !images.some(img => !img.isExisting)}
                        className="w-1/2 mr-2"
                    >
                        {uploading && !images.some(img => img.isExisting)
                            ? `Uploading... ${uploadProgress}%`
                            : 'Upload New Images'}
                    </Button>
                    <Button variant={'primary'}
                        onClick={() => handleUpdate(images.filter(img => img.isExisting))}
                        disabled={uploading || !images.some(img => img.isExisting)}
                        className="w-1/2 ml-2"
                    >
                        {uploading && images.some(img => img.isExisting)
                            ? `Updating... ${uploadProgress}%`
                            : 'Update Existing Images'}
                    </Button>
                </div>
            )}

            <Modal show={!!editingImage} onClose={closeEditModal} maxWidth="md">
                {editingImage && (
                    <div className="p-4">
                        <AvatarEditor
                            ref={editorRef}
                            image={editingImage.preview}
                            width={250}
                            height={250}
                            border={50}
                            rotate={editingImage.rotation}
                        />
                        <div className="mt-4 flex justify-between">
                            <Button variant={'primary'} onClick={() => handleRotate('left')}>
                                Rotate Left
                            </Button>
                            <Button variant={'primary'} onClick={() => handleRotate('right')}>
                                Rotate Right
                            </Button>
                            <Button variant={'primary'} onClick={handleCrop}>
                                Crop
                            </Button>
                        </div>
                        <textarea
                            className="mt-4 w-full rounded border p-2"
                            value={editingImage.annotation}
                            onChange={handleAnnotationChange}
                            placeholder="Add annotation (optional)..."
                        />
                        <Button variant={'primary'} onClick={saveChanges} className="mt-4 w-full">
                            Save Changes
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    );
});
