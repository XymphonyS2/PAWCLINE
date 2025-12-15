import { Card } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, router } from '@inertiajs/react';
import { MessageCircle, Users } from 'lucide-react';

interface PemilikHewan {
    id: number;
    name: string;
    email: string;
    unread_count: number;
}

export default function Index({ pemilikHewan }: { pemilikHewan: PemilikHewan[] }) {
    return (
        <AppSidebarLayout>
            <Head title="Chat dengan Pemilik Hewan" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Chat dengan Pemilik Hewan</h1>

                {pemilikHewan.length === 0 ? (
                    <Card className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Belum ada percakapan</h3>
                        <p className="text-gray-600">Belum ada pemilik hewan yang mengirim pesan</p>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pemilikHewan.map((p) => (
                            <Card
                                key={p.id}
                                className="p-4 cursor-pointer hover:shadow-lg transition"
                                onClick={() => router.visit(`/dokter/chat/${p.id}`)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-pink-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{p.name}</h3>
                                        <p className="text-sm text-gray-600">{p.email}</p>
                                    </div>
                                    <div className="relative">
                                        <MessageCircle className="w-5 h-5 text-gray-400" />
                                        {p.unread_count > 0 && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">{p.unread_count > 9 ? '9+' : p.unread_count}</span>
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


