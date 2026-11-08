export type Book = {
  id: number;
  title: string;
  price: number;
  rating: number;
  detailUrl: string;
};

export type Filters = {
  ratings: number[]; // 빈 배열 = 전체
  minPrice: number | null;
  maxPrice: number | null;
  query: string;
};
