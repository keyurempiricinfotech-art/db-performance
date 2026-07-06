export interface Queryable {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
}

export interface TransactionalQueryable extends Queryable {
  execute<T = unknown>(sql: string, params?: unknown[]): Promise<T>;
}
