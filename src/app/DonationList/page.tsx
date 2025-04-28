'use client'
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DonationList: React.FC = () => {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const { data, error } = await supabase.from('donations').select('*');
      if (error) console.error(error);
      else setDonations(data || []);
    };
    fetchDonations();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Daftar Transaksi Donasi</h2>

      {/* Jika tidak ada donasi */}
      {donations.length === 0 && (
        <p className="text-center text-gray-500">Belum ada transaksi donasi.</p>
      )}

      {/* Daftar donasi */}
      <ul className="space-y-4">
        {donations.map((donation) => (
          <li
            key={donation.id}
            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <div className="flex items-center justify-between">
              {/* Informasi Donatur */}
              <div>
                <p className="text-lg font-semibold text-gray-800">{donation.donor_name}</p>
                <p className="text-sm text-gray-600">
                  Rp {donation.amount.toLocaleString()}
                </p>
              </div>

              {/* Tanggal Donasi */}
              <div className="text-right">
                <p className="text-xs text-gray-500">
                  {new Date(donation.donation_date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonationList;