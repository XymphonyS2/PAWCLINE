import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Upload, CheckCircle2, Clock, XCircle, FileText, AlertCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pengaturan Profil',
        href: edit().url,
    },
];

interface Verifikasi {
    id: number;
    status: string;
    ktp_path: string | null;
    catatan: string | null;
    created_at: string;
}

export default function Profile({
    mustVerifyEmail,
    status,
    verifikasi,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    verifikasi?: Verifikasi | null;
}) {
    const { auth, flash } = usePage<SharedData>().props;
    const user = auth.user;
    const isPemilikHewan = user?.role === 'pemilik_hewan';
    const errorMessage = flash?.error;

    // Form untuk verifikasi KTP
    const { data: verifikasiData, setData: setVerifikasiData, post: postVerifikasi, processing: processingVerifikasi, errors: verifikasiErrors } = useForm({
        foto_ktp: null as File | null,
    });

    // Form untuk password
    const { data: passwordData, setData: setPasswordData, put: putPassword, processing: processingPassword, errors: passwordErrors, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleVerifikasiSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!verifikasiData.foto_ktp) {
            alert('Harap pilih file KTP terlebih dahulu');
            return;
        }
        postVerifikasi('/settings/profil/verifikasi', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['verifikasi'] });
            },
            onError: (errors) => {
                console.error('Error verifikasi:', errors);
            },
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        putPassword('/settings/profil/password', {
            onSuccess: () => {
                resetPassword();
            },
        });
    };

    const getStatusBadge = () => {
        if (!isPemilikHewan) return null;
        
        if (user?.is_verified) {
            return (
                <Badge className="bg-green-500 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Terverifikasi
                </Badge>
            );
        }
        
        if (verifikasi?.status === 'pending') {
            return (
                <Badge className="bg-yellow-500 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Menunggu Verifikasi
                </Badge>
            );
        }
        
        if (verifikasi?.status === 'ditolak') {
            return (
                <Badge className="bg-red-500 text-white">
                    <XCircle className="w-3 h-3 mr-1" />
                    Ditolak
                </Badge>
            );
        }
        
        return (
            <Badge className="bg-gray-500 text-white">
                <FileText className="w-3 h-3 mr-1" />
                Belum Terverifikasi
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengaturan Profil - Pawcline" />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Alert Error dari Flash Message */}
                    {errorMessage && (
                        <Alert variant="destructive" className="bg-red-50 border-2 border-red-300 text-red-800 shadow-md">
                            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                            <div className="flex-1">
                                <AlertTitle className="text-red-900 font-bold text-base mb-1">Perhatian</AlertTitle>
                                <AlertDescription className="text-red-700 text-sm leading-relaxed">
                                    {errorMessage}
                                </AlertDescription>
                            </div>
                        </Alert>
                    )}

                    {/* Status Verifikasi (Hanya untuk Pemilik Hewan) */}
                    {isPemilikHewan && (
                        <div>
                            <HeadingSmall
                                title="Status Verifikasi Akun"
                                description="Status verifikasi akun Anda"
                            />
                            <Card className="p-6 bg-white border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Status Verifikasi</p>
                                        {getStatusBadge()}
                                        {verifikasi?.status === 'rejected' && verifikasi.catatan && (
                                            <p className="text-sm text-red-600 mt-2">Catatan: {verifikasi.catatan}</p>
                                        )}
                                    </div>
                                </div>

                                {!user?.is_verified && verifikasi?.status !== 'pending' && (
                                    <div className="mt-6">
                                        <form onSubmit={handleVerifikasiSubmit} className="space-y-4" encType="multipart/form-data">
                                            <div>
                                                <Label htmlFor="foto_ktp" className="text-gray-900 font-semibold">
                                                    Upload Foto KTP <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="foto_ktp"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/jpg"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null;
                                                        setVerifikasiData('foto_ktp', file);
                                                    }}
                                                    className={`mt-2 bg-white border-gray-200 text-gray-900 h-11 ${
                                                        verifikasiErrors.foto_ktp ? 'border-red-500' : ''
                                                    }`}
                                                />
                                                {verifikasiData.foto_ktp && (
                                                    <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
                                                        <FileText className="w-3 h-3" />
                                                        File dipilih: {verifikasiData.foto_ktp.name}
                                                    </p>
                                                )}
                                                {verifikasiErrors.foto_ktp && (
                                                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {verifikasiErrors.foto_ktp}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Format: JPG, PNG. Maksimal 2MB
                                                </p>
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={processingVerifikasi || !verifikasiData.foto_ktp}
                                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {processingVerifikasi ? 'Mengupload...' : 'Ajukan Verifikasi'}
                                            </Button>
                                        </form>
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}

                    {/* Informasi Profil */}
                    <div>
                        <HeadingSmall
                            title="Informasi Profil"
                            description="Perbarui nama dan alamat email Anda"
                        />

                        <Form
                            {...ProfileController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            className="space-y-6"
                        >
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                    <Card className="p-6 bg-white border-gray-200">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-gray-900 font-semibold">
                                                    Nama Lengkap <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11"
                                                    defaultValue={user?.name}
                                                    name="name"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Masukkan nama lengkap"
                                                />
                                                <InputError message={errors.name} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-gray-900 font-semibold">
                                                    Alamat Email <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11"
                                                    defaultValue={user?.email}
                                                    name="email"
                                                    required
                                                    autoComplete="username"
                                                    placeholder="Masukkan alamat email"
                                                />
                                                <InputError message={errors.email} />
                                            </div>

                                            {mustVerifyEmail && user?.email_verified_at === null && (
                                                <div>
                                                    <p className="text-sm text-gray-600">
                                                        Alamat email Anda belum diverifikasi.{' '}
                                                        <Link
                                                            href={send()}
                                                            as="button"
                                                            className="text-pink-500 hover:text-pink-600 underline"
                                                        >
                                                            Klik di sini untuk mengirim ulang email verifikasi.
                                                        </Link>
                                                    </p>

                                                    {status === 'verification-link-sent' && (
                                                        <div className="mt-2 text-sm font-medium text-green-600">
                                                            Link verifikasi baru telah dikirim ke alamat email Anda.
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                                                >
                                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                                </Button>

                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-green-600">Tersimpan</p>
                                                </Transition>
                                            </div>
                                        </div>
                                    </Card>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Ubah Password */}
                    <div>
                        <HeadingSmall
                            title="Ubah Password"
                            description="Pastikan akun Anda menggunakan password yang kuat dan acak untuk tetap aman"
                        />

                        <Form
                            onSubmit={handlePasswordSubmit}
                            className="space-y-6"
                        >
                            <Card className="p-6 bg-white border-gray-200">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="current_password" className="text-gray-900 font-semibold">
                                            Password Lama <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="current_password"
                                            name="current_password"
                                            type="password"
                                            value={passwordData.current_password}
                                            onChange={(e) => setPasswordData('current_password', e.target.value)}
                                            className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                                passwordErrors.current_password ? 'border-red-500' : ''
                                            }`}
                                            autoComplete="current-password"
                                            placeholder="Masukkan password lama"
                                        />
                                        <InputError message={passwordErrors.current_password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-gray-900 font-semibold">
                                            Password Baru <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={passwordData.password}
                                            onChange={(e) => setPasswordData('password', e.target.value)}
                                            className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                                passwordErrors.password ? 'border-red-500' : ''
                                            }`}
                                            autoComplete="new-password"
                                            placeholder="Masukkan password baru"
                                        />
                                        <InputError message={passwordErrors.password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation" className="text-gray-900 font-semibold">
                                            Konfirmasi Password Baru <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            value={passwordData.password_confirmation}
                                            onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                            className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                                passwordErrors.password_confirmation ? 'border-red-500' : ''
                                            }`}
                                            autoComplete="new-password"
                                            placeholder="Masukkan ulang password baru"
                                        />
                                        <InputError message={passwordErrors.password_confirmation} />
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                        <Button
                                            type="submit"
                                            disabled={processingPassword}
                                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                                        >
                                            {processingPassword ? 'Menyimpan...' : 'Simpan Password'}
                                        </Button>

                                        <Transition
                                            show={passwordData.current_password === '' && passwordData.password === '' && passwordData.password_confirmation === ''}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-500">Isi form untuk mengubah password</p>
                                        </Transition>
                                    </div>
                                </div>
                            </Card>
                        </Form>
                    </div>

                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
