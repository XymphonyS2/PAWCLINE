import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function Register() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Daftar - Pawcline" />
            
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
                                Buat Akun Baru
                            </h1>
                            <p className="text-gray-500 text-base">
                                Daftar untuk mulai merawat hewan kesayangan
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-5">
                                        {/* Nama Lengkap Field */}
                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                                                Nama Lengkap
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    name="name"
                                                    placeholder="Masukkan nama lengkap"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.name}
                                                className="mt-1"
                                            />
                                        </div>

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
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="email"
                                                    name="email"
                                                    placeholder="nama@email.com"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.email} className="mt-1" />
                                        </div>

                                        {/* Nomor Telepon Field */}
                                        <div>
                                            <Label htmlFor="kontak" className="text-sm font-medium text-gray-700 mb-2 block">
                                                Nomor Telepon
                                            </Label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <Input
                                                    id="kontak"
                                                    type="tel"
                                                    tabIndex={3}
                                                    autoComplete="tel"
                                                    name="kontak"
                                                    placeholder="08xx-xxxx-xxxx"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.kontak} className="mt-1" />
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
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError message={errors.password} className="mt-1" />
                                        </div>

                                        {/* Konfirmasi Password Field */}
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
                                                    required
                                                    tabIndex={5}
                                                    autoComplete="new-password"
                                                    name="password_confirmation"
                                                    placeholder="••••••••"
                                                    className="pl-12 pr-4 h-12 bg-gray-50 border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password_confirmation}
                                                className="mt-1"
                                            />
                                        </div>

                                        {/* Register Button */}
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 hover:from-pink-600 hover:via-pink-700 hover:to-purple-700 text-white rounded-lg font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 mt-2"
                                            tabIndex={6}
                                            data-test="register-user-button"
                                        >
                                            {processing ? (
                                                <Spinner />
                                            ) : (
                                                'Daftar Sekarang'
                                            )}
                                        </Button>
                                    </div>

                                    {/* Login Link */}
                                    <div className="text-center text-sm text-gray-600 pt-2">
                                        Sudah punya akun?{' '}
                                        <TextLink href={login()} className="text-pink-500 hover:text-pink-600 font-semibold" tabIndex={7}>
                                            Login disini
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
