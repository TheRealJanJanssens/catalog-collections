import ImageInput from '@/Components/Inputs/ImageInput';
import InputLabel from '@/Components/Inputs/InputLabel';
import TextInput from '@/Components/Inputs/TextInput';
import Toggle from '@/Components/Inputs/Toggle';
import { useForm, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

interface FormProps {
    mode?: 'create' | 'edit';
    item?: any;
    className?: string;
}

const Form = ({ mode = 'create', item = null, className = '' }: FormProps) => {
    const { enums } = usePage().props;
    const [formMode, setFormMode] = useState('tutorial'); // 'tutorial' or 'full'
    const [step, setStep] = useState(1);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: item?.title || '',
        collectionType: item?.collectionType || '',
        categories: item?.categories || [],
        images: item?.images || [],
        attributes: item?.attributes || {},
    });

    useEffect(() => {
        if (mode === 'edit' && item) {
            setData(item);
            setFormMode('full');
        }
    }, [mode, item, setData]);

    const handleInputChange = (field: any, value: any) => {
        setData(field, value);
    };

    const handleStepComplete = async () => {
        // Send partial data to backend
        // await post('/items/partial-save', data, {
        //     preserveState: true,
        //     preserveScroll: true,
        // });
        await post('/items/partial-save');

        if (step < 4) {
            setStep((prev) => prev + 1);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const url = mode === 'create' ? '/items' : `/items/${item.id}`;

        if (mode === 'create') {
            await post(url);
        } else {
            await put(url);
        }
    };

    const handleModeSwitch = useCallback(
        (e: React.MouseEvent) => {
            // e.stopPropagation();
            setFormMode((prev) => (prev === 'tutorial' ? 'full' : 'tutorial'));
            // e.preventDefault(); //This is needed because otherwise this function is being triggered twice
        },
        [formMode, setFormMode],
    );

    const renderStep = (stepNumber: any) => {
        switch (stepNumber) {
            case 1:
                return (
                    <div>
                        <InputLabel>Title</InputLabel>
                        <TextInput
                            value={data.title}
                            onChange={(e) =>
                                handleInputChange('title', e.target.value)
                            }
                            // error={errors.title}
                        />
                        <select
                            value={data.collectionType}
                            onChange={(e) =>
                                handleInputChange(
                                    'collectionType',
                                    e.target.value,
                                )
                            }
                        >
                            <option value="">Select Collection Type</option>
                            {/* Add your collection type options here */}
                        </select>
                        {errors.collectionType && (
                            <div className="text-red-500">
                                {errors.collectionType}
                            </div>
                        )}
                    </div>
                );
            case 2:
                return (
                    <div>
                        {/* Add category/tag input here */}
                        <p>
                            Suggested categories based on title and collection
                            type:
                        </p>
                        {/* Add logic to display suggested categories */}
                    </div>
                );
            case 3:
                return (
                    <ImageInput
                        uploadUrl={'images.store'}
                        updateUrl={'images.update'}
                        deleteUrl={'images.destroy'}
                        maxImages={5}
                        autoUpload={true}
                        imageable_id={item?.id || null}
                        imageable_type={enums.imageableTypes.item}
                        imageable_key={'main_image_roll'}
                        existingImages={data.images}
                        onImagesUploaded={(images) =>
                            handleInputChange('images', images)
                        }
                    />
                );
            case 4:
                return <div>{/* Add inputs for other attributes here */}</div>;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            <Toggle onChange={handleModeSwitch}>
                Toggle {formMode === 'tutorial' ? 'Full View' : 'Tutorial Mode'}
            </Toggle>

            {formMode === 'tutorial' ? (
                <div>
                    <h2>Step {step} of 4</h2>
                    {renderStep(step)}
                    <button type="button" onClick={handleStepComplete}>
                        {step < 4 ? 'Next' : 'Complete'}
                    </button>
                </div>
            ) : (
                <div>
                    {[1, 2, 3, 4].map((stepNumber) => (
                        <div key={stepNumber}>
                            <h2>Step {stepNumber}</h2>
                            {renderStep(stepNumber)}
                        </div>
                    ))}
                </div>
            )}

            <button type="submit" disabled={processing}>
                {mode === 'create' ? 'Create Item' : 'Update Item'}
            </button>
        </form>
    );
};

export default Form;
