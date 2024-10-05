import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 bg-3 sm:justify-center sm:pt-0 ">
            <div>
                <Link href="/" className='text-1'>
                    <ApplicationLogo className="h-20 w-20 text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 bg-4 w-full overflow-hidden px-6 py-4 shadow-lg sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
