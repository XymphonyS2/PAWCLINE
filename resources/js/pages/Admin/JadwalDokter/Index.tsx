import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Calendar, Clock } from 'lucide-react';

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
}

interface Jadwal {
    id: number;
    hari: string;
    shift: string;
    jam_mulai: string;
    jam_selesai: string;
    dokter: Dokter;
}

export default function Index({
    jadwal,
    dokter,
}: {
    jadwal: Jadwal[];
    dokter: Dokter[];
}) {
    const hariIndo: Record<string, string> = {
        senin: 'Senin',
        selasa: 'Selasa',
        rabu: 'Rabu',
        kamis: 'Kamis',
        jumat: 'Jumat',
    };

    return (
        <AppSidebarLayout>
            <Head title="Jadwal Dokter" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Jadwal Dokter</h1>
                    <Link href="/admin/jadwal-dokter/create">
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Jadwal
                        </Button>
                    </Link>
                </div>

                {jadwal.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Belum ada jadwal</h3>
                        <Link href="/admin/jadwal-dokter/create">
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white mt-4">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Jadwal
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {jadwal.map((j) => (
                            <Card key={j.id} className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Calendar className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                dr. {j.dokter.name} {j.dokter.gelar || ''}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {hariIndo[j.hari]} - {j.shift === 'pagi' ? 'Pagi' : 'Sore'} ({j.jam_mulai} - {j.jam_selesai})
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => router.visit(`/admin/jadwal-dokter/${j.id}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                if (confirm('Hapus jadwal ini?')) {
                                                    router.delete(`/admin/jadwal-dokter/${j.id}`);
                                                }
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}




