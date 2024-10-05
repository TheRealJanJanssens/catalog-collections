import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'w-4 h-4 bg-3 border-1 ring-inset ring-offset-0 rounded border-basalt-300 dark:border-basalt-600 text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-500' +
                className
            }
        />
    );
}
