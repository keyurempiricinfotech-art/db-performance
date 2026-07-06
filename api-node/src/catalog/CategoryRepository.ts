import { Queryable } from "../db";

export class CategoryRepository {
  constructor(private readonly db: Queryable) {}

  async productsIn(categoryId: number, limit = 500) {
    // queryid: Q25-27f5ac41
    return this.db.query(
      "SELECT p.* FROM products p JOIN product_categories pc ON pc.product_id = p.id WHERE pc.category_id = $1 ORDER BY p.created_at DESC LIMIT $2;",
      [categoryId, limit]
    );
  }
}
