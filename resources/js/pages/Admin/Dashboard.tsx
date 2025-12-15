import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Clock, FileCheck, Shield, Stethoscope, Users } from 'lucide-react';

export default function Dashboard({
    totalPemilikHewan,
    totalDokter,
    verifikasiPending,
    antrianHariIni,
}: {
    totalPemilikHewan: number;
    totalDokter: number;
    verifikasiPending: number;
    antrianHariIni: number;
}) {
    return (
        <AppSidebarLayout>
            <Head title="Dashboard Admin" />
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
                    <p className="text-gray-600 text-lg">Kelola sistem dan pengguna Pawcline</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Pemilik Hewan</p>
                                <p className="text-3xl font-bold text-gray-900">{totalPemilikHewan}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Stethoscope className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Dokter</p>
                                <p className="text-3xl font-bold text-gray-900">{totalDokter}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <FileCheck className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Verifikasi Pending</p>
                                <p className="text-3xl font-bold text-gray-900">{verifikasiPending}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-5 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-pink-100 rounded-xl">
                                <Calendar className="w-6 h-6 text-pink-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Antrian Hari Ini</p>
                                <p className="text-3xl font-bold text-gray-900">{antrianHariIni}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">Manajemen Akun</h3>
                        </div>
                        <div className="space-y-2">
                            <Link href="/admin/user?role=admin">
                                <Button variant="outline" className="w-full justify-between border-gray-300 hover:bg-gray-50">
                                    <span className="flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Kelola Admin
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/admin/user?role=dokter">
                                <Button variant="outline" className="w-full justify-between border-gray-300 hover:bg-gray-50">
                                    <span className="flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4" />
                                        Kelola Dokter
                                    </span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
                                <FileCheck className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">Verifikasi</h3>
                        </div>
                        <Link href="/admin/verifikasi">
                            <Button variant="outline" className="w-full justify-between border-gray-300 hover:bg-gray-50">
                                <span>Verifikasi Akun Pemilik Hewan</span>
                                <div className="flex items-center gap-2">
                                    {verifikasiPending > 0 && (
                                        <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">
                                            {verifikasiPending}
                                        </Badge>
                                    )}
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Button>
                        </Link>
                    </Card>

                    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">Antrian</h3>
                        </div>
                        <div className="space-y-2">
                            <Link href="/admin/antrian">
                                <Button variant="outline" className="w-full justify-between border-gray-300 hover:bg-gray-50">
                                    <span>Daftar Antrian Hari Ini</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/admin/antrian/riwayat">
                                <Button variant="outline" className="w-full justify-between border-gray-300 hover:bg-gray-50">
                                    <span>Riwayat Antrian</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
                                <Calendar className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">Jadwal Dokter</h3>
                        </div>
                        <Link href="/admin/jadwal-dokter">
                            <Button variant="outline" className="w-full justify-between border-gray-300 hover:bg-gray-50">
                                <span>Kelola Jadwal Dokter</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        </AppSidebarLayout>
    );
}


