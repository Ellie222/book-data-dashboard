"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = { title: string; data: { label: string; count: number }[] };

const tick = { fill: "var(--muted)", fontSize: 12 };

export default function BarChartCard({ title, data }: Props) {
  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--line)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tick={tick} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={tick} />
            <Tooltip
              cursor={{ fill: "var(--line)", opacity: 0.4 }}
              formatter={(v) => [`${v}권`, "도서 수"]}
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                color: "var(--fg)",
                fontSize: 13,
              }}
              labelStyle={{ color: "var(--fg)", fontWeight: 600 }}
            />
            <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} maxBarSize={56} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
