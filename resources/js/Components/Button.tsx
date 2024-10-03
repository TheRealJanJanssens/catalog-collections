import { InertiaLinkProps, Link } from '@inertiajs/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonStyle = 'primary' | 'secondary' | 'danger' | 'success';

type ButtonProps = {
    className?: string;
    disabled?: boolean;
    variant?: ButtonStyle;
} & (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (InertiaLinkProps & { href: string })
);

export default function Button({
    className = '',
    disabled,
    children,
    variant = 'primary',
    ...props
}: ButtonProps) {
    const baseClassName =
        'inline-flex items-center rounded-md border px-4 py-2 text-md font-semibold tracking-widest transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

    const styleClasses = {
        primary:
            'border-transparent bg-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 focus:ring-indigo-500 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:active:bg-gray-300',
        secondary:
            'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800',
        danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 active:bg-red-700 dark:focus:ring-offset-gray-800',
        success:
            'border-transparent bg-green-600 text-white hover:bg-green-700 focus:ring-green-500', //TODO: Add styling
    };

    const buttonClassName = `${baseClassName} ${styleClasses[variant]} ${
        disabled ? 'opacity-25 cursor-not-allowed' : ''
    } ${className}`;

    if (props.href) {
        return (
            <Link className={buttonClassName} {...(props as InertiaLinkProps)}>
                {children}
            </Link>
        );
    }

    return (
        <button
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
            className={buttonClassName}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
