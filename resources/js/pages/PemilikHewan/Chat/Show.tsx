import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';

interface Dokter {
    id: number;
    name: string;
    gelar: string | null;
    email: string;
}

interface Pesan {
    id: number;
    pesan: string;
    dibaca: boolean;
    pengirim: {
        id: number;
        name: string;
        role: string;
    };
    penerima: {
        id: number;
        name: string;
    };
    created_at: string;
}

export default function Show({
    dokter,
    pesan,
}: {
    dokter: Dokter;
    pesan: Pesan[];
}) {
    const { data, setData, post, processing, reset } = useForm({
        pesan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/pemilik-hewan/chat/${dokter.id}`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title={`Chat dengan dr. ${dokter.name}`} />
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit('/pemilik-hewan/chat')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            dr. {dokter.name} {dokter.gelar || ''}
                        </h1>
                        <p className="text-gray-600">{dokter.email}</p>
                    </div>
                </div>

                <Card className="h-[600px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {pesan.map((p) => {
                            const isPengirim = p.pengirim.role === 'pemilik_hewan';
                            return (
                                <div
                                    key={p.id}
                                    className={`flex ${isPengirim ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${
                                            isPengirim
                                                ? 'bg-pink-500 text-white'
                                                : 'bg-gray-100 text-gray-900'
                                        }`}
                                    >
                                        <p className="text-sm">{p.pesan}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                isPengirim ? 'text-pink-100' : 'text-gray-500'
                                            }`}
                                        >
                                            {new Date(p.created_at).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t">
                        <div className="flex items-center gap-2">
                            <Input
                                value={data.pesan}
                                onChange={(e) => setData('pesan', e.target.value)}
                                placeholder="Ketik pesan..."
                                className="flex-1"
                            />
                            <Button
                                type="submit"
                                className="bg-pink-500 hover:bg-pink-600 text-white"
                                disabled={processing || !data.pesan.trim()}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppSidebarLayout>
    );
}




