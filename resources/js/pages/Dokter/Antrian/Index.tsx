import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, FileText } from 'lucide-react';

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

export default function Index({
    antrianSekarang,
    antrianMenunggu,
}: {
    antrianSekarang: Antrian | null;
    antrianMenunggu: Antrian[];
}) {
    return (
        <AppSidebarLayout>
            <Head title="Antrian" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Antrian</h1>

                {antrianSekarang ? (
                    <Card className="p-6 mb-6 bg-blue-50">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold">Antrian Sedang Diproses</h2>
                                <p className="text-gray-600">Nomor Antrian: #{antrianSekarang.nomor_antrian}</p>
                            </div>
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {antrianSekarang.nomor_antrian}
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <p><strong>Hewan:</strong> {antrianSekarang.hewan.nama}</p>
                            <p><strong>Pemilik:</strong> {antrianSekarang.pemilik.name}</p>
                            {antrianSekarang.keluhan && (
                                <p><strong>Keluhan:</strong> {antrianSekarang.keluhan}</p>
                            )}
                        </div>
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => router.visit(`/dokter/antrian/${antrianSekarang.id}/rekam-medis/create`)}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Buat Rekam Medis
                        </Button>
                    </Card>
                ) : (
                    <Card className="p-6 mb-6">
                        <p className="text-gray-500">Tidak ada antrian yang sedang diproses</p>
                    </Card>
                )}

                <div>
                    <h2 className="text-xl font-bold mb-4">Antrian Menunggu</h2>
                    {antrianMenunggu.length === 0 ? (
                        <Card className="p-6">
                            <p className="text-gray-500">Tidak ada antrian menunggu</p>
                        </Card>
                    ) : (
                        <div className="space-y-3">
                            {antrianMenunggu.map((antrian) => (
                                <Card key={antrian.id} className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {antrian.nomor_antrian}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{antrian.hewan.nama}</h3>
                                                <p className="text-sm text-gray-600">
                                                    Pemilik: {antrian.pemilik.name}
                                                </p>
                                                {antrian.keluhan && (
                                                    <p className="text-sm text-gray-600">
                                                        Keluhan: {antrian.keluhan}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            className="bg-pink-500 hover:bg-pink-600 text-white"
                                            onClick={() => router.post(`/dokter/antrian/${antrian.id}/mulai`)}
                                        >
                                            <Play className="w-4 h-4 mr-2" />
                                            Mulai
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppSidebarLayout>
    );
}




