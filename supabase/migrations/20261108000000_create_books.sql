-- books: books.toscrape.com 목록 1~5페이지 수집 데이터
create table if not exists public.books (
  id            bigint generated always as identity primary key,
  title         text not null,
  price         numeric(10,2) not null check (price >= 0),
  currency      char(3) not null default 'GBP',
  availability  text not null default 'In stock',
  rating        smallint not null check (rating between 1 and 5),
  detail_url    text not null unique,
  source_page   smallint,
  scraped_at    timestamptz not null default now()
);

alter table public.books enable row level security;

-- 누구나 읽기 가능 (쓰기는 service_role만)
create policy "books are publicly readable"
  on public.books for select
  to anon, authenticated
  using (true);
