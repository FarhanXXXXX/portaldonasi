'use client'
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import DonationChart from '@app/components/donationchart';

const Dashboard: React.FC = () => {
  // State untuk menyimpan data
  const [summaryData, setSummaryData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);

  // Fungsi untuk mengambil data dari database
  const fetchData = async () => {
    try {
      // Ambil semua transaksi donasi
      const { data: donations, error } = await supabase.from('donations').select('*');
      if (error) throw error;

      // Jika tidak ada data, kembalikan state kosong
      if (!donations || donations.length === 0) {
        return;
      }

      // Hitung total donasi
      const totalDonation = donations.reduce((total, donation) => total + parseFloat(donation.amount), 0);

      // Hitung jumlah donatur unik
      const uniqueDonors = new Set(donations.map(donation => donation.donor_name));
      const donorCount = uniqueDonors.size;

      // Hitung donasi hari ini
      const today = new Date();
      const donationsToday = donations.filter(donation =>
        new Date(donation.donation_date).toDateString() === today.toDateString()
      );
      const totalDonationToday = donationsToday.reduce((total, donation) => total + parseFloat(donation.amount), 0);

      // Update summary data TANPA "Proyek Aktif"
      setSummaryData([
        { title: 'Total Donasi', value: `Rp ${totalDonation.toLocaleString()}`, icon: '💸' },
        { title: 'Jumlah Donatur', value: donorCount.toString(), icon: '👥' },
        { title: 'Donasi Hari Ini', value: `Rp ${totalDonationToday.toLocaleString()}`, icon: '📅' },
      ]);

      // Update table data
      setTableData(
        donations.map((donation, index) => ({
          id: index + 1,
          nama: donation.donor_name,
          jumlah: `Rp ${donation.amount.toLocaleString()}`,
          tanggal: new Date(donation.donation_date).toLocaleDateString('id-ID'),
        }))
      );

      // Update chart data (contoh: grafik donasi harian)
      const dailyDonations = donations.reduce((acc, donation) => {
        const date = new Date(donation.donation_date).toLocaleDateString('id-ID');
        acc[date] = (acc[date] || 0) + parseFloat(donation.amount);
        return acc;
      }, {} as Record<string, number>);

      const labels = Object.keys(dailyDonations);
      const values = Object.values(dailyDonations);

      setChartLabels(labels);
      setChartData(values);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Memuat data saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4"
          >
            <div className="text-4xl text-blue-500">{item.icon}</div>
            <div>
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className="text-xl font-bold text-gray-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Donasi Terbaru</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 py-2">ID</th>
              <th className="text-left text-gray-600 py-2">Nama Donatur</th>
              <th className="text-left text-gray-600 py-2">Jumlah</th>
              <th className="text-left text-gray-600 py-2">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-gray-200">
                <td className="py-3">{row.id}</td>
                <td className="py-3">{row.nama}</td>
                <td className="py-3">{row.jumlah}</td>
                <td className="py-3">{row.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Grafik Donasi</h2>
        <DonationChart data={chartData} labels={chartLabels} />
      </div>
    </div>
  );
};

export default Dashboard;