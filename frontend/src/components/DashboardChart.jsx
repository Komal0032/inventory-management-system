import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function DashboardChart({ totalProducts, lowStockProducts, totalReorders }) {

  const data = [
    {
      name: "Products",
      value: totalProducts,
    },
    {
      name: "Low Stock",
      value: lowStockProducts,
    },
    {
      name: "Reorders",
      value: totalReorders,
    },
  ];

  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <h4 className="mb-4">Inventory Overview</h4>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" fill="#0d6efd" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardChart;