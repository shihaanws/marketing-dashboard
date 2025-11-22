import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Row } from "../features/data/dataSlice";

export default function PerformanceChart({ data }: { data: Row[] }) {
  return (
    <div style={{ margin: "30px 0" }}>
      <h3>Performance Insights</h3>
      <LineChart width={800} height={300} data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="spend" stroke="blue" />
        <Line type="monotone" dataKey="clicks" stroke="green" />
      </LineChart>
    </div>
  );
}
