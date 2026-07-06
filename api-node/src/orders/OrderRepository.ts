import { Queryable } from "../db";

export class OrderRepository {
  constructor(private readonly db: Queryable) {}

  async updateStatus(orderId: number, status: string) {
    // queryid: Q15-c6b7d118
    const rows = await this.db.query(
      "UPDATE orders SET status = $1, updated_at = now() WHERE id = $2 RETURNING id, status;",
      [status, orderId]
    );

    return rows[0];
  }
}
