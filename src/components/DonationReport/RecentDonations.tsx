interface Donation {
    id: number;
    name: string;
    amount: number;
    date: string;
  }
  
  const donations: Donation[] = [
    { id: 1, name: "Budi Santoso", amount: 500000, date: "2023-07-20" },
    { id: 2, name: "Anisa Rahma", amount: 1200000, date: "2023-07-19" },
    // ... data lainnya
  ];
  
  export default function RecentDonations() {
    return (
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Donasi Terbaru</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">No</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Nominal</th>
              <th className="p-3 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation.id} className="border-b">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{donation.name}</td>
                <td className="p-3 text-green-600">
                  Rp{donation.amount.toLocaleString()}
                </td>
                <td className="p-3">{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }