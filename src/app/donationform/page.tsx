'use client'
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const DonationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    donationDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('donations').insert([
        {
          amount: parseFloat(formData.amount),
          donor_name: formData.donorName,
          donation_date: formData.donationDate,
        },
      ]);

      if (error) throw error;

      setMessage('Donasi berhasil disimpan!');
      setFormData({ amount: '', donorName: '', donationDate: '' });
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Judul */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Form Transaksi Donasi</h2>

      {/* Pesan Status */}
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes('berhasil') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Jumlah Donasi */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Jumlah Donasi
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              Rp
            </span>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan jumlah donasi"
              required
            />
          </div>
        </div>

        {/* Input Nama Donatur */}
        <div>
          <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Donatur
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              👤
            </span>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan nama donatur"
              required
            />
          </div>
        </div>

        {/* Input Tanggal Donasi */}
        <div>
          <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Donasi
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              📅
            </span>
            <input
              type="date"
              id="donationDate"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              className="w-full px-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>
    </div>
  );
};

export default DonationForm;