import type { Book, Filters } from "./types";

export const valueScore = (b: Book) => b.rating / b.price;

export function filterBooks(books: Book[], f: Filters): Book[] {
  const q = f.query.trim().toLowerCase();
  return books.filter(
    (b) =>
      (f.ratings.length === 0 || f.ratings.includes(b.rating)) &&
      (f.minPrice == null || b.price >= f.minPrice) &&
      (f.maxPrice == null || b.price <= f.maxPrice) &&
      (q === "" || b.title.toLowerCase().includes(q)),
  );
}

export type Kpis = {
  count: number;
  avgPrice: number | null;
  avgRating: number | null;
  highRatedPct: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  medianPrice: number | null;
  avgValue: number | null; // 평균(평점 ÷ 가격) × 10 → "£10당 평점"
};

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export function computeKpis(books: Book[]): Kpis {
  const prices = books.map((b) => b.price).sort((a, b) => a - b);
  const n = prices.length;
  const median =
    n === 0 ? null : n % 2 ? prices[(n - 1) / 2] : (prices[n / 2 - 1] + prices[n / 2]) / 2;
  const v = avg(books.map(valueScore));
  return {
    count: n,
    avgPrice: avg(prices),
    avgRating: avg(books.map((b) => b.rating)),
    highRatedPct: n ? (books.filter((b) => b.rating >= 4).length / n) * 100 : null,
    minPrice: n ? prices[0] : null,
    maxPrice: n ? prices[n - 1] : null,
    medianPrice: median,
    avgValue: v == null ? null : v * 10,
  };
}

export function ratingDistribution(books: Book[]) {
  return [1, 2, 3, 4, 5].map((r) => ({
    label: `${r}점`,
    count: books.filter((b) => b.rating === r).length,
  }));
}

export function priceHistogram(books: Book[], binSize = 10, start = 10, end = 60) {
  const bins: { label: string; count: number }[] = [];
  for (let lo = start; lo < end; lo += binSize) {
    const hi = lo + binSize;
    bins.push({
      label: `£${lo}–${hi}`,
      count: books.filter((b) => b.price >= lo && (b.price < hi || (hi >= end && b.price <= hi))).length,
    });
  }
  return bins;
}

export const topExpensive = (books: Book[], n = 10) =>
  [...books].sort((a, b) => b.price - a.price).slice(0, n);

export const topCheap = (books: Book[], n = 10) =>
  [...books].sort((a, b) => a.price - b.price).slice(0, n);

export const topValue = (books: Book[], n = 10) =>
  books
    .filter((b) => b.rating >= 4)
    .sort((a, b) => valueScore(b) - valueScore(a))
    .slice(0, n);

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });
export const fmtPrice = (x: number | null) => (x == null ? "—" : gbp.format(x));
