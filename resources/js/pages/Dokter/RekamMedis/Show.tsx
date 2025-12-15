import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head } from '@inertiajs/react';
import { Card } from '@/components/ui/card';

interface Hewan {
    id: number;
    nama: string;
}

interface Pemilik {
    id: number;
    name: string;
}

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    pemilik: Pemilik;
}

interface RekamMedis {
    id: number;
    penanganan: string;
    obat: string | null;
    tindakan_berkala: string | null;
    percepat_penyembuhan: string | null;
    yang_tidak_boleh_dilakukan: string | null;
    hewan: Hewan;
    dokter: Dokter;
    antrian: Antrian;
}

export default function Show({ rekamMedis }: { rekamMedis: RekamMedis }) {
    return (
        <AppSidebarLayout>
            <Head title="Detail Rekam Medis" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Detail Rekam Medis</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Informasi Hewan</h2>
                        <p><strong>Nama:</strong> {rekamMedis.hewan.nama}</p>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold mb-4">Informasi Pemilik</h2>
                        <p><strong>Nama:</strong> {rekamMedis.antrian.pemilik.name}</p>
                    </Card>

                    <Card className="p-6 lg:col-span-2">
                        <h2 className="text-xl font-bold mb-4">Rekam Medis</h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold mb-1">Penanganan</h3>
                                <p>{rekamMedis.penanganan}</p>
                            </div>

                            {rekamMedis.obat && (
                                <div>
                                    <h3 className="font-semibold mb-1">Obat</h3>
                                    <p>{rekamMedis.obat}</p>
                                </div>
                            )}

                            {rekamMedis.tindakan_berkala && (
                                <div>
                                    <h3 className="font-semibold mb-1">Tindakan Berkala</h3>
                                    <p>{rekamMedis.tindakan_berkala}</p>
                                </div>
                            )}

                            {rekamMedis.percepat_penyembuhan && (
                                <div>
                                    <h3 className="font-semibold mb-1">Percepat Penyembuhan</h3>
                                    <p>{rekamMedis.percepat_penyembuhan}</p>
                                </div>
                            )}

                            {rekamMedis.yang_tidak_boleh_dilakukan && (
                                <div>
                                    <h3 className="font-semibold mb-1">Yang Tidak Boleh Dilakukan</h3>
                                    <p>{rekamMedis.yang_tidak_boleh_dilakukan}</p>
                                </div>
                            )}

                            <div className="mt-4 pt-4 border-t">
                                <p><strong>Dokter:</strong> dr. {rekamMedis.dokter.name} {rekamMedis.dokter.gelar || ''}</p>
                                <p><strong>Nomor Antrian:</strong> #{rekamMedis.antrian.nomor_antrian}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppSidebarLayout>
    );
}




