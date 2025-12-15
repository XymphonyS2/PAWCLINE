import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
}

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
}

interface RekamMedis {
    id: number;
    penanganan: string;
    obat: string | null;
    tindakan_berkala: string | null;
    percepat_penyembuhan: string | null;
    yang_tidak_boleh_dilakukan: string | null;
    dokter: Dokter;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    tanggal: string;
    status: string;
    keluhan: string | null;
    hewan: Hewan;
    dokter: Dokter | null;
    rekamMedis: RekamMedis | null;
}

export default function Show({
    antrian,
    posisi,
    antrianSekarang,
}: {
    antrian: Antrian;
    posisi: number;
    antrianSekarang: Antrian | null;
}) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'menunggu':
                return 'bg-yellow-500';
            case 'sedang_diproses':
                return 'bg-blue-500';
            case 'selesai':
                return 'bg-green-500';
            case 'dilewati':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <AppSidebarLayout>
            <Head title={`Antrian #${antrian.nomor_antrian}`} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Detail Antrian</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-xl font-bold">Antrian #{antrian.nomor_antrian}</h2>
                                    <p className="text-gray-600">
                                        {new Date(antrian.tanggal).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <Badge className={getStatusColor(antrian.status)}>
                                    {antrian.status === 'menunggu' && 'Menunggu'}
                                    {antrian.status === 'sedang_diproses' && 'Sedang Diproses'}
                                    {antrian.status === 'selesai' && 'Selesai'}
                                    {antrian.status === 'dilewati' && 'Dilewati'}
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Informasi Hewan</h3>
                                    <p><strong>Nama:</strong> {antrian.hewan.nama}</p>
                                    <p><strong>Jenis:</strong> {antrian.hewan.jenis}</p>
                                </div>

                                {antrian.dokter && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Dokter</h3>
                                        <p>dr. {antrian.dokter.name} {antrian.dokter.gelar || ''}</p>
                                    </div>
                                )}

                                {antrian.keluhan && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Keluhan</h3>
                                        <p>{antrian.keluhan}</p>
                                    </div>
                                )}

                                {antrian.rekamMedis && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Rekam Medis</h3>
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
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div>
                        <Card className="p-6">
                            <h3 className="font-bold mb-4">Status Antrian</h3>
                            {antrian.status === 'menunggu' && (
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Posisi Anda dalam antrian:</p>
                                    <p className="text-3xl font-bold text-pink-500 mb-4">{posisi}</p>
                                    {antrianSekarang && (
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <p className="text-sm text-blue-800">
                                                Antrian yang sedang diproses: #{antrianSekarang.nomor_antrian}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {antrian.status === 'sedang_diproses' && (
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        Antrian Anda sedang diproses oleh dokter
                                    </p>
                                </div>
                            )}
                            {antrian.status === 'selesai' && (
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        Antrian telah selesai diproses
                                    </p>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}




