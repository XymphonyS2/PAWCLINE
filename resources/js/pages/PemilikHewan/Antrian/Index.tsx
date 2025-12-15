import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface Hewan {
    id: number;
    nama: string;
}

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
}

interface Antrian {
    id: number;
    nomor_antrian: number;
    tanggal: string;
    status: string;
    keluhan: string | null;
    hewan: Hewan;
    dokter: Dokter | null;
}

export default function Index({ antrian }: { antrian: Antrian[] }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'menunggu':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'sedang_diproses':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'selesai':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'dilewati':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'menunggu':
                return 'Menunggu';
            case 'sedang_diproses':
                return 'Sedang Diproses';
            case 'selesai':
                return 'Selesai';
            case 'dilewati':
                return 'Dilewati';
            default:
                return status;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'menunggu':
                return <Clock className="w-4 h-4" />;
            case 'sedang_diproses':
                return <AlertCircle className="w-4 h-4" />;
            case 'selesai':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'dilewati':
                return <XCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    return (
        <AppSidebarLayout>
            <Head title="Antrian Saya - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Title Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Antrian Saya
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Kelola dan pantau semua antrian konsultasi hewan peliharaan Anda
                        </p>
                    </div>
                    <Link href="/pemilik-hewan/antrian/create">
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
                            <Plus className="w-4 h-4 mr-2" />
                            Ambil Antrian
                        </Button>
                    </Link>
                </div>

                {antrian.length === 0 ? (
                    <Card className="p-12 text-center bg-white border-gray-200 shadow-sm">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada antrian</h3>
                        <p className="text-gray-600 mb-6">Ambil antrian untuk konsultasi dengan dokter</p>
                        <Link href="/pemilik-hewan/antrian/create">
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md">
                                <Plus className="w-4 h-4 mr-2" />
                                Ambil Antrian
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {antrian.map((item) => (
                            <Card key={item.id} className="p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                                            {item.nomor_antrian}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-bold text-xl text-gray-900">{item.hewan.nama}</h3>
                                                <Badge className={`${getStatusColor(item.status)} border flex items-center gap-1`}>
                                                    {getStatusIcon(item.status)}
                                                    {getStatusText(item.status)}
                                                </Badge>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                {item.dokter && (
                                                    <p className="flex items-center gap-2">
                                                        <span>👨‍⚕️</span>
                                                        dr. {item.dokter.name} {item.dokter.gelar ? `(${item.dokter.gelar})` : ''}
                                                    </p>
                                                )}
                                                {item.keluhan && (
                                                    <p className="text-gray-700 mt-2 pt-2 border-t border-gray-200">
                                                        <span className="font-medium">Keluhan:</span> {item.keluhan}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            variant="outline"
                                            className="border-gray-300 hover:bg-gray-50"
                                            onClick={() => router.visit(`/pemilik-hewan/antrian/${item.id}`)}
                                        >
                                            Lihat Detail
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
