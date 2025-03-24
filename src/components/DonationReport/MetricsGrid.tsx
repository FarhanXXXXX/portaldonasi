const metrics = [
    {
      title: "Total Donasi",
      value: "Rp 150.000.000",
      icon: "💰",
      bgColor: "bg-green-100",
    },
    {
      title: "Donatur",
      value: "1.200",
      icon: "👥",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Rata-rata Donasi",
      value: "Rp 125.000",
      icon: "📊",
      bgColor: "bg-purple-100",
    },
  ];
  
  export default function MetricsGrid() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow ${metric.bgColor}`}
          >
            <div className="text-2xl mb-2">{metric.icon}</div>
            <h3 className="text-lg font-semibold mb-1">{metric.title}</h3>
            <p className="text-2xl text-blue-700">{metric.value}</p>
          </div>
        ))}
      </div>
    );
  }