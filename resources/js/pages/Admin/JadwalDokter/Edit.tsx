import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
}

interface Jadwal {
    id: number;
    dokter_id: number;
    hari: string;
    shift: string;
    jam_mulai: string;
    jam_selesai: string;
}

export default function Edit({
    jadwal,
    dokter,
}: {
    jadwal: Jadwal;
    dokter: Dokter[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        dokter_id: jadwal.dokter_id.toString(),
        hari: jadwal.hari,
        shift: jadwal.shift,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/jadwal-dokter/${jadwal.id}`, {
            onSuccess: () => {
                router.visit('/admin/jadwal-dokter');
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title="Edit Jadwal Dokter - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.visit('/admin/jadwal-dokter')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                {/* Title Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Edit Jadwal Dokter
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Ubah jadwal kerja dokter
                    </p>
                </div>

                <Card className="p-6 max-w-2xl bg-white border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Dokter */}
                        <div className="space-y-2">
                            <Label htmlFor="dokter_id" className="text-gray-900 font-semibold">
                                Dokter <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.dokter_id}
                                onValueChange={(value) => setData('dokter_id', value)}
                            >
                                <SelectTrigger className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.dokter_id ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {dokter.map((d) => (
                                        <SelectItem key={d.id} value={d.id.toString()}>
                                            dr. {d.name} {d.gelar ? `(${d.gelar})` : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.dokter_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.dokter_id}</p>
                            )}
                        </div>

                        {/* Hari */}
                        <div className="space-y-2">
                            <Label htmlFor="hari" className="text-gray-900 font-semibold">
                                Hari <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.hari}
                                onValueChange={(value) => setData('hari', value)}
                            >
                                <SelectTrigger className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.hari ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="senin">Senin</SelectItem>
                                    <SelectItem value="selasa">Selasa</SelectItem>
                                    <SelectItem value="rabu">Rabu</SelectItem>
                                    <SelectItem value="kamis">Kamis</SelectItem>
                                    <SelectItem value="jumat">Jumat</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.hari && (
                                <p className="text-red-500 text-sm mt-1">{errors.hari}</p>
                            )}
                        </div>

                        {/* Shift */}
                        <div className="space-y-2">
                            <Label htmlFor="shift" className="text-gray-900 font-semibold">
                                Shift <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.shift}
                                onValueChange={(value) => setData('shift', value)}
                            >
                                <SelectTrigger className={`bg-white border-gray-200 text-gray-900 h-11 ${
                                    errors.shift ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pagi">Pagi (08:00 - 12:00)</SelectItem>
                                    <SelectItem value="sore">Sore (13:00 - 16:00)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.shift && (
                                <p className="text-red-500 text-sm mt-1">{errors.shift}</p>
                            )}
                            <p className="text-xs text-gray-500">
                                Waktu akan diatur otomatis berdasarkan shift yang dipilih
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50"
                                onClick={() => router.visit('/admin/jadwal-dokter')}
                                disabled={processing}
                            >
                                Batal
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
