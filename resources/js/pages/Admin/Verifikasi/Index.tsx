import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Check, X } from 'lucide-react';

interface Pemilik {
    id: number;
    name: string;
    email: string;
}

interface Verifikasi {
    id: number;
    pemilik_id: number;
    ktp_path: string;
    status: string;
    catatan: string | null;
    pemilik: Pemilik | null;
    created_at: string;
}

export default function Index({ verifikasi }: { verifikasi: Verifikasi[] }) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'diterima':
                return 'bg-green-500';
            case 'ditolak':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <AppSidebarLayout>
            <Head title="Verifikasi Akun" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Verifikasi Akun Pemilik Hewan</h1>

                {verifikasi.length === 0 ? (
                    <Card className="p-12 text-center">
                        <p className="text-gray-500">Tidak ada verifikasi yang perlu diproses</p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {verifikasi
                            .filter((v) => v.pemilik !== null)
                            .map((v) => (
                            <Card key={v.id} className="p-4 bg-white border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{v.pemilik?.name || 'N/A'}</h3>
                                            <p className="text-sm text-gray-600">{v.pemilik?.email || 'N/A'}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(v.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <Badge className={`${getStatusColor(v.status)} text-white`}>
                                            {v.status === 'pending' && 'Pending'}
                                            {v.status === 'diterima' && 'Diterima'}
                                            {v.status === 'ditolak' && 'Ditolak'}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                            onClick={() => router.visit(`/admin/verifikasi/${v.id}`)}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
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

