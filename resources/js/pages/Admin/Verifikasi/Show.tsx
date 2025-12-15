import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Pemilik {
    id: number;
    name: string;
    email: string;
}

interface Verifikasi {
    id: number;
    ktp_path: string;
    status: string;
    catatan: string | null;
    pemilik: Pemilik;
    created_at: string;
}

export default function Show({ verifikasi }: { verifikasi: Verifikasi }) {
    const { data, setData, put, processing } = useForm({
        status: verifikasi.status,
        catatan: verifikasi.catatan || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/verifikasi/${verifikasi.id}`, {
            onSuccess: () => {
                router.visit('/admin/verifikasi');
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title={`Verifikasi - ${verifikasi.pemilik.name}`} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Detail Verifikasi</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h2 className="font-bold mb-4">Informasi Pemilik</h2>
                        <div className="space-y-2">
                            <p><strong>Nama:</strong> {verifikasi.pemilik.name}</p>
                            <p><strong>Email:</strong> {verifikasi.pemilik.email}</p>
                            <p><strong>Tanggal Pengajuan:</strong> {new Date(verifikasi.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="font-bold mb-4">Foto KTP</h2>
                        <img
                            src={`/storage/${verifikasi.ktp_path}`}
                            alt="KTP"
                            className="w-full rounded-lg border"
                        />
                    </Card>
                </div>

                <Card className="p-6 mt-6">
                    <h2 className="font-bold mb-4">Verifikasi</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="status">Status *</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) => setData('status', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="diterima">Diterima</SelectItem>
                                    <SelectItem value="ditolak">Ditolak</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="catatan">Catatan</Label>
                            <Textarea
                                id="catatan"
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                                rows={4}
                                placeholder="Tambahkan catatan (opsional)"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white"
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Simpan'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/admin/verifikasi')}
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




