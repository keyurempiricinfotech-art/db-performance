import { KnexLike } from "../db";

export class ProductRepository {
  constructor(private readonly knex: KnexLike) {}

  async searchProducts(term: string) {
    const escaped = term.replace(/'/g, "''");

    // queryid: Q4-63d9c0e8
    const sql = `SELECT id, name, description, price FROM products WHERE name ILIKE '%${escaped}%' OR description ILIKE '%${escaped}%' ORDER BY updated_at DESC;`;

    const result = await this.knex.raw(sql);
    return result.rows;
  }
}
