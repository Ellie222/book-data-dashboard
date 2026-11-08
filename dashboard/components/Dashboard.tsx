"use client";

import { useMemo, useState } from "react";
import BarChartCard from "./BarChartCard";
import FiltersBar from "./Filters";
import KpiCards from "./KpiCards";
import TopList from "./TopList";
import {
  computeKpis,
  filterBooks,
  priceHistogram,
  ratingDistribution,
  topCheap,
  topExpensive,
  topValue,
} from "@/lib/metrics";
import type { Book, Filters } from "@/lib/types";

const EMPTY: Filters = { ratings: [], minPrice: null, maxPrice: null, query: "" };

export default function Dashboard({ books }: { books: Book[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const filtered = useMemo(() => filterBooks(books, filters), [books, filters]);
  const kpis = useMemo(() => computeKpis(filtered), [filtered]);

  return (
    <div className="flex flex-col gap-4">
      <FiltersBar value={filters} onChange={setFilters} onReset={() => setFilters(EMPTY)} />
      <KpiCards k={kpis} total={books.length} />
      <div className="grid gap-4 lg:grid-cols-2">
        <BarChartCard title="평점별 도서 수" data={ratingDistribution(filtered)} />
        <BarChartCard title="가격대별 도서 수 (£10 구간)" data={priceHistogram(filtered)} />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <TopList title="가장 비싼 책 TOP 10" books={topExpensive(filtered)} />
        <TopList title="가장 저렴한 책 TOP 10" books={topCheap(filtered)} />
        <TopList title="고평점(4~5★) 가성비 TOP 10" books={topValue(filtered)} showValue />
      </div>
    </div>
  );
}
