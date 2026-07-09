import { Queryable } from "../db";

export class WishlistRepository {
  constructor(private readonly db: Queryable) {}

  async listForUser(userId: number) {
    // queryid: Q16-42bd0fe8
    return this.db.query(
      "SELECT product_id, created_at FROM wishlist_items WHERE user_id = $1 ORDER BY created_at DESC;",
      [userId]
    );
  }
}
