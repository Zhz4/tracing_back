export interface PaginationType {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TableData<T> {
  records: T[];
  pagination: PaginationType;
}
