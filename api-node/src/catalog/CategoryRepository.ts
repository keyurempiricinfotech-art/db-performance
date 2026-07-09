import { Queryable } from "../db";

export class CategoryRepository {
  constructor(private readonly db: Queryable) {}

  async getTree() {
    // queryid: Q10-7e31b8aa
    return this.db.query("WITH RECURSIVE category_tree AS (...) SELECT * FROM category_tree;");
  }

  async productsIn(categoryId: number, limit = 500) {
    // queryid: Q25-df6b8a13
    return this.db.query(
      "SELECT p.* FROM products p JOIN product_categories pc ON pc.product_id = p.id WHERE pc.category_id = $1 ORDER BY p.created_at DESC LIMIT $2;",
      [categoryId, limit]
    );
  }
}
