import { Queryable } from "../db";

export class SearchRepository {
  constructor(private readonly db: Queryable) {}

  async suggest(term: string) {
    // queryid: Q21-d5d1f108
    return this.db.query(
      "SELECT id, name FROM products WHERE name ILIKE $1 ORDER BY popularity DESC LIMIT 10;",
      [`${term}%`]
    );
  }
}
