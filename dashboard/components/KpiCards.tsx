import { fmtPrice, type Kpis } from "@/lib/metrics";

const fmt = (x: number | null, digits = 2, suffix = "") =>
  x == null ? "—" : `${x.toFixed(digits)}${suffix}`;

export default function KpiCards({ k, total }: { k: Kpis; total: number }) {
  const items = [
    { label: "총 도서 수", value: `${k.count}권`, sub: k.count === total ? "전체" : `전체 ${total}권 중` },
    { label: "평균 가격", value: fmtPrice(k.avgPrice) },
    { label: "평균 평점", value: fmt(k.avgRating, 2, " / 5") },
    { label: "고평점 비율", value: fmt(k.highRatedPct, 1, "%"), sub: "평점 4~5점" },
    { label: "최저 가격", value: fmtPrice(k.minPrice) },
    { label: "중앙값 가격", value: fmtPrice(k.medianPrice) },
    { label: "최고 가격", value: fmtPrice(k.maxPrice) },
    { label: "가성비 지수", value: fmt(k.avgValue, 2), sub: "£10당 평점 (평균)" },
  ];
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="card">
          <div className="label">{it.label}</div>
          <div className="mt-1.5 text-xl font-semibold tabular-nums sm:text-2xl">{it.value}</div>
          {it.sub && <div className="mt-0.5 text-xs text-muted">{it.sub}</div>}
        </div>
      ))}
    </section>
  );
}
