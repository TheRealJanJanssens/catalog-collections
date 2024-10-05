import Button from '@/Components/Button';
import Icon from '@/Components/Icon';
import Checkbox from '@/Components/Inputs/Checkbox';
import InputError from '@/Components/Inputs/InputError';
import InputLabel from '@/Components/Inputs/InputLabel';
import TextInput from '@/Components/Inputs/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    /**
     * Redirect directly to the correct link and not over href because of CORS problems
     */
    const handleGoogleLogin = () => {
        window.location.href = route('auth.google');
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="text-center">
                <h3 className="text-1 mb-5 text-4xl">Sign in</h3>
                <p className="text-3">Welcome back, you’ve been missed!</p>
            </div>

            <div className="mt-6">
                <Button
                    variant={'light'}
                    onClick={handleGoogleLogin}
                    className="w-100"
                >
                    <Icon category="socials" name="Google" className="me-1" />
                    Sign in with Google
                </Button>
            </div>

            <div className="relative flex items-center py-6">
                <div className="border-basalt-200 dark:border-basalt-700 flex-grow border"></div>
                <span className="text-4 mx-4 flex-shrink text-xl uppercase">
                    Or
                </span>
                <div className="border-basalt-200 dark:border-basalt-700 flex-grow border"></div>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>
                    </div>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="mt-4">
                    <Button
                        variant={'primary'}
                        className="w-100"
                        disabled={processing}
                    >
                        Log in
                    </Button>

                    <div className="w-100 mt-4 text-center text-sm">
                        <span className="text-4 me-1">
                            Don't have an account yet?
                        </span>
                        <Link href={route('register')} className="text-primary">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
