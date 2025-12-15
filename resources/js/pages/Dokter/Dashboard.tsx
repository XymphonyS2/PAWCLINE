import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MessageSquare, Play } from 'lucide-react';

interface Hewan {
    id: number;
    nama: string;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    keluhan: string | null;
    hewan: Hewan;
    pemilik: {
        id: number;
        name: string;
    };
}

interface Jadwal {
    id: number;
    hari: string;
    shift: string;
    jam_mulai: string;
    jam_selesai: string;
}

export default function Dashboard({
    antrianSekarang,
    antrianMenunggu,
    jadwal,
    pesanBaru,
}: {
    antrianSekarang: Antrian | null;
    antrianMenunggu: Antrian[];
    jadwal: Jadwal[];
    pesanBaru: number;
}) {
    return (
        <AppSidebarLayout>
            <Head title="Dashboard Dokter" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard Dokter</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Antrian Sekarang */}
                        {antrianSekarang ? (
                            <Card className="p-6 bg-blue-50">
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
                                    Buat Rekam Medis
                                </Button>
                            </Card>
                        ) : (
                            <Card className="p-6">
                                <p className="text-gray-500">Tidak ada antrian yang sedang diproses</p>
                            </Card>
                        )}

                        {/* Antrian Menunggu */}
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

                    <div className="space-y-4">
                        {/* Jadwal */}
                        <Card className="p-4">
                            <h3 className="font-bold mb-3 flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Jadwal Saya
                            </h3>
                            {jadwal.length === 0 ? (
                                <p className="text-sm text-gray-500">Belum ada jadwal</p>
                            ) : (
                                <div className="space-y-2">
                                    {jadwal.map((j) => (
                                        <div key={j.id} className="text-sm">
                                            <p className="font-medium capitalize">{j.hari}</p>
                                            <p className="text-gray-600 capitalize">
                                                {j.shift}: {j.jam_mulai} - {j.jam_selesai}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>

                        {/* Pesan Baru */}
                        <Card className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Pesan
                                </h3>
                                {pesanBaru > 0 && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                        {pesanBaru}
                                    </span>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.visit('/dokter/chat')}
                            >
                                Lihat Pesan
                            </Button>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-4">
                            <h3 className="font-bold mb-3">Aksi Cepat</h3>
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => router.visit('/dokter/antrian')}
                                >
                                    <Clock className="w-4 h-4 mr-2" />
                                    Lihat Antrian
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => router.visit('/dokter/antrian/riwayat')}
                                >
                                    Riwayat Antrian
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}




