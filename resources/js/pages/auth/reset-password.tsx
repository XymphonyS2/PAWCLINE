import { login } from '@/routes';
import { update } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Reset Password - Pawcline" />
            
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
                                Reset Password
                            </h1>
                            <p className="text-gray-500 text-base">
                                Masukkan password baru Anda
                            </p>
                        </div>

                        <Form
                            {...update.form()}
                            transform={(data) => ({ ...data, token, email })}
                            resetOnSuccess={['password', 'password_confirmation']}
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
                                                    autoComplete="email"
                                                    value={email}
                                                    readOnly
                                                    className="pl-12 pr-4 h-12 bg-gray-100 border-gray-300 rounded-lg text-base text-gray-600 cursor-not-allowed"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                                className="mt-1"
                                            />
                                        </div>

                                        {/* Password Field */}
                                        <div>
                                            <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                                                Password Baru
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
                                                    autoComplete="new-password"
                                                    autoFocus
                                                    placeholder="Masukkan password baru"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.password} className="mt-1" />
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div>
                                            <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 mb-2 block">
                                                Konfirmasi Password
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    autoComplete="new-password"
                                                    placeholder="Masukkan ulang password baru"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password_confirmation}
                                                className="mt-1"
                                            />
                                        </div>

                                        {/* Reset Password Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:from-pink-600 hover:via-pink-700 hover:to-purple-700 text-white rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 mt-2"
                                            disabled={processing}
                                            data-test="reset-password-button"
                                        >
                                            {processing ? (
                                                <Spinner />
                                            ) : (
                                                'Reset Password'
                                            )}
                                        </Button>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center text-sm text-gray-600 pt-2">
                                        Ingat password Anda?{' '}
                                        <TextLink href={login()} className="text-pink-500 hover:text-pink-600 font-semibold">
                                            Masuk disini
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
