import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { 
    Heart, 
    Calendar, 
    CheckCircle2, 
    AlertTriangle, 
    Plus, 
    ArrowRight, 
    Stethoscope,
    Clock,
    MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type SharedData } from '@/types';

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
    ras_breed: string | null;
    umur: number;
    umur_text: string;
    foto: string | null;
    status: string;
    vaksin_berikutnya: string | null;
}

interface Jadwal {
    id: number;
    tanggal: string;
    hewan_nama: string;
    dokter_nama: string | null;
    dokter_gelar: string | null;
    jam: string;
    jenis: string;
}

interface Notifikasi {
    id: number;
    pesan: string;
    dibaca: boolean;
    pengirim: string;
    created_at: string;
    icon: string;
}

export default function Dashboard({
    user,
    totalHewan,
    totalHewanBulanIni,
    appointmentMingguIni,
    checkupSelesai,
    checkupSelesaiBulanIni,
    vaksinPending,
    hewanTerbaru,
    jadwalMendatang,
    notifikasi,
    notifikasiCount,
}: {
    user: { name: string; email: string };
    totalHewan: number;
    totalHewanBulanIni: number;
    appointmentMingguIni: number;
    checkupSelesai: number;
    checkupSelesaiBulanIni: number;
    vaksinPending: number;
    hewanTerbaru: Hewan[];
    jadwalMendatang: Jadwal[];
    notifikasi: Notifikasi[];
    notifikasiCount: number;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppSidebarLayout>
            <Head title="Dashboard - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">
                                Selamat Datang Kembali, {user.name}! 👋
                            </h1>
                            <p className="text-pink-100 text-lg">
                                Sahabat berbulu Anda menunggu perawatan terbaik hari ini
                            </p>
                        </div>
                        <Link
                            href="/pemilik-hewan/hewan/create"
                            className="bg-white text-pink-500 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition flex items-center gap-2 shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Hewan
                        </Link>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-5 bg-white border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-pink-100 rounded-xl">
                                <Heart className="w-6 h-6 text-pink-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Hewan</p>
                                <p className="text-3xl font-bold text-gray-900">{totalHewan}</p>
                                <p className="text-xs text-gray-500 mt-1">+{totalHewanBulanIni} bulan ini</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Calendar className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Appointment</p>
                                <p className="text-3xl font-bold text-gray-900">{appointmentMingguIni}</p>
                                <p className="text-xs text-gray-500 mt-1">Minggu ini</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Checkup Selesai</p>
                                <p className="text-3xl font-bold text-gray-900">{checkupSelesai}</p>
                                <p className="text-xs text-gray-500 mt-1">+{checkupSelesaiBulanIni} bulan ini</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border-gray-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <AlertTriangle className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Vaksin Pending</p>
                                <p className="text-3xl font-bold text-gray-900">{vaksinPending}</p>
                                <p className="text-xs text-gray-500 mt-1">Perlu perhatian</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hewan Saya Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-900">Hewan Saya</h2>
                                <Link
                                    href="/pemilik-hewan/hewan"
                                    className="text-pink-500 hover:text-pink-600 text-sm font-semibold"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {hewanTerbaru.length > 0 ? (
                                    hewanTerbaru.map((hewan) => (
                                        <Card key={hewan.id} className="overflow-hidden p-0 bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                                            <div className="relative">
                                                {hewan.foto ? (
                                                    <img
                                                        src={`/storage/${hewan.foto}`}
                                                        alt={hewan.nama}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                                        <span className="text-4xl">🐾</span>
                                                    </div>
                                                )}
                                                <Badge 
                                                    className={`absolute top-3 right-3 ${
                                                        hewan.status === 'Sehat' 
                                                            ? 'bg-green-500 text-white' 
                                                            : 'bg-orange-500 text-white'
                                                    }`}
                                                >
                                                    {hewan.status === 'Sehat' ? '✓ Sehat' : 'Checkup'}
                                                </Badge>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-bold text-lg text-gray-900">{hewan.nama}</h3>
                                                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {hewan.ras_breed || hewan.jenis} • {hewan.umur_text}
                                                </p>
                                                {hewan.vaksin_berikutnya && (
                                                    <p className="text-xs text-gray-500 mb-4">
                                                        Vaksin: {hewan.vaksin_berikutnya}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                                                        onClick={() => router.visit(`/pemilik-hewan/hewan/${hewan.id}`)}
                                                    >
                                                        Lihat Detail
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="border border-gray-200">
                                                        <Calendar className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-12 text-gray-500">
                                        <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                        <p>Belum ada hewan. Tambahkan hewan pertama Anda!</p>
                                        <Link
                                            href="/pemilik-hewan/hewan/create"
                                            className="mt-4 inline-block text-pink-500 hover:text-pink-600 font-semibold"
                                        >
                                            + Tambah Hewan
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Jadwal Mendatang */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Jadwal Mendatang</h2>
                            <div className="space-y-3">
                                {jadwalMendatang.length > 0 ? (
                                    jadwalMendatang.map((jadwal) => {
                                        const tanggal = new Date(jadwal.tanggal);
                                        const hari = tanggal.getDate();
                                        const bulan = tanggal.toLocaleDateString('id-ID', { month: 'short' });
                                        
                                        return (
                                            <Card key={jadwal.id} className="p-4 bg-white border-gray-200 shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex flex-col items-center justify-center text-white font-bold shrink-0 shadow-md">
                                                        <span className="text-lg">{hari}</span>
                                                        <span className="text-xs">{bulan}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 mb-1">
                                                            {jadwal.hewan_nama} - {jadwal.jenis}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            {jadwal.dokter_nama ? `dr. ${jadwal.dokter_gelar ? `${jadwal.dokter_gelar} ` : ''}${jadwal.dokter_nama}` : 'Belum ditentukan'} • {jadwal.jam}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        className="bg-pink-500 hover:bg-pink-600 text-white"
                                                        onClick={() => router.visit(`/pemilik-hewan/antrian/${jadwal.id}`)}
                                                    >
                                                        Detail
                                                    </Button>
                                                </div>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <Card className="p-8 text-center text-gray-500 bg-white border-gray-200 shadow-sm">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                        <p>Belum ada jadwal mendatang</p>
                                    </Card>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-4 border-pink-500 text-pink-500 hover:bg-pink-50"
                                onClick={() => router.visit('/pemilik-hewan/antrian/create')}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Buat Appointment Baru
                            </Button>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-4">
                        {/* Notifikasi */}
                        <Card className="p-5 bg-white border-gray-200 shadow-sm">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Notifikasi</h3>
                            <div className="space-y-3">
                                {notifikasi.length > 0 ? (
                                    notifikasi.map((notif) => {
                                        const getIcon = () => {
                                            if (notif.icon === 'clock') return <Clock className="w-4 h-4 text-orange-500" />;
                                            if (notif.icon === 'calendar') return <Calendar className="w-4 h-4 text-blue-500" />;
                                            return <CheckCircle2 className="w-4 h-4 text-green-500" />;
                                        };
                                        
                                        return (
                                            <div key={notif.id} className="flex items-start gap-3 text-sm pb-3 border-b border-gray-100 last:border-0">
                                                {getIcon()}
                                                <div className="flex-1">
                                                    <p className="text-gray-700">{notif.pesan}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{notif.created_at}</p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500 text-center py-4">Tidak ada notifikasi</p>
                                )}
                            </div>
                        </Card>

                        {/* Tips Kesehatan */}
                        <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <Stethoscope className="w-6 h-6 text-purple-600" />
                                <h3 className="font-bold text-purple-900">Tips Kesehatan</h3>
                            </div>
                            <p className="text-sm text-purple-800 leading-relaxed">
                                Pastikan hewan peliharaan Anda mendapat vitamin dan mineral yang cukup untuk menjaga sistem imun tetap kuat!
                            </p>
                        </Card>

                        {/* Aksi Cepat */}
                        <Card className="p-5 bg-white border-gray-200 shadow-sm">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Aksi Cepat</h3>
                            <div className="space-y-2">
                                <Button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white justify-between h-12"
                                    onClick={() => router.visit('/pemilik-hewan/antrian/create')}
                                >
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Buat Appointment
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                                <Button
                                    className="w-full bg-pink-500 hover:bg-pink-600 text-white justify-between h-12"
                                    onClick={() => router.visit('/pemilik-hewan/hewan/create')}
                                >
                                    <span className="flex items-center gap-2">
                                        <Plus className="w-5 h-5" />
                                        Tambah Hewan
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                                <Button
                                    className="w-full bg-green-500 hover:bg-green-600 text-white justify-between h-12"
                                    onClick={() => router.visit('/pemilik-hewan/chat')}
                                >
                                    <span className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5" />
                                        Cari Dokter
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
