import Button from '@/Components/Button';
import Icon from '@/Components/Icon';
import MainNavigation from '@/Components/Partials/MainNavigation';
import { colors } from '@/utils/tailwindConfig';
import { PropsWithChildren } from 'react';

export default function UserLayout({ children }: PropsWithChildren) {
    return (
        <div>
            <MainNavigation/>

            {children}
        </div>
    );
}
