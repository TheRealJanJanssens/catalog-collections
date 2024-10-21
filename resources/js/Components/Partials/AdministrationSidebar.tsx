import { colors } from '@/utils/tailwindConfig';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '../ApplicationLogo';
import Button from '../Button';
import Icon from '../Icon';
import ThemeSwitcher from '../ThemeSwitcher';
import SidebarLink from '../SidebarLink';

export default function AdministrationSidebar({
    classNameName = '',
    ...props
}: {
    classNameName?: string;
}) {
    const user = usePage().props.auth.user;

    return (
        <>
            <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="logo-sidebar"
                className="fixed left-0 top-0 z-40 h-screen w-[250px] -translate-x-full transition-transform sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
                    <Link
                        href="/"
                        className="text-1 flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <ApplicationLogo className="h-5" />
                    </Link>


                    <ul className="space-y-2 font-medium">
                        <SidebarLink
                            href="/"
                            className=""
                        >
                            <span className='flex'>
                                <Icon
                                    category={'layout'}
                                    name={'Layout-4-blocks'}
                                    className={'me-1'}
                                    size={24}
                                    color={colors.primary[500]}
                                />
                                Dashboard
                            </span>

                            <span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                Pro
                            </span>
                        </SidebarLink>

                        <SidebarLink
                            href="/"
                            className=""
                        >
                            <span className='flex'>
                                <Icon
                                    category={'layout'}
                                    name={'Layout-4-blocks'}
                                    className={'me-1'}
                                    size={24}
                                    color={colors.primary[500]}
                                />
                                Collections
                            </span>

                            <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                3
                            </span>
                        </SidebarLink>

                        <SidebarLink
                            href="/"
                            className=""
                        >
                            <span className='flex'>
                                <Icon
                                    category={'layout'}
                                    name={'Layout-4-blocks'}
                                    className={'me-1'}
                                    size={24}
                                    color={colors.primary[500]}
                                />
                                Users
                            </span>

                            <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                3
                            </span>
                        </SidebarLink>
                    </ul>
                </div>
            </aside>
        </>
    );
}
