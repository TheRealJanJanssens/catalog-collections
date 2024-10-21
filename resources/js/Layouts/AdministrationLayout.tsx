import AdministrationSidebar from '@/Components/Partials/AdministrationSidebar';
import { PropsWithChildren } from 'react';

export default function AdministrationLayout({ children }: PropsWithChildren) {
    return (
        <>
            <AdministrationSidebar />

            <div className="p-4 sm:ml-[250px]">{children}</div>
        </>
    );
}
