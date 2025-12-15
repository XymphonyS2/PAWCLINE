import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, SkipForward } from 'lucide-react';

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
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    status: string;
    keluhan: string | null;
    hewan: Hewan;
    pemilik: Pemilik;
    dokter: Dokter | null;
}

export default function Index({
    antrian,
    antrianSekarang,
    tanggal,
}: {
    antrian: Antrian[];
    antrianSekarang: Antrian | null;
    tanggal: string;
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
            <Head title="Daftar Antrian" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Daftar Antrian</h1>
                    <Input
                        type="date"
                        value={tanggal}
                        onChange={(e) => router.visit(`/admin/antrian?tanggal=${e.target.value}`)}
                        className="w-auto"
                    />
                </div>

                {antrianSekarang && (
                    <Card className="p-4 mb-6 bg-blue-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Antrian Sedang Diproses</h3>
                                <p>Nomor: #{antrianSekarang.nomor_antrian} - {antrianSekarang.hewan.nama}</p>
                            </div>
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {antrianSekarang.nomor_antrian}
                            </div>
                        </div>
                    </Card>
                )}

                <div className="space-y-3">
                    {antrian.map((a) => (
                        <Card key={a.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {a.nomor_antrian}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{a.hewan.nama}</h3>
                                        <p className="text-sm text-gray-600">Pemilik: {a.pemilik.name}</p>
                                        {a.keluhan && (
                                            <p className="text-sm text-gray-600">Keluhan: {a.keluhan}</p>
                                        )}
                                    </div>
                                    <Badge className={getStatusColor(a.status)}>
                                        {a.status === 'menunggu' && 'Menunggu'}
                                        {a.status === 'sedang_diproses' && 'Sedang Diproses'}
                                        {a.status === 'selesai' && 'Selesai'}
                                        {a.status === 'dilewati' && 'Dilewati'}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.visit(`/admin/antrian/${a.id}`)}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Detail
                                    </Button>
                                    {a.status === 'menunggu' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.post(`/admin/antrian/${a.id}/lewati`)}
                                        >
                                            <SkipForward className="w-4 h-4 mr-2" />
                                            Lewati
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppSidebarLayout>
    );
}




