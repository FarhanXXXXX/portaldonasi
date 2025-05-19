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
  const [proofFile, setProofFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProofFile(e.target.files[0]);
    }
  };

  const uploadProof = async (): Promise<string | null> => {
    if (!proofFile) return null;

    const fileExt = proofFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `donation-proofs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('donation-proofs') // Nama bucket Anda di Supabase
      .upload(filePath, proofFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from('donation-proofs').getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let proofUrl = null;
      if (proofFile) {
        proofUrl = await uploadProof();
      }

      const { error } = await supabase.from('donations').insert([
        {
          amount: parseFloat(formData.amount),
          donor_name: formData.donorName,
          donation_date: formData.donationDate,
          proof_url: proofUrl, // tambahkan field ini ke database
        },
      ]);

      if (error) throw error;

      setMessage('Donasi berhasil disimpan!');
      setFormData({ amount: '', donorName: '', donationDate: '' });
      setProofFile(null);
    } catch (err: any) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100"> {/* Tambahkan ini */}
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
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

          {/* Upload Bukti Transfer */}
          <div>
            <label htmlFor="proofFile" className="block text-sm font-medium text-gray-700 mb-1">
              Unggah Bukti Transfer
            </label>
            <input
              type="file"
              id="proofFile"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
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
    </div>
  );
};

export default DonationForm;