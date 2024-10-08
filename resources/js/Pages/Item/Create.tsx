import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';
import Form from './Partials/Form';

export default function Create() {
    return (
        <UserLayout
        // header={
        //     <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
        //         Items
        //     </h2>
        // }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <Form className="max-w-xl" />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
