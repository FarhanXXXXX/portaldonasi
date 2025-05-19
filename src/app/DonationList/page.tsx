'use client'
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';

const DonationList: React.FC = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const printRef = useRef<HTMLDivElement>(null); // Ref untuk konten yang akan diprint

  useEffect(() => {
    const fetchDonations = async () => {
      const { data, error } = await supabase.from('donations').select('*');
      if (error) console.error(error);
      else setDonations(data || []);
    };
    fetchDonations();
  }, []);

  // Fungsi untuk memicu print
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Daftar Transaksi Donasi</h2>

      {/* Tombol Print */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Cetak Laporan
        </button>
      </div>

      {/* Konten yang akan dicetak */}
      <div ref={printRef} className="print-section">
        {donations.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada transaksi donasi.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="p-5 bg-white rounded-lg shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{donation.donor_name}</p>
                    <p className="text-sm text-gray-600">
                      Rp {donation.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(donation.donation_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  {donation.proof_url && (
                    <div className="mt-2 md:mt-0 max-w-xs">
                      <p className="text-xs text-gray-600 mb-1">Bukti Transfer</p>
                      <img
                        src={donation.proof_url}
                        alt="Bukti transfer"
                        className="w-full h-auto rounded border border-gray-200 max-w-[200px]" // Batas maksimal lebar gambar
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationList;