import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function Create({ role: initialRole }: { role: string }) {
    const { data, setData, post, processing, errors } = useForm({
        role: initialRole || 'admin',
        name: '',
        email: '',
        password: '',
        alamat: '',
        kontak: '',
        gelar: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/user`, {
            onSuccess: () => {
                router.visit(`/admin/user?role=${data.role}`);
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title="Tambah User Baru - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.visit('/admin/user')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                {/* Title Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tambah Akun Baru
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Buat akun baru untuk Admin, Dokter, atau Pemilik Hewan
                    </p>
                </div>

                <Card className="p-6 max-w-2xl bg-white border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-gray-900 font-semibold">
                                Pilih Role <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) => setData('role', value)}
                            >
                                <SelectTrigger className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.role ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue placeholder="Pilih role" />
                                </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="admin">Admin</SelectItem>
                                          <SelectItem value="dokter">Dokter</SelectItem>
                                          <SelectItem value="pemilik_hewan">Pemilik Hewan</SelectItem>
                                      </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                            )}
                        </div>

                        {/* Nama Lengkap */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-900 font-semibold">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                    errors.name ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Gelar (hanya untuk Dokter) */}
                        {data.role === 'dokter' && (
                            <div className="space-y-2">
                                <Label htmlFor="gelar" className="text-gray-900 font-semibold">
                                    Gelar <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="gelar"
                                    value={data.gelar}
                                    onChange={(e) => setData('gelar', e.target.value)}
                                    placeholder="Contoh: Sp.KH, drh"
                                    className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                        errors.gelar ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.gelar && (
                                    <p className="text-red-500 text-sm mt-1">{errors.gelar}</p>
                                )}
                            </div>
                        )}

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-900 font-semibold">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="contoh@email.com"
                                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-900 font-semibold">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Minimal 8 karakter"
                                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                    errors.password ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Alamat */}
                        <div className="space-y-2">
                            <Label htmlFor="alamat" className="text-gray-900 font-semibold">
                                Alamat <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="alamat"
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                placeholder="Masukkan alamat lengkap"
                                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                    errors.alamat ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.alamat && (
                                <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                            )}
                        </div>

                        {/* Kontak */}
                        <div className="space-y-2">
                            <Label htmlFor="kontak" className="text-gray-900 font-semibold">
                                Kontak <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="kontak"
                                value={data.kontak}
                                onChange={(e) => setData('kontak', e.target.value)}
                                placeholder="Nomor telepon atau WhatsApp"
                                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                    errors.kontak ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.kontak && (
                                <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50"
                                onClick={() => router.visit('/admin/user')}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md flex-1"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}

