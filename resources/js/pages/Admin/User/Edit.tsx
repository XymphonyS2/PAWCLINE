import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router, useForm } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    gelar: string | null;
    alamat: string | null;
    kontak: string | null;
}

export default function Edit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        alamat: user.alamat || '',
        kontak: user.kontak || '',
        gelar: user.gelar || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/user/${user.id}`, {
            onSuccess: () => {
                router.visit(`/admin/user?role=${user.role}`);
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title={`Edit ${user.role === 'admin' ? 'Admin' : user.role === 'dokter' ? 'Dokter' : 'Pemilik Hewan'}`} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Edit {user.role === 'admin' ? 'Admin' : user.role === 'dokter' ? 'Dokter' : 'Pemilik Hewan'}
                </h1>

                <Card className="p-6 max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Lengkap *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {user.role === 'dokter' && (
                            <div>
                                <Label htmlFor="gelar">Gelar *</Label>
                                <Input
                                    id="gelar"
                                    value={data.gelar}
                                    onChange={(e) => setData('gelar', e.target.value)}
                                    placeholder="Contoh: Sp.KH, drh"
                                    className={errors.gelar ? 'border-red-500' : ''}
                                />
                                {errors.gelar && <p className="text-red-500 text-sm mt-1">{errors.gelar}</p>}
                            </div>
                        )}

                        <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="password">Password (kosongkan jika tidak ingin mengubah)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <Label htmlFor="alamat">Alamat *</Label>
                            <Input
                                id="alamat"
                                value={data.alamat}
                                onChange={(e) => setData('alamat', e.target.value)}
                                className={errors.alamat ? 'border-red-500' : ''}
                            />
                            {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                        </div>

                        <div>
                            <Label htmlFor="kontak">Kontak *</Label>
                            <Input
                                id="kontak"
                                value={data.kontak}
                                onChange={(e) => setData('kontak', e.target.value)}
                                className={errors.kontak ? 'border-red-500' : ''}
                            />
                            {errors.kontak && <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>}
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit(`/admin/user?role=${user.role}`)}
                            >
                                Batal
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}


