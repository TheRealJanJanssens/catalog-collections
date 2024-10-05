import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Icon from '../Icon';

export default forwardRef(function TextInput(
    {
        children,
        className = '',
        isFocused = false,
        onChange,
        withIcons = false,
        ...props
    }: {
        className?: string;
        isFocused?: boolean;
        withIcons?: boolean;
        onChange: () => void;
        children: React.ReactNode;
    },
    ref,
) {
    const localRef = useRef<HTMLLabelElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label
                className={`relative mb-5 inline-flex cursor-pointer items-center ${className}`}
                onChange={onChange}
                {...props}
            >
                <div className="relative h-6 w-8">
                    <input
                        type="checkbox"
                        value=""
                        className="peer sr-only"
                        // ref={localRef}
                    />
                    <div className="peer-checked:bg-primary-500 peer h-6 w-8 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-[4px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>

                    {withIcons ?? (
                        <>
                            <Icon
                                category="navigation"
                                name="Close"
                                className="absolute start-[6px] top-[6px] z-10 block peer-checked:hidden"
                                size={20}
                                color="black"
                            />

                            <Icon
                                category="navigation"
                                name="Check"
                                className="absolute start-[0px] top-[6px] z-10 hidden peer-checked:end-[6px] peer-checked:start-auto peer-checked:block"
                                size={20}
                                color="black"
                            />
                        </>
                    )}
                </div>

                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {children}
                </span>
            </label>
        </>
    );
});
