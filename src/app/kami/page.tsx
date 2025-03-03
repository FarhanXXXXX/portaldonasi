import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Tentang Kami !
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Yayasan Islam Al-Furqon berdedikasi untuk membantu mereka yang membutuhkan.
        </p>
      </header>

      {/* Section 1: Visi & Misi */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Visi Kami</h2>
            <p className="text-gray-700">
              Menjadi platform donasi terpercaya yang menghubungkan hati dengan kebaikan, menciptakan dunia yang lebih adil dan penuh kasih.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Misi Kami</h2>
            <p className="text-gray-700">
              Memberikan solusi donasi yang transparan, efisien, dan mudah diakses oleh semua kalangan untuk mendukung berbagai program sosial.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Tim Kami */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Tim Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Anggota Tim 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="/photo2.jpg"
              alt="Foto Anggota Tim"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Andre</h3>
            <p className="text-gray-600">Ketua Yayasan</p>
          </div>
          {/* Anggota Tim 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="/photo3.jpg"
              alt="Foto Anggota Tim"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Joko</h3>
            <p className="text-gray-600">Wakil Ketua Yayasan</p>
          </div>
          {/* Anggota Tim 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img
              src="/photo4.jpg"
              alt="Foto Anggota Tim"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">Tsania</h3>
            <p className="text-gray-600">Admin HR</p>
          </div>
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Bergabunglah dengan Kami!
        </h2>
        <p className="text-gray-600 mb-8">
          Mari bersama-sama membuat perubahan positif di dunia. Donasi sekarang dan jadilah bagian dari kebaikan.
        </p>
        <a
          href="/donate"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Donasi Sekarang
        </a>
      </section>
    </div>
  );
};

export default AboutPage;