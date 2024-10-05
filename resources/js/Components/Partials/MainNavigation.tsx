import { colors } from '@/utils/tailwindConfig';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '../ApplicationLogo';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import ThemeSwitcher from '../ThemeSwitcher';

export default function MainNavigation({
    className = '',
    ...props
}: {
    className?: string;
}) {
    const user = usePage().props.auth.user;

    return (
        <nav className={`bg-4 border-gray-200 ${className}`}>
            <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                <Link
                    href="/"
                    className="text-1 flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <ApplicationLogo className="h-5" />
                </Link>

                <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <>
                            {/* Account Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="bg-2 flex overflow-hidden rounded-full text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        data-dropdown-toggle="user-dropdown"
                                        data-dropdown-placement="bottom"
                                    >
                                        <span className="sr-only">
                                            Open user menu
                                        </span>

                                        {/* TODO: When avatar is available */}
                                        {/* <img
                                        className="h-8 w-8 rounded-full"
                                        src="/docs/images/people/profile-picture-3.jpg"
                                        alt="user photo"
                                    /> */}

                                        <Icon
                                            category={'general'}
                                            name={'User'}
                                            size={32}
                                            color={colors.primary[500]}
                                        />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Header>
                                        <Link href={route('profile.edit')}>
                                            <span className="block text-sm text-gray-900 dark:text-white">
                                                {user.first_name}{' '}
                                                {user.last_name}
                                            </span>
                                            <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </span>
                                        </Link>
                                    </Dropdown.Header>

                                    <Dropdown.LinkList>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
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
                        </>
                    ) : (
                        <>
                            {/* Login buttons */}
                            <Button variant={'primary'} href={route('login')}>
                                Login
                            </Button>
                            <Button
                                variant={'secondary'}
                                href={route('register')}
                            >
                                Register
                            </Button>
                        </>
                    )}

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
                    <ul className="flex flex-col p-4 font-medium md:mt-0 md:flex-row md:space-x-2 md:p-0 rtl:space-x-reverse">
                        <li>
                            <Button href={'/'} variant={'transparant'}>
                                <Icon
                                    category={'layout'}
                                    name={'Layout-4-blocks'}
                                    className={'me-1'}
                                    size={21}
                                    color={colors.primary[500]}
                                />
                                Home
                            </Button>
                        </li>

                        {user && (
                            <li>
                                <Button
                                    href={route('items.index')}
                                    variant={'transparant'}
                                >
                                    <Icon
                                        category={'object'}
                                        name={'Commode-1'}
                                        className={'me-1'}
                                        size={21}
                                        color={colors.primary[500]}
                                    />
                                    Collections
                                </Button>
                            </li>
                        )}

                        <li>
                            <Button href={'/'} variant={'transparant'}>
                                <Icon
                                    category={'object'}
                                    name={'Library'}
                                    className={'me-1'}
                                    size={21}
                                    color={colors.primary[500]}
                                />
                                Knowledge Base
                            </Button>
                        </li>

                        <li>
                            <Button href={'/'} variant={'transparant'}>
                                <Icon
                                    category={'shopping'}
                                    name={'Cart-2'}
                                    className={'me-1'}
                                    size={21}
                                    color={colors.primary[500]}
                                />
                                Marketplace
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
