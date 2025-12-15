import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Camera, Upload, Lightbulb, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const [preview, setPreview] = useState<string | null>(null);
    
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        jenis: '',
        ras_breed: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        berat_badan: '',
        foto: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('foto', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pemilik-hewan/hewan', {
            onSuccess: () => {
                router.visit('/pemilik-hewan/hewan');
            },
        });
    };

    return (
        <AppSidebarLayout>
            <Head title="Tambah Hewan Peliharaan Baru - Pawcline" />
            
            <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.visit('/pemilik-hewan/hewan')}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                {/* Title Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Tambah Hewan Peliharaan Baru
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Lengkapi informasi hewan peliharaan Anda
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Foto Hewan */}
                            <Card className="p-6 bg-white border-gray-200 shadow-sm">
                                <Label className="text-gray-900 font-semibold mb-4 block">Foto Hewan</Label>
                                <div className="flex items-start gap-4">
                                    <div className="w-48 h-48 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg border-2 border-dashed border-pink-300 flex items-center justify-center overflow-hidden">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center">
                                                <Camera className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                                                <p className="text-sm text-gray-500">Upload Foto</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            id="foto"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label htmlFor="foto">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="border-gray-300 hover:bg-gray-50 cursor-pointer"
                                                asChild
                                            >
                                                <span>
                                                    <Upload className="w-4 h-4 mr-2" />
                                                    Upload Foto
                                                </span>
                                            </Button>
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">
                                            JPG, PNG atau GIF (Max. 5MB)
                                        </p>
                                        {errors.foto && (
                                            <p className="text-red-500 text-sm mt-1">{errors.foto}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Informasi Dasar */}
                            <Card className="p-6 bg-white border-gray-200 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Dasar</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nama" className="text-gray-900 font-semibold">
                                            Nama Hewan <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="nama"
                                            value={data.nama}
                                            onChange={(e) => setData('nama', e.target.value)}
                                            placeholder="Contoh: Max"
                                            className={`bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 ${
                                                errors.nama ? 'border-red-500' : ''
                                            }`}
                                        />
                                        {errors.nama && (
                                            <p className="text-red-500 text-sm">{errors.nama}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jenis" className="text-gray-900 font-semibold">
                                            Jenis Hewan <span className="text-red-500">*</span>
                                        </Label>
                                        <Select value={data.jenis} onValueChange={(value) => setData('jenis', value)}>
                                            <SelectTrigger className={`bg-white border-gray-200 text-gray-900 ${
                                                errors.jenis ? 'border-red-500' : ''
                                            }`}>
                                                <SelectValue placeholder="Pilih jenis hewan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Anjing">Anjing</SelectItem>
                                                <SelectItem value="Kucing">Kucing</SelectItem>
                                                <SelectItem value="Kelinci">Kelinci</SelectItem>
                                                <SelectItem value="Burung">Burung</SelectItem>
                                                <SelectItem value="Hamster">Hamster</SelectItem>
                                                <SelectItem value="Lainnya">Lainnya</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.jenis && (
                                            <p className="text-red-500 text-sm">{errors.jenis}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ras_breed" className="text-gray-900 font-semibold">
                                            Ras/Breed
                                        </Label>
                                        <Input
                                            id="ras_breed"
                                            value={data.ras_breed}
                                            onChange={(e) => setData('ras_breed', e.target.value)}
                                            placeholder="Contoh: Golden Retriever"
                                            className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jenis_kelamin" className="text-gray-900 font-semibold">
                                            Jenis Kelamin <span className="text-red-500">*</span>
                                        </Label>
                                        <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                                            <SelectTrigger className={`bg-white border-gray-200 text-gray-900 ${
                                                errors.jenis_kelamin ? 'border-red-500' : ''
                                            }`}>
                                                <SelectValue placeholder="Pilih jenis kelamin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="jantan">Jantan</SelectItem>
                                                <SelectItem value="betina">Betina</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.jenis_kelamin && (
                                            <p className="text-red-500 text-sm">{errors.jenis_kelamin}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tanggal_lahir" className="text-gray-900 font-semibold">
                                            Tanggal Lahir <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="tanggal_lahir"
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                            className={`bg-white border-gray-200 text-gray-900 ${
                                                errors.tanggal_lahir ? 'border-red-500' : ''
                                            }`}
                                        />
                                        {errors.tanggal_lahir && (
                                            <p className="text-red-500 text-sm">{errors.tanggal_lahir}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Informasi Fisik */}
                            <Card className="p-6 bg-white border-gray-200 shadow-sm">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Fisik</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="berat_badan" className="text-gray-900 font-semibold">
                                            Berat Badan (kg)
                                        </Label>
                                        <Input
                                            id="berat_badan"
                                            type="number"
                                            step="0.1"
                                            value={data.berat_badan}
                                            onChange={(e) => setData('berat_badan', e.target.value)}
                                            placeholder="Contoh: 25.5"
                                            className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="border-gray-300 hover:bg-gray-50"
                                    onClick={() => router.visit('/pemilik-hewan/hewan')}
                                    disabled={processing}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md flex-1"
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Tambah Hewan'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Tips */}
                        <Card className="p-6 bg-white border-gray-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                <h3 className="font-bold text-gray-900">Tips</h3>
                            </div>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-500 mt-1">•</span>
                                    <span>Upload foto yang jelas untuk memudahkan identifikasi</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-500 mt-1">•</span>
                                    <span>Lengkapi informasi medis untuk perawatan yang lebih baik</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-500 mt-1">•</span>
                                    <span>Catat semua alergi dan kondisi khusus</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-pink-500 mt-1">•</span>
                                    <span>Microchip membantu melacak hewan jika hilang</span>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
