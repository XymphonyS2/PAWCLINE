import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Info } from 'lucide-react';

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
}

export default function Create({ dokter }: { dokter: Dokter[] }) {
    const { data, setData, post, processing, errors } = useForm({
        dokter_id: '',
        hari: '',
        shift: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/jadwal-dokter', {
            onSuccess: () => {
                router.visit('/admin/jadwal-dokter');
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title="Tambah Jadwal Dokter" />
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/admin/jadwal-dokter">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tambah Jadwal Dokter</h1>
                        <p className="text-gray-600 text-lg">Atur jadwal kerja dokter</p>
                    </div>
                </div>

                <Card className="p-6 max-w-2xl bg-white border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label htmlFor="dokter_id" className="text-gray-900 font-semibold">Dokter *</Label>
                            <Select
                                value={data.dokter_id}
                                onValueChange={(value) => setData('dokter_id', value)}
                            >
                                <SelectTrigger className={`mt-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${errors.dokter_id ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Pilih dokter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dokter.map((d) => (
                                        <SelectItem key={d.id} value={d.id.toString()}>
                                            dr. {d.name} {d.gelar || ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.dokter_id && (
                                <p className="text-red-500 text-sm mt-1">{errors.dokter_id}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="hari" className="text-gray-900 font-semibold">Hari *</Label>
                            <Select
                                value={data.hari}
                                onValueChange={(value) => setData('hari', value)}
                            >
                                <SelectTrigger className={`mt-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${errors.hari ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Pilih hari" />
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

                        <div>
                            <Label htmlFor="shift" className="text-gray-900 font-semibold">Shift *</Label>
                            <Select
                                value={data.shift}
                                onValueChange={(value) => setData('shift', value)}
                            >
                                <SelectTrigger className={`mt-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 h-11 ${errors.shift ? 'border-red-500' : ''}`}>
                                    <SelectValue placeholder="Pilih shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pagi">Pagi (08:00 - 12:00)</SelectItem>
                                    <SelectItem value="sore">Sore (13:00 - 16:00)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.shift && (
                                <p className="text-red-500 text-sm mt-1">{errors.shift}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                <Info className="w-4 h-4 text-blue-500" />
                                Jam mulai dan selesai akan diatur otomatis berdasarkan shift yang dipilih.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/admin/jadwal-dokter')}
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
