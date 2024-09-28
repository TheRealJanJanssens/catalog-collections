import ImageInput from '@/Components/Inputs/ImageInput';
import TextInput from '@/Components/Inputs/TextInput';
import { usePage } from '@inertiajs/react';

export default function CreateForm() {
    return (
        <div>
            <TextInput />

            <ImageInput
                uploadUrl={'images.store'}
                updateUrl={'images.update'}
                deleteUrl={'images.destroy'}
                maxImages={5}
                autoUpload={true}
                imageable_id={1}
                imageable_type={usePage().props.enums.imageableTypes.item}
                imageable_key={'main_image_roll'} //Key of the input
                // existingImages={[
                //     {
                //     id: '1',
                //     preview: 'https://example.com/image1.jpg',
                //     annotation: 'Existing image 1',
                //     rotation: 0,
                //     crop: { x: 0, y: 0, width: 1, height: 1 },
                //     order: 0
                //     },
                //     // ... more existing images
                // ]}
                // onImagesUploaded={}
                // onImagesChanged={}
                // onImagesUpdated={}
                // onImageDeleted={}
            />
        </div>
    );
}
