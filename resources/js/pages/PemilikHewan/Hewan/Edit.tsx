import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Trash2, ArrowLeft } from 'lucide-react';

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
    ras_breed: string | null;
    jenis_kelamin: string;
    tanggal_lahir: string;
    berat_badan: number | null;
    foto: string | null;
}

export default function Edit({ hewan }: { hewan: Hewan }) {
    const { data, setData, put, processing, errors } = useForm({
        nama: hewan.nama,
        jenis: hewan.jenis,
        ras_breed: hewan.ras_breed || '',
        jenis_kelamin: hewan.jenis_kelamin,
        tanggal_lahir: hewan.tanggal_lahir,
        berat_badan: hewan.berat_badan?.toString() || '',
        foto: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pemilik-hewan/hewan/${hewan.id}`);
    };

    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${hewan.nama}? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(`/pemilik-hewan/hewan/${hewan.id}`, {
                onSuccess: () => {
                    router.visit('/pemilik-hewan/hewan');
                },
            });
        }
    };

    return (
        <AppSidebarLayout>
            <Head title={`Edit ${hewan.nama}`} />
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.visit(`/pemilik-hewan/hewan/${hewan.id}`)}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                {/* Title Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Edit Hewan
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Ubah informasi hewan peliharaan Anda
                    </p>
                </div>

                <Card className="p-6 max-w-2xl bg-white border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="nama" className="text-gray-900 font-semibold">
                                Nama Hewan <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="nama"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                placeholder="Masukkan nama hewan"
                                className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${
                                    errors.nama ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jenis" className="text-gray-900 font-semibold">
                                Jenis Hewan <span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)}>
                                <SelectTrigger className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.jenis ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Anjing">Anjing</SelectItem>
                                    <SelectItem value="Kucing">Kucing</SelectItem>
                                    <SelectItem value="Kelinci">Kelinci</SelectItem>
                                    <SelectItem value="Burung">Burung</SelectItem>
                                    <SelectItem value="Hamster">Hamster</SelectItem>
                                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.jenis && <p className="text-red-500 text-sm mt-1">{errors.jenis}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ras_breed" className="text-gray-900 font-semibold">
                                Ras/Breed
                            </Label>
                            <Input
                                id="ras_breed"
                                value={data.ras_breed}
                                onChange={(e) => setData('ras_breed', e.target.value)}
                                placeholder="Masukkan ras/breed (opsional)"
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jenis_kelamin" className="text-gray-900 font-semibold">
                                Jenis Kelamin <span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                                <SelectTrigger className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.jenis_kelamin ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="jantan">Jantan</SelectItem>
                                    <SelectItem value="betina">Betina</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tanggal_lahir" className="text-gray-900 font-semibold">
                                Tanggal Lahir <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="tanggal_lahir"
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.tanggal_lahir ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="berat_badan" className="text-gray-900 font-semibold">
                                Berat Badan (kg)
                            </Label>
                            <Input
                                id="berat_badan"
                                type="number"
                                step="0.1"
                                value={data.berat_badan}
                                onChange={(e) => setData('berat_badan', e.target.value)}
                                placeholder="Masukkan berat badan"
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="foto" className="text-gray-900 font-semibold">
                                Foto Hewan
                            </Label>
                            <Input
                                id="foto"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('foto', e.target.files?.[0] || null)}
                                className="bg-white border-gray-200 text-gray-900 h-11"
                            />
                            {hewan.foto && (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600 mb-2">Foto saat ini:</p>
                                    <img src={`/storage/${hewan.foto}`} alt={hewan.nama} className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
                                </div>
                            )}
                            <p className="text-xs text-gray-500">Kosongkan jika tidak ingin mengubah foto</p>
                            {errors.foto && <p className="text-red-500 text-sm mt-1">{errors.foto}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50"
                                onClick={() => router.visit(`/pemilik-hewan/hewan/${hewan.id}`)}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                onClick={handleDelete}
                                disabled={processing}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Hapus Hewan
                            </Button>
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md flex-1"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}

