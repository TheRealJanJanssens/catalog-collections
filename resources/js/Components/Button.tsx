import { InertiaLinkProps, Link } from '@inertiajs/react';
import { ButtonHTMLAttributes } from 'react';

type ButtonStyle =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'light'
    | 'transparant';

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
        'inline-flex items-center rounded-md border px-4 py-2 font-semibold transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

    const styleClasses = {
        primary:
            'border-transparent bg-primary-500 text-white hover:bg-primary-400 focus:bg-gray-700 focus:ring-indigo-500 active:bg-gray-900 dark:focus:bg-white dark:active:bg-gray-300',
        secondary:
            'border-transparent border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 disabled:opacity-25 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800',
        danger: 'border-transparent bg-red-600 text-white hover:bg-red-500 focus:ring-red-500 active:bg-red-700 dark:focus:ring-offset-gray-800',
        success:
            'border-transparent bg-green-600 text-white hover:bg-green-700 focus:ring-green-500', //TODO: Add styling
        light: 'border-transparent bg-3 text-4 hover:bg-basalt-300 hover:dark:bg-basalt-600 focus:ring-basalt-300 active:bg-basalt-300 focus:dark:ring-basalt-600 active:dark:bg-basalt-600',
        transparant:
            'border-transparent bg-transparant text-4 hover:bg-3 active:bg-3 focus:ring-basalt-300 focus:dark:ring-basalt-600',
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
