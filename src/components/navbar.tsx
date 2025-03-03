import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="text-lg font-bold">
          <Link href="/">
            <span className="cursor-pointer">Yayasan Islam Al-Furqon</span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex space-x-6">
          <Link href="/example">
            <span className="hover:text-gray-300 cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/donasikan">
            <span className="hover:text-gray-300 cursor-pointer">Donasikan</span>
          </Link>
          <Link href="/laporan-donasi">
            <span className="hover:text-gray-300 cursor-pointer">Laporan Donasi</span>
          </Link>
          <Link href="/kami">
            <span className="hover:text-gray-300 cursor-pointer">Tentang Kami</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;