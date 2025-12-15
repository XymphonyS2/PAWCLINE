import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';

interface PemilikHewan {
    id: number;
    name: string;
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
    pemilikHewan,
    pesan,
}: {
    pemilikHewan: PemilikHewan;
    pesan: Pesan[];
}) {
    const { data, setData, post, processing, reset } = useForm({
        pesan: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dokter/chat/${pemilikHewan.id}`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title={`Chat dengan ${pemilikHewan.name}`} />
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.visit('/dokter/chat')}
                    >
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">{pemilikHewan.name}</h1>
                        <p className="text-gray-600">{pemilikHewan.email}</p>
                    </div>
                </div>

                <Card className="h-[600px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {pesan.map((p) => {
                            const isPengirim = p.pengirim.role === 'dokter';
                            return (
                                <div
                                    key={p.id}
                                    className={`flex ${isPengirim ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${
                                            isPengirim
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 text-gray-900'
                                        }`}
                                    >
                                        <p className="text-sm">{p.pesan}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                isPengirim ? 'text-blue-100' : 'text-gray-500'
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
                                className="bg-blue-500 hover:bg-blue-600 text-white"
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




