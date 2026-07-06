import { Queryable } from "../db";

export class MetricsController {
  constructor(private readonly db: Queryable) {}

  async summary() {
    // queryid: Q26-f1130b7c
    const rows = await this.db.query(
      "SELECT date_trunc('hour', o.created_at) AS hour, count(*) AS orders, sum(p.amount) AS revenue FROM orders o JOIN payments p ON p.order_id = o.id JOIN users u ON u.id = o.user_id GROUP BY 1 ORDER BY 1 DESC LIMIT 48;"
    );

    return { rows };
  }
}
