import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Hewan {
    id: number;
    nama: string;
}

interface Pemilik {
    id: number;
    name: string;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    keluhan: string | null;
    hewan: Hewan;
    pemilik: Pemilik;
}

export default function Create({ antrian }: { antrian: Antrian }) {
    const { data, setData, post, processing, errors } = useForm({
        penanganan: '',
        obat: '',
        tindakan_berkala: '',
        percepat_penyembuhan: '',
        yang_tidak_boleh_dilakukan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dokter/antrian/${antrian.id}/rekam-medis`, {
            onSuccess: () => {
                router.visit('/dokter/antrian');
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title="Buat Rekam Medis" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Buat Rekam Medis</h1>

                <Card className="p-6 mb-6">
                    <h2 className="font-bold mb-4">Informasi Antrian</h2>
                    <div className="space-y-2">
                        <p><strong>Nomor Antrian:</strong> #{antrian.nomor_antrian}</p>
                        <p><strong>Hewan:</strong> {antrian.hewan.nama}</p>
                        <p><strong>Pemilik:</strong> {antrian.pemilik.name}</p>
                        {antrian.keluhan && (
                            <p><strong>Keluhan:</strong> {antrian.keluhan}</p>
                        )}
                    </div>
                </Card>

                <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="penanganan">Penanganan *</Label>
                            <Textarea
                                id="penanganan"
                                value={data.penanganan}
                                onChange={(e) => setData('penanganan', e.target.value)}
                                rows={4}
                                className={errors.penanganan ? 'border-red-500' : ''}
                                placeholder="Jelaskan penanganan yang dilakukan..."
                            />
                            {errors.penanganan && (
                                <p className="text-red-500 text-sm mt-1">{errors.penanganan}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="obat">Obat</Label>
                            <Textarea
                                id="obat"
                                value={data.obat}
                                onChange={(e) => setData('obat', e.target.value)}
                                rows={3}
                                placeholder="Nama obat, dosis, frekuensi (contoh: Paracetamol 500mg, 2x sehari setelah makan)"
                            />
                        </div>

                        <div>
                            <Label htmlFor="tindakan_berkala">Tindakan Berkala</Label>
                            <Textarea
                                id="tindakan_berkala"
                                value={data.tindakan_berkala}
                                onChange={(e) => setData('tindakan_berkala', e.target.value)}
                                rows={3}
                                placeholder="Vaksinasi, checkup, dll"
                            />
                        </div>

                        <div>
                            <Label htmlFor="percepat_penyembuhan">Percepat Penyembuhan</Label>
                            <Textarea
                                id="percepat_penyembuhan"
                                value={data.percepat_penyembuhan}
                                onChange={(e) => setData('percepat_penyembuhan', e.target.value)}
                                rows={3}
                                placeholder="Apa yang harus dilakukan untuk mempercepat penyembuhan..."
                            />
                        </div>

                        <div>
                            <Label htmlFor="yang_tidak_boleh_dilakukan">Yang Tidak Boleh Dilakukan</Label>
                            <Textarea
                                id="yang_tidak_boleh_dilakukan"
                                value={data.yang_tidak_boleh_dilakukan}
                                onChange={(e) => setData('yang_tidak_boleh_dilakukan', e.target.value)}
                                rows={3}
                                placeholder="Apa yang tidak boleh dilakukan..."
                            />
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <Button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white"
                                disabled={processing}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan & Selesai Antrian'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/dokter/antrian')}
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




