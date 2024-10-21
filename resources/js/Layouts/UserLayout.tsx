import MainNavigation from '@/Components/Partials/MainNavigation';
import { PropsWithChildren } from 'react';

export default function UserLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <MainNavigation />

            {children}
        </div>
    );
}
