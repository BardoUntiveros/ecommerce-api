export interface PaginationResult<T> {
  page: number;
  totalCount: number;
  data: T[];
}
