import { Queryable } from "../db";

export class ProductRepository {
  constructor(private readonly db: Queryable) {}

  async searchProducts(term: string, ids: number[]) {
    // queryid: Q4-e72bd145
    return this.db.query(
      "SELECT id, name FROM products WHERE id = ANY($1) AND name ILIKE $2 ORDER BY created_at DESC LIMIT 50;",
      [ids, `%${term}%`]
    );
  }

  async getProductById(idOrSlug: string) {
    // queryid: Q14-6ac4d221
    const rows = await this.db.query(
      "SELECT id, slug, name, description, price FROM products WHERE slug = $1 OR id = $2 LIMIT 1;",
      [idOrSlug, Number(idOrSlug) || 0]
    );

    return rows[0] ?? null;
  }
}
