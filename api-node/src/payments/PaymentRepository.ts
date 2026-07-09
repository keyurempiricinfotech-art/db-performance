import { Queryable } from "../db";

export class PaymentRepository {
  constructor(private readonly db: Queryable) {}

  async findPaymentMethods(userId: number) {
    // queryid: Q2-c3030fe9
    return this.db.query(
      "SELECT id, user_id, token_last4, provider FROM payments WHERE user_id = $1 AND deleted_at IS NULL;",
      [userId]
    );
  }
}
