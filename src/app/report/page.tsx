import ReportHeader from "@app/components/DonationReport/ReportHeader";
import MetricsGrid from "@app/components/DonationReport/MetricsGrid";
import RecentDonations from "@app/components/DonationReport/RecentDonations";

export default function DonationReportPage() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Laporan Donasi
      </h1>
      

      <ReportHeader />
      <MetricsGrid />

      <RecentDonations />
    </div>
  );
}