import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="bg-3 flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="text-1">
                    <ApplicationLogo className="h-20 w-20 text-gray-500" />
                </Link>
            </div>

            <div className="bg-4 mt-6 w-full overflow-hidden px-6 py-4 shadow-lg sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
