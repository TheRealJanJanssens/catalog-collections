import { InertiaLinkProps } from '@inertiajs/react';
import Button from './Button';

export default function SidebarLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Button
            {...props}
            className={
                'w-100 text-1 flex items-center justify-between ' +
                (active ? 'bg-primary-500' : '') +
                className
            }
            variant={'transparant'}
        >
            {children}
        </Button>
    );
}
