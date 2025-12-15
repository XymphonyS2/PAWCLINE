import { Card } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { MessageCircle, Stethoscope } from 'lucide-react';

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
    email: string;
    unread_count: number;
}

export default function Index({ dokter }: { dokter: Dokter[] }) {
    return (
        <AppSidebarLayout>
            <Head title="Chat dengan Dokter" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Pilih Dokter untuk Chat</h1>

                {dokter.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Belum ada dokter tersedia</h3>
                        <p className="text-gray-600">Silakan hubungi admin untuk informasi lebih lanjut</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dokter.map((d) => (
                            <Card
                                key={d.id}
                                className="p-4 cursor-pointer hover:shadow-lg transition"
                                onClick={() => router.visit(`/pemilik-hewan/chat/${d.id}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Stethoscope className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            dr. {d.name} {d.gelar || ''}
                                        </h3>
                                        <p className="text-sm text-gray-600">{d.email}</p>
                                    </div>
                                    <div className="relative">
                                        <MessageCircle className="w-5 h-5 text-gray-400" />
                                        {d.unread_count > 0 && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">{d.unread_count > 9 ? '9+' : d.unread_count}</span>
                                            </span>
                                        )}
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


