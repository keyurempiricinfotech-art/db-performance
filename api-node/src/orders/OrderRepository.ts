import { Queryable } from "../db";

export class OrderRepository {
  constructor(private readonly db: Queryable) {}

  async listOrdersForUser(userId: number) {
    // queryid: Q5-54e3a9c0
    return this.db.query(
      "SELECT o.*, oi.* FROM orders o JOIN order_items oi ON oi.order_id = o.id WHERE o.user_id = $1 ORDER BY o.created_at DESC;",
      [userId]
    );
  }

  async updateStatus(orderId: number, status: string) {
    // queryid: Q15-e68a3f90
    const rows = await this.db.query(
      "UPDATE orders SET status = $1, updated_at = now() WHERE id = $2 RETURNING id, status;",
      [status, orderId]
    );

    return rows[0];
  }
}
