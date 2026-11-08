import { fmtPrice, valueScore } from "@/lib/metrics";
import type { Book } from "@/lib/types";

type Props = { title: string; books: Book[]; showValue?: boolean };

export default function TopList({ title, books, showValue }: Props) {
  return (
    <section className="card">
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      {books.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">조건에 맞는 도서가 없습니다.</p>
      ) : (
        <ol className="divide-y divide-line">
          {books.map((b, i) => (
            <li key={b.id} className="flex items-center gap-3 py-2 text-sm">
              <span className="w-5 shrink-0 text-right tabular-nums text-muted">{i + 1}</span>
              <a
                href={b.detailUrl}
                target="_blank"
                rel="noreferrer"
                title={b.title}
                className="min-w-0 flex-1 truncate hover:text-accent hover:underline"
              >
                {b.title}
              </a>
              <span className="shrink-0 text-xs text-amber-500" aria-label={`평점 ${b.rating}`}>
                {"★".repeat(b.rating)}
              </span>
              <span className="w-16 shrink-0 text-right font-medium tabular-nums">{fmtPrice(b.price)}</span>
              {showValue && (
                <span
                  className="hidden w-10 shrink-0 text-right text-xs tabular-nums text-muted sm:inline"
                  title="가성비 지수 (£10당 평점)"
                >
                  {(valueScore(b) * 10).toFixed(2)}
                </span>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
