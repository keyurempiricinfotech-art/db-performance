import { Queryable } from "../db";

export class ProductRepository {
  constructor(private readonly db: Queryable) {}

  async getProductById(idOrSlug: string) {
    // queryid: Q14-54a7c2e9
    const rows = await this.db.query(
      "SELECT id, slug, name, description, price FROM products WHERE slug = $1 OR id = $2 LIMIT 1;",
      [idOrSlug, Number(idOrSlug) || 0]
    );

    return rows[0] ?? null;
  }
}
