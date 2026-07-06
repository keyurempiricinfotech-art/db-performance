import { Queryable } from "../db";

export class CouponRepository {
  constructor(private readonly db: Queryable) {}

  async validate(userId: number, codes: string[]) {
    // queryid: Q17-74c2a9d5
    return this.db.query(
      "SELECT id, code, discount_pct FROM coupons WHERE active = true AND code = ANY($1) AND (user_id IS NULL OR user_id = $2);",
      [codes, userId]
    );
  }
}
