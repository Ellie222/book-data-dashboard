import Dashboard from "@/components/Dashboard";
import { getBooks } from "@/lib/supabase";

export default async function Page() {
  const books = await getBooks();
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Book Store 대시보드</h1>
        <p className="mt-1 text-sm text-muted">
          Supabase book-store · books 테이블 {books.length}권 분석
        </p>
      </header>
      <Dashboard books={books} />
    </main>
  );
}
