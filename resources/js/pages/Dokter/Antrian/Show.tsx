import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
}

interface Pemilik {
    id: number;
    name: string;
}

interface RekamMedis {
    id: number;
    penanganan: string;
    obat: string | null;
    tindakan_berkala: string | null;
    percepat_penyembuhan: string | null;
    yang_tidak_boleh_dilakukan: string | null;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    tanggal: string;
    status: string;
    keluhan: string | null;
    hewan: Hewan;
    pemilik: Pemilik;
    rekamMedis: RekamMedis | null;
}

export default function Show({ antrian }: { antrian: Antrian }) {
    return (
        <AppSidebarLayout>
            <Head title={`Antrian #${antrian.nomor_antrian}`} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Detail Antrian</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Informasi Antrian</h2>
                        <div className="space-y-2">
                            <p><strong>Nomor Antrian:</strong> #{antrian.nomor_antrian}</p>
                            <p><strong>Tanggal:</strong> {new Date(antrian.tanggal).toLocaleDateString('id-ID')}</p>
                            <Badge className={antrian.status === 'selesai' ? 'bg-green-500' : 'bg-blue-500'}>
                                {antrian.status === 'selesai' ? 'Selesai' : 'Sedang Diproses'}
                            </Badge>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Informasi Hewan</h2>
                        <div className="space-y-2">
                            <p><strong>Nama:</strong> {antrian.hewan.nama}</p>
                            <p><strong>Jenis:</strong> {antrian.hewan.jenis}</p>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Informasi Pemilik</h2>
                        <p><strong>Nama:</strong> {antrian.pemilik.name}</p>
                    </Card>

                    {antrian.keluhan && (
                        <Card className="p-6 lg:col-span-2">
                            <h2 className="text-xl font-bold mb-4">Keluhan</h2>
                            <p>{antrian.keluhan}</p>
                        </Card>
                    )}

                    {antrian.rekamMedis && (
                        <Card className="p-6 lg:col-span-2">
                            <h2 className="text-xl font-bold mb-4">Rekam Medis</h2>
                            <div className="space-y-2 text-sm">
                                <p><strong>Penanganan:</strong> {antrian.rekamMedis.penanganan}</p>
                                {antrian.rekamMedis.obat && (
                                    <p><strong>Obat:</strong> {antrian.rekamMedis.obat}</p>
                                )}
                                {antrian.rekamMedis.tindakan_berkala && (
                                    <p><strong>Tindakan Berkala:</strong> {antrian.rekamMedis.tindakan_berkala}</p>
                                )}
                                {antrian.rekamMedis.percepat_penyembuhan && (
                                    <p><strong>Percepat Penyembuhan:</strong> {antrian.rekamMedis.percepat_penyembuhan}</p>
                                )}
                                {antrian.rekamMedis.yang_tidak_boleh_dilakukan && (
                                    <p><strong>Yang Tidak Boleh Dilakukan:</strong> {antrian.rekamMedis.yang_tidak_boleh_dilakukan}</p>
                                )}
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}




