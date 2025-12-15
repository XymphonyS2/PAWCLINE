import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, MessageCircle, FileCheck, Bell } from 'lucide-react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface Notifikasi {
    id: string;
    tipe: string;
    judul: string;
    pesan: string;
    dibaca: boolean;
    created_at: string;
    icon: string;
    link: string;
}

export default function Index({
    notifikasi,
    unreadCount,
}: {
    notifikasi: Notifikasi[];
    unreadCount: number;
}) {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'check-circle':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'clock':
                return <Clock className="w-5 h-5 text-blue-500" />;
            case 'message-circle':
                return <MessageCircle className="w-5 h-5 text-purple-500" />;
            case 'file-check':
                return <FileCheck className="w-5 h-5 text-orange-500" />;
            default:
                return <Bell className="w-5 h-5 text-gray-500" />;
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'Baru saja';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} menit yang lalu`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} jam yang lalu`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} hari yang lalu`;
        } else {
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        }
    };

    return (
        <AppSidebarLayout>
            <Head title="Notifikasi - Pawcline" />
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifikasi</h1>
                        <p className="text-gray-600 text-lg">
                            {unreadCount > 0 
                                ? `${unreadCount} notifikasi belum dibaca`
                                : 'Semua notifikasi sudah dibaca'
                            }
                        </p>
                    </div>
                </div>

                {/* Notifikasi List */}
                {notifikasi.length === 0 ? (
                    <Card className="p-12 text-center bg-white border-gray-200">
                        <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-gray-900">Tidak ada notifikasi</h3>
                        <p className="text-gray-600">Anda belum memiliki notifikasi</p>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {notifikasi.map((notif) => (
                            <Card
                                key={notif.id}
                                className={`p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                                    !notif.dibaca ? 'border-l-4 border-l-blue-500' : ''
                                }`}
                                onClick={() => router.visit(notif.link)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1">
                                        {getIcon(notif.icon)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">{notif.judul}</h3>
                                            {!notif.dibaca && (
                                                <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5">
                                                    Baru
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-gray-700 mb-2">{notif.pesan}</p>
                                        <p className="text-xs text-gray-500">{formatDate(notif.created_at)}</p>
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



