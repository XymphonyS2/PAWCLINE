import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Heart, AlertCircle } from 'lucide-react';

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
}

export default function Create({
    hewan,
    nomorAntrianBerikutnya,
}: {
    hewan: Hewan[];
    nomorAntrianBerikutnya: number;
}) {
    const { data, setData, post, processing, errors } = useForm({
        hewan_id: '',
        keluhan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pemilik-hewan/antrian', {
            onSuccess: () => {
                router.visit('/pemilik-hewan/antrian');
            },
        });
    };

    if (hewan.length === 0) {
        return (
            <AppSidebarLayout>
                <Head title="Ambil Antrian - Pawcline" />
                <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Ambil Antrian
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Buat antrian baru untuk konsultasi dengan dokter
                        </p>
                    </div>

                    <Card className="p-12 text-center bg-white border-gray-200 shadow-sm">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada hewan</h3>
                        <p className="text-gray-600 mb-6">Anda perlu menambahkan hewan terlebih dahulu sebelum mengambil antrian</p>
                        <Button
                            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md"
                            onClick={() => router.visit('/pemilik-hewan/hewan/create')}
                        >
                            <Heart className="w-4 h-4 mr-2" />
                            Tambah Hewan
                        </Button>
                    </Card>
                </div>
            </AppSidebarLayout>
        );
    }

    return (
        <AppSidebarLayout>
            <Head title="Ambil Antrian - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Title Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Ambil Antrian
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Buat antrian baru untuk konsultasi dengan dokter
                    </p>
                </div>

                <Card className="p-6 max-w-2xl bg-white border-gray-200 shadow-sm">
                    {/* Nomor Antrian Display */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <Label className="text-sm text-gray-600 mb-1 block">Nomor Antrian Anda:</Label>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-500 text-white text-lg px-4 py-2 font-bold">
                                        {nomorAntrianBerikutnya}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Pilih Hewan */}
                        <div className="space-y-2">
                            <Label htmlFor="hewan_id" className="text-gray-900 font-semibold">
                                Pilih Hewan <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={data.hewan_id}
                                onValueChange={(value) => setData('hewan_id', value)}
                            >
                                <SelectTrigger 
                                    className={`h-11 bg-white border-gray-200 text-gray-900 ${
                                        errors.hewan_id ? 'border-red-500 focus:border-red-500' : ''
                                    }`}
                                >
                                    <SelectValue placeholder="Pilih hewan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hewan.map((h) => (
                                        <SelectItem key={h.id} value={h.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <Heart className="w-4 h-4 text-pink-500" />
                                                <span>{h.nama}</span>
                                                <span className="text-gray-500">({h.jenis})</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.hewan_id && (
                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{errors.hewan_id}</span>
                                </div>
                            )}
                        </div>

                        {/* Keluhan */}
                        <div className="space-y-2">
                            <Label htmlFor="keluhan" className="text-gray-900 font-semibold">
                                Keluhan <span className="text-gray-500 font-normal">(Opsional)</span>
                            </Label>
                            <Textarea
                                id="keluhan"
                                value={data.keluhan}
                                onChange={(e) => setData('keluhan', e.target.value)}
                                rows={5}
                                placeholder="Jelaskan keluhan atau masalah yang dialami hewan peliharaan Anda..."
                                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 resize-none"
                            />
                            <p className="text-xs text-gray-500">
                                Berikan informasi detail tentang kondisi hewan peliharaan Anda untuk membantu dokter dalam diagnosis
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md flex-1"
                                disabled={processing}
                            >
                                {processing ? 'Mengambil Antrian...' : 'Ambil Antrian'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-300 hover:bg-gray-50"
                                onClick={() => router.visit('/pemilik-hewan/antrian')}
                                disabled={processing}
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
