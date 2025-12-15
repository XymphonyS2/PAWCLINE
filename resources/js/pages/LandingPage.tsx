import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function LandingPage({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Pawcline - Platform Klinik Hewan Terpercaya">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=inter:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="container mx-auto px-4 py-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {/* Logo sama dengan sidebar */}
                            <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                🐾 Pawcline
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href="/redirect"
                                    className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="px-6 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center max-w-7xl mx-auto">
                        {/* Left Column - Text Content */}
                        <div>
                            <p className="text-pink-500 text-sm font-medium mb-2">Platform Klinik Hewan Terpercaya</p>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Kesehatan Sahabat{' '}
                                <span className="text-pink-500">Berbulu Anda</span> Adalah Prioritas
                            </h1>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Rawat hewan kesayangan Anda dengan layanan veteriner profesional. Booking konsultasi, pantau kesehatan, dan dapatkan perawatan terbaik untuk teman berbulu Anda.
                            </p>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <Link
                                    href={canRegister ? register() : login()}
                                    className="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold flex items-center gap-2"
                                >
                                    Mulai Sekarang
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#fitur"
                                    className="px-8 py-3 bg-white text-pink-500 border-2 border-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-semibold"
                                >
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>
                            {/* Statistics */}
                            <div className="flex flex-wrap gap-8">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">5000+</div>
                                    <div className="text-sm text-gray-600">Hewan Terawat</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">200+</div>
                                    <div className="text-sm text-gray-600">Dokter Hewan</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900">4.9</div>
                                    <div className="text-sm text-gray-600">Rating</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="relative w-full">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl w-full">
                                <div className="aspect-[3/4] bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden w-full">
                                    <img 
                                        src="/images/KAKAKTUA.jpg" 
                                        alt="Happy Pet" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="fitur" className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <p className="text-pink-500 text-sm font-medium mb-2">Fitur Unggulan</p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Kenapa Memilih Pawcline?
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Platform all-in-one untuk kebutuhan kesehatan hewan kesayangan Anda
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Feature Card 1 */}
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Mudah</h3>
                                <p className="text-gray-600">
                                    Jadwalkan konsultasi dengan dokter hewan favorit Anda hanya dalam beberapa klik
                                </p>
                            </div>

                            {/* Feature Card 2 */}
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dokter Profesional</h3>
                                <p className="text-gray-600">
                                    Tim dokter hewan berpengalaman dan bersertifikat siap membantu Anda
                                </p>
                            </div>

                            {/* Feature Card 3 */}
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rekam Medis Digital</h3>
                                <p className="text-gray-600">
                                    Akses riwayat kesehatan hewan peliharaan Anda kapan saja, dimana saja
                                </p>
                            </div>

                            {/* Feature Card 4 */}
                            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Perawatan Terbaik</h3>
                                <p className="text-gray-600">
                                    Dapatkan tips perawatan dan reminder untuk vaksinasi rutin
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <p className="text-pink-500 text-sm font-medium mb-2">Cara Kerja</p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                3 Langkah Mudah Merawat Hewan Anda
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-5xl font-bold text-pink-500 mb-4">01</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Daftar & Buat Profil</h3>
                                <p className="text-gray-600">
                                    Buat akun dan tambahkan informasi hewan kesayangan Anda
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-5xl font-bold text-pink-500 mb-4">02</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pilih Layanan</h3>
                                <p className="text-gray-600">
                                    Pilih dokter dan jadwal konsultasi yang sesuai dengan kebutuhan Anda
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-5xl font-bold text-pink-500 mb-4">03</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Dapatkan Perawatan</h3>
                                <p className="text-gray-600">
                                    Kunjungi klinik atau konsultasi online dan dapatkan perawatan terbaik
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <p className="text-pink-500 text-sm font-medium mb-2">Testimoni</p>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                Dipercaya Ribuan Pemilik Hewan
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Testimonial 1 */}
                            <div className="bg-pink-50 p-6 rounded-xl">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">
                                    "Pawcline sangat memudahkan saya dalam menjadwalkan vaksinasi untuk kucing saya. Dokternya ramah dan profesional!"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                                        <span className="text-pink-600 font-semibold">SW</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Sarah Wijaya</p>
                                        <p className="text-sm text-gray-600">Pemilik Anjing</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="bg-pink-50 p-6 rounded-xl">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">
                                    "Sistem rekam medis digitalnya luar biasa! Saya bisa melacak semua riwayat kesehatan anjing saya dengan mudah."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                                        <span className="text-pink-600 font-semibold">M</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Maxwell</p>
                                        <p className="text-sm text-gray-600">Pemilik Kucing</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="bg-pink-50 p-6 rounded-xl">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">
                                    "Layanan darurat 24/7 sangat membantu! Ketika kelinci saya sakit tengah malam, saya langsung bisa konsultasi."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
                                        <span className="text-pink-600 font-semibold">DP</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Diana Putri</p>
                                        <p className="text-sm text-gray-600">Pemilik Kucing</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-12 text-center text-white">
                            <div className="flex justify-center mb-6">
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                                Siap Memberikan Yang Terbaik?
                            </h2>
                            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                                Bergabunglah dengan ribuan pemilik hewan yang sudah mempercayai Pawcline untuk kesehatan sahabat berbulu mereka
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <Link
                                    href={canRegister ? register() : login()}
                                    className="px-8 py-3 bg-white text-pink-500 border-2 border-white rounded-lg hover:bg-pink-50 transition-colors font-semibold flex items-center gap-2"
                                >
                                    Mulai Perjalanan Anda
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Gratis Pendaftaran</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Tanpa Biaya Tersembunyi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Support 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            {/* Pawcline Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                        🐾 Pawcline
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    Platform terpercaya untuk kesehatan dan perawatan hewan kesayangan Anda.
                                </p>
                                <p className="text-gray-500 text-sm">© 2024 Pawcline. All rights reserved.</p>
                            </div>

                            {/* Layanan */}
                            <div>
                                <h3 className="font-semibold mb-4">Layanan</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Konsultasi Online</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Booking Klinik</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Vaksinasi</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Grooming</a></li>
                                </ul>
                            </div>

                            {/* Perusahaan */}
                            <div>
                                <h3 className="font-semibold mb-4">Perusahaan</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                                </ul>
                            </div>

                            {/* Dukungan */}
                            <div>
                                <h3 className="font-semibold mb-4">Dukungan</h3>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-800">
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
