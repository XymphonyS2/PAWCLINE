import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit, Calendar, FileText } from 'lucide-react';

interface RekamMedis {
    id: number;
    penanganan: string;
    obat: string | null;
    tindakan_berkala: string | null;
    percepat_penyembuhan: string | null;
    yang_tidak_boleh_dilakukan: string | null;
    dokter: {
        id: number;
        name: string;
        gelar: string | null;
    };
    created_at: string;
}

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
    ras_breed: string | null;
    jenis_kelamin: string;
    tanggal_lahir: string;
    umur: number;
    umur_text: string;
    berat_badan: number | null;
    foto: string | null;
    rekamMedis: RekamMedis[];
}

export default function Show({ hewan }: { hewan: Hewan }) {
    return (
        <AppSidebarLayout>
            <Head title={`Detail ${hewan.nama}`} />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Detail Hewan</h1>
                    <div className="flex items-center gap-2">
                        <Link href={`/pemilik-hewan/hewan/${hewan.id}/edit`}>
                            <Button variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Button
                            className="bg-pink-500 hover:bg-pink-600 text-white"
                            onClick={() => router.visit('/pemilik-hewan/antrian/create', {
                                data: { hewan_id: hewan.id }
                            })}
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            Ambil Antrian
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <Card className="p-6">
                            {hewan.foto ? (
                                <img
                                    src={`/storage/${hewan.foto}`}
                                    alt={hewan.nama}
                                    className="w-full rounded-lg mb-4"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-4xl">🐾</span>
                                </div>
                            )}
                            <h2 className="text-2xl font-bold mb-4">{hewan.nama}</h2>
                            <div className="space-y-2 text-sm">
                                <p><strong>Jenis:</strong> {hewan.jenis}</p>
                                <p><strong>Ras/Breed:</strong> {hewan.ras_breed || '-'}</p>
                                <p><strong>Jenis Kelamin:</strong> {hewan.jenis_kelamin === 'jantan' ? 'Jantan' : 'Betina'}</p>
                                <p><strong>Umur:</strong> {hewan.umur_text}</p>
                                <p><strong>Tanggal Lahir:</strong> {new Date(hewan.tanggal_lahir).toLocaleDateString('id-ID')}</p>
                                {hewan.berat_badan && (
                                    <p><strong>Berat Badan:</strong> {hewan.berat_badan} kg</p>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-pink-500" />
                                <h2 className="text-xl font-bold">Rekam Medis</h2>
                            </div>

                            {hewan.rekamMedis.length === 0 ? (
                                <p className="text-gray-500">Belum ada rekam medis</p>
                            ) : (
                                <div className="space-y-4">
                                    {hewan.rekamMedis.map((rekam) => (
                                        <div key={rekam.id} className="border-l-4 border-pink-500 pl-4 py-2">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-semibold">
                                                    dr. {rekam.dokter.name} {rekam.dokter.gelar || ''}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(rekam.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <p><strong>Penanganan:</strong> {rekam.penanganan}</p>
                                                {rekam.obat && <p><strong>Obat:</strong> {rekam.obat}</p>}
                                                {rekam.tindakan_berkala && (
                                                    <p><strong>Tindakan Berkala:</strong> {rekam.tindakan_berkala}</p>
                                                )}
                                                {rekam.percepat_penyembuhan && (
                                                    <p><strong>Percepat Penyembuhan:</strong> {rekam.percepat_penyembuhan}</p>
                                                )}
                                                {rekam.yang_tidak_boleh_dilakukan && (
                                                    <p><strong>Yang Tidak Boleh Dilakukan:</strong> {rekam.yang_tidak_boleh_dilakukan}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}

