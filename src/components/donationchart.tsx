'use client';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// ✅ Daftarkan komponen Chart.js yang digunakan
ChartJS.register(
  CategoryScale, // Ini yang memperbaiki error
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Props untuk data grafik
interface DonationChartProps {
  data: number[];
  labels: string[];
}

const DonationChart: React.FC<DonationChartProps> = ({ data, labels }) => {
  // Data konfigurasi untuk grafik
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Jumlah Donasi (Rp)',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opsi grafik
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Grafik Donasi Mingguan',
      },
    },
    scales: {
      x: {
        type: 'category', // ✅ Mendaftarkan category scale
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
};

export default DonationChart;