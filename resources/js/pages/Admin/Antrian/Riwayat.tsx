import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, FileText } from 'lucide-react';

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

interface RekamMedis {
    id: number;
    penanganan: string;
    dokter: Dokter;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    tanggal: string;
    status: string;
    hewan: Hewan;
    pemilik: Pemilik;
    dokter: Dokter | null;
    rekamMedis: RekamMedis | null;
}

export default function Riwayat({ antrian }: { antrian: { data: Antrian[] } }) {
    return (
        <AppSidebarLayout>
            <Head title="Riwayat Antrian" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Riwayat Antrian</h1>

                {antrian.data.length === 0 ? (
                    <Card className="p-12 text-center">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Belum ada riwayat</h3>
                        <p className="text-gray-600">Belum ada antrian yang telah selesai atau dilewati</p>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {antrian.data.map((a) => (
                            <Card key={a.id} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {a.nomor_antrian}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{a.hewan.nama}</h3>
                                            <p className="text-sm text-gray-600">
                                                Pemilik: {a.pemilik.name}
                                            </p>
                                            {a.dokter && (
                                                <p className="text-sm text-gray-600">
                                                    Dokter: dr. {a.dokter.name} {a.dokter.gelar || ''}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-600">
                                                {new Date(a.tanggal).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.visit(`/admin/antrian/${a.id}`)}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Detail
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}




