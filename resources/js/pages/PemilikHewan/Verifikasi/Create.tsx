import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, FileText } from 'lucide-react';

interface Verifikasi {
    id: number;
    ktp_path: string;
    status: string;
}

export default function Create({
    verifikasi,
}: {
    verifikasi: Verifikasi | null;
}) {
    const { data, setData, post, processing, errors } = useForm({
        ktp: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pemilik-hewan/verifikasi');
    };

    return (
        <AppSidebarLayout>
            <Head title="Verifikasi Akun" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Verifikasi Akun</h1>

                {verifikasi && verifikasi.status === 'diterima' ? (
                    <Card className="p-6 max-w-2xl">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Akun Anda Sudah Terverifikasi</h2>
                            <p className="text-gray-600">
                                Verifikasi Anda telah diterima. Anda dapat menggunakan semua fitur aplikasi.
                            </p>
                        </div>
                    </Card>
                ) : verifikasi && verifikasi.status === 'pending' ? (
                    <Card className="p-6 max-w-2xl">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-yellow-500" />
                            </div>
                            <h2 className="text-xl font-bold mb-2">Menunggu Verifikasi</h2>
                            <p className="text-gray-600 mb-4">
                                Data verifikasi Anda sedang dalam proses review oleh admin.
                            </p>
                            {verifikasi.ktp_path && (
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600 mb-2">KTP yang telah diupload:</p>
                                    <img
                                        src={`/storage/${verifikasi.ktp_path}`}
                                        alt="KTP"
                                        className="max-w-full h-auto rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>
                    </Card>
                ) : (
                    <Card className="p-6 max-w-2xl">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Upload KTP</h2>
                            <p className="text-sm text-gray-600">
                                Untuk menggunakan fitur antrian, Anda perlu melakukan verifikasi akun terlebih dahulu.
                                Silakan upload foto KTP Anda.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="ktp">Foto KTP *</Label>
                                <div className="mt-2">
                                    <Input
                                        id="ktp"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('ktp', e.target.files?.[0] || null)}
                                        className={errors.ktp ? 'border-red-500' : ''}
                                    />
                                </div>
                                {errors.ktp && (
                                    <p className="text-red-500 text-sm mt-1">{errors.ktp}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">
                                    Format: JPG, PNG. Maksimal 2MB
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button
                                    type="submit"
                                    className="bg-pink-500 hover:bg-pink-600 text-white"
                                    disabled={processing || !data.ktp}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    {processing ? 'Mengupload...' : 'Upload KTP'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </Card>
                )}
            </div>
        </AppSidebarLayout>
    );
}




