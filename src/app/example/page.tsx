'use client';
import React from 'react';
import DonationChart from '@app/components/donationchart';

const Dashboard: React.FC = () => {
  const summaryData = [
    { title: 'Total Donasi', value: 'Rp 50.000.000', icon: '💸' },
    { title: 'Jumlah Donatur', value: '1.200', icon: '👥' },
    { title: 'Proyek Aktif', value: '15', icon: '📊' },
    { title: 'Donasi Hari Ini', value: 'Rp 2.500.000', icon: '📅' },
  ];

  const tableData = [
    { id: 1, nama: 'Donatur A', jumlah: 'Rp 1.000.000', tanggal: '2023-10-01' },
    { id: 2, nama: 'Donatur B', jumlah: 'Rp 500.000', tanggal: '2023-10-02' },
    { id: 3, nama: 'Donatur C', jumlah: 'Rp 750.000', tanggal: '2023-10-03' },
  ];

  const chartData = [10000, 20000, 15000, 30000, 25000];
  const chartLabels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
