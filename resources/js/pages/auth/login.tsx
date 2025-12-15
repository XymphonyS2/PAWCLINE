import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link, usePage } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
    flash?: {
        success?: string;
    };
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
    flash,
}: LoginProps) {
    const page = usePage();
    const successMessage = flash?.success || (page.props as any).flash?.success;
    return (
        <div className="min-h-screen bg-white">
            <Head title="Masuk - Pawcline" />
            
            <div className="min-h-screen flex flex-col">
                {/* Back Button - Top Left */}
                <div className="px-6 pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium">Kembali</span>
                    </Link>
                </div>

                {/* Main Content - Centered */}
                <div className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">
                        {/* Title and Subtitle */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                Selamat Datang Kembali!
                            </h1>
                            <p className="text-gray-500 text-base">
                                Masuk untuk melanjutkan ke dashboard Anda
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-5">
                                        {/* Email Field */}
                                        <div>
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                                                Email
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="nama@email.com"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.email} className="mt-1" />
                                        </div>

                                        {/* Password Field */}
                                        <div>
                                            <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.password} className="mt-1" />
                                        </div>

                                        {/* Remember Me and Forgot Password */}
                                        <div className="flex items-center justify-between pt-1">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    tabIndex={3}
                                                    className="w-4 h-4"
                                                />
                                                <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer font-normal">
                                                    Ingat saya
                                                </Label>
                                            </div>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                                                    tabIndex={4}
                                                >
                                                    Lupa password?
                                                </TextLink>
                                            )}
                                        </div>

                                        {/* Login Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:from-pink-600 hover:via-pink-700 hover:to-purple-700 text-white rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 mt-2"
                                            tabIndex={5}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? (
                                                <Spinner />
                                            ) : (
                                                'Masuk Sekarang'
                                            )}
                                        </Button>
                                    </div>

                                    {/* Register Link */}
                                    {canRegister && (
                                        <div className="text-center text-sm text-gray-600 pt-2">
                                            Belum punya akun?{' '}
                                            <TextLink href={register()} className="text-pink-500 hover:text-pink-600 font-semibold" tabIndex={6}>
                                                Daftar disini
                                            </TextLink>
                                        </div>
                                    )}

                                </>
                            )}
                        </Form>

                    {(status || successMessage) && (
                        <div className="mt-4 text-center text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                            {status || successMessage}
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}
