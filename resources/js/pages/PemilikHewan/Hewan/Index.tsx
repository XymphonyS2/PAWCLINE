import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart, Calendar, CheckCircle2, AlertTriangle, Search, Filter } from 'lucide-react';

interface Hewan {
    id: number;
    nama: string;
    jenis: string;
    ras_breed: string | null;
    jenis_kelamin: string;
    tanggal_lahir: string;
    umur: number;
    umur_text: string;
    berat_badan: number | null;
    foto: string | null;
    status: string;
    vaksin_berikutnya: string | null;
    checkup_terdekat: string | null;
}

export default function Index({ 
    totalHewan, 
    hewanSehat, 
    perluCheckup, 
    hewan 
}: { 
    totalHewan: number;
    hewanSehat: number;
    perluCheckup: number;
    hewan: Hewan[];
}) {
    return (
        <AppSidebarLayout>
            <Head title="Hewan Peliharaan Saya - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Title Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Hewan Peliharaan Saya
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Kelola dan pantau kesehatan semua hewan kesayangan Anda
                    </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari nama hewan..."
                                className="pl-10 h-10 bg-white border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                    <Button variant="outline" className="border-gray-300">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Link href="/pemilik-hewan/hewan/create">
                        <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Hewan Baru
                        </Button>
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-5 bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-pink-100 mb-1">Total Hewan</p>
                                <p className="text-3xl font-bold">{totalHewan}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-green-100 mb-1">Sehat</p>
                                <p className="text-3xl font-bold">{hewanSehat}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-orange-100 mb-1">Perlu Checkup</p>
                                <p className="text-3xl font-bold">{perluCheckup}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Pet Cards */}
                {hewan.length === 0 ? (
                    <Card className="p-12 text-center bg-white border-gray-200">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada hewan</h3>
                        <p className="text-gray-600 mb-4">Tambahkan hewan peliharaan pertama Anda</p>
                        <Link href="/pemilik-hewan/hewan/create">
                            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Tambah Hewan
                            </Button>
                        </Link>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hewan.map((item) => (
                            <Card key={item.id} className="overflow-hidden p-0 bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                                <div className="relative">
                                    {item.foto ? (
                                        <img
                                            src={`/storage/${item.foto}`}
                                            alt={item.nama}
                                            className="w-full h-64 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                            <Heart className="w-20 h-20 text-pink-300" />
                                        </div>
                                    )}
                                    
                                    {/* Label jenis/ras di kiri atas */}
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-white/90 text-gray-900 font-medium">
                                            {item.ras_breed || item.jenis}
                                        </Badge>
                                    </div>
                                    
                                    {/* Status badge di kanan atas */}
                                    <div className="absolute top-3 right-3">
                                        <Badge 
                                            className={
                                                item.status === 'Sehat' 
                                                    ? 'bg-green-500 text-white' 
                                                    : 'bg-orange-500 text-white'
                                            }
                                        >
                                            {item.status === 'Sehat' ? '✓ Sehat' : 'A Checkup'}
                                        </Badge>
                                    </div>
                                    
                                </div>
                                
                                <div className="p-5">
                                    <h3 className="font-bold text-xl text-gray-900 mb-3">{item.nama}</h3>
                                    
                                    {/* Basic Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="font-medium">{item.umur_text}</span>
                                            <span>•</span>
                                            <span>{item.jenis_kelamin === 'jantan' ? 'Jantan' : 'Betina'}</span>
                                        </div>
                                        
                                        {/* Details */}
                                        <div className="space-y-1 text-sm text-gray-600">
                                            {item.berat_badan && (
                                                <p>Berat {item.berat_badan} kg</p>
                                            )}
                                            <p>Gender {item.jenis_kelamin === 'jantan' ? 'Jantan' : 'Betina'}</p>
                                        </div>
                                        
                                              {/* Upcoming Dates */}
                                              {(item.vaksin_berikutnya || item.checkup_terdekat) && (
                                                  <div className="space-y-1 text-sm text-gray-600 pt-2 border-t border-gray-200">
                                                      {item.vaksin_berikutnya && (
                                                          <p>Vaksin: {item.vaksin_berikutnya}</p>
                                                      )}
                                                      {item.checkup_terdekat && (
                                                          <p>Checkup: {item.checkup_terdekat}</p>
                                                      )}
                                                  </div>
                                              )}
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                                            onClick={() => router.visit(`/pemilik-hewan/hewan/${item.id}`)}
                                        >
                                            Lihat Detail
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="border-gray-300"
                                            onClick={() => router.visit(`/pemilik-hewan/antrian/create?hewan_id=${item.id}`)}
                                        >
                                            <Calendar className="w-4 h-4" />
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
