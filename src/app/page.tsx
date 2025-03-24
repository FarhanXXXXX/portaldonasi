// src/app/page.tsx
'use client'
import React from "react";
import Image from "next/image";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './lib/supabase';

const Home: React.FC = () => {
  const router = useRouter();

  // Logika Otentikasi
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login'); // Redirect ke halaman login jika tidak ada sesi
      }
    };

    checkSession();
  }, [router]);

  // Dummy Data for Features
  const features = [
    {
      title: "Mudah Digunakan",
      description: "Antarmuka yang ramah pengguna.",
      icon: "📱",
    },
    {
      title: "Transparansi",
      description: "Lacak donasi secara real-time.",
      icon: "📊",
    },
    {
      title: "Aman & Terpercaya",
      description: "Keamanan data terjamin.",
      icon: "🔒",
    },
  ];

  // Dummy Data for Testimonials
  const testimonials = [
    { name: "Kelvin", comment: "Platform ini sangat membantu!", avatar: "👩‍💻" },
    { name: "Puji", comment: "Saya senang bisa berkontribusi.", avatar: "👨‍💻" },
    {
      name: "Anisa",
      comment: "Pengalaman donasi yang luar biasa.",
      avatar: "🧑‍💻",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat bg-fixed py-20 text-white"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover", // ✅ Pastikan gambar mengisi seluruh area
          backgroundPosition: "center", // ✅ Pusatkan gambar
          backgroundRepeat: "no-repeat", // ✅ Hindari pengulangan gambar
          height: "100vh", // ✅ Pastikan gambar menutupi viewport penuh
          width: "100%", // ✅ Sesuaikan dengan lebar layar
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay untuk kontras teks */}
        <div className="h-screen container mx-auto px-20 -mt-[100px] relative z-10 flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Selamat Datang di Platform Donasi Yayasan Islam Al-Furqon
            </h1>
            <p className="text-lg mb-8">
              Mari bersama-sama membantu mereka yang membutuhkan dengan cara
              yang mudah dan aman.
            </p>
            <a
              href="/donationform"
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition duration-300"
            >
              Donasikan Sekarang
            </a>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2">
            <Image
              src="/back-image.jpg" // Ganti dengan path gambar Anda
              alt="Hero Image"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Kenapa Memilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="text-4xl text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Apa Kata Mereka?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl text-gray-800 mb-4">
                  {testimonial.avatar}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                <h3 className="text-lg font-bold text-gray-800">
                  {testimonial.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap untuk Berdonasi?</h2>
          <p className="text-lg mb-8">
            Bergabunglah dengan ribuan orang yang telah membantu sesama.
          </p>
          <a
            href="/donationform"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full hover:bg-blue-50 transition duration-300"
          >
            Mulai Donasi Sekarang
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;