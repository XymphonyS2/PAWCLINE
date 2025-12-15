import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error403() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                        <AlertTriangle className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
                    <div className="w-12 h-0.5 bg-gray-300 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Akses Ditolak</h2>
                    <p className="text-gray-600 mb-6">
                        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. 
                        Pastikan Anda login dengan akun yang memiliki akses yang sesuai.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Button>
                    <Link href="/">
                        <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white flex items-center justify-center gap-2">
                            <Home className="w-4 h-4" />
                            Beranda
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}



