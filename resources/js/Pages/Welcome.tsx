import Button from '@/Components/Button';
import Dropdown from '@/Components/Dropdown';
import ThemeSwitcher from '@/Components/ThemeSwitcher';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />

            <nav className="border-gray-200 bg-white dark:bg-gray-900">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                    <a
                        href="https://flowbite.com/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <img
                            src="/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        {/* <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                            LogoName
                        </span> */}
                    </a>
                    <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                        {/* Account Dropdown */}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="/docs/images/people/profile-picture-3.jpg"
                                        alt="user photo"
                                    />
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {/* TODO: Make conditional when user is logged-in */}
                                <Dropdown.Header>
                                    <Link href={route('profile.edit')}>
                                        <span className="block text-sm text-gray-900 dark:text-white">
                                            Bonnie Green
                                        </span>
                                        <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                                            name@flowbite.com
                                        </span>
                                    </Link>
                                </Dropdown.Header>

                                <Dropdown.LinkList>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        className="dark:text-red-600"
                                        method="post"
                                        // as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.LinkList>
                            </Dropdown.Content>
                        </Dropdown>

                        {/* Login buttons */}
                        <Button variant={'primary'} href={route('login')}>Login</Button>
                        <Button variant={'secondary'} href={route('register')}>Register</Button>

                        <ThemeSwitcher />

                        {/* Mobile navigation */}
                        <button
                            data-collapse-toggle="navbar-user"
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
                        id="navbar-user"
                    >
                        <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                            <li>
                                <a
                                    href="#"
                                    className="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">

                        </header>

                        <main className="mt-6">

                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
