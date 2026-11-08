"use client";

import type { Filters } from "@/lib/types";

type Props = {
  value: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
};

const parsePrice = (s: string) => (s.trim() === "" || Number.isNaN(Number(s)) ? null : Number(s));

export default function FiltersBar({ value, onChange, onReset }: Props) {
  const toggleRating = (r: number) =>
    onChange({
      ...value,
      ratings: value.ratings.includes(r)
        ? value.ratings.filter((x) => x !== r)
        : [...value.ratings, r].sort((a, b) => a - b),
    });

  return (
    <section className="card flex flex-col gap-4 lg:flex-row lg:items-end">
      <label className="flex flex-1 flex-col gap-1.5">
        <span className="label">제목 검색</span>
        <input
          type="search"
          placeholder="예: light, love…"
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          className="input"
        />
      </label>

      <div className="flex flex-col gap-1.5">
        <span className="label">평점 (선택 안 하면 전체)</span>
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5].map((r) => {
            const on = value.ratings.includes(r);
            return (
              <button
                key={r}
                type="button"
                aria-pressed={on}
                onClick={() => toggleRating(r)}
                className={`h-9 min-w-11 rounded-lg border px-2.5 text-sm font-medium transition-colors ${
                  on
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-surface text-muted hover:border-accent hover:text-fg"
                }`}
              >
                {r}★
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="label">가격 범위 (£)</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="최소"
            aria-label="최소 가격"
            value={value.minPrice ?? ""}
            onChange={(e) => onChange({ ...value, minPrice: parsePrice(e.target.value) })}
            className="input w-24"
          />
          <span className="text-muted">–</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="최대"
            aria-label="최대 가격"
            value={value.maxPrice ?? ""}
            onChange={(e) => onChange({ ...value, maxPrice: parsePrice(e.target.value) })}
            className="input w-24"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="h-9 rounded-lg border border-line px-3 text-sm text-muted hover:text-fg"
      >
        초기화
      </button>
    </section>
  );
}
