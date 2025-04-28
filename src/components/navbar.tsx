// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Daftar halaman yang tidak menampilkan navbar
  const hiddenPaths = ['/login', '/register'];

  // Sembunyikan navbar jika rute cocok dengan daftar hiddenPaths
  if (hiddenPaths.includes(pathname)) {
    return null;
  }

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
        <div className="flex space-x-6 items-center">
          <Link href="/example">
            <span className="hover:text-gray-300 cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/donationform">
            <span className="hover:text-gray-300 cursor-pointer">Donasikan</span>
          </Link>
          <Link href="/DonationList">
            <span className="hover:text-gray-300 cursor-pointer">Laporan Donasi</span>
          </Link>
          <Link href="/kami">
            <span className="hover:text-gray-300 cursor-pointer">Tentang Kami</span>
          </Link>

          {/* Conditional Rendering for Logout */}
          {user && (
            <button
              onClick={logout} // Memanggil fungsi logout dari AuthContext
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md cursor-pointer transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;