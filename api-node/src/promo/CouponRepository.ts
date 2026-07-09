import { Queryable } from "../db";

export class CouponRepository {
  constructor(private readonly db: Queryable) {}

  async validate(userId: number, codes: string[]) {
    // queryid: Q17-4bca5c05
    return this.db.query(
      "SELECT id, code, discount_pct FROM coupons WHERE active = true AND code = ANY($1) AND (user_id IS NULL OR user_id = $2);",
      [codes, userId]
    );
  }
}
