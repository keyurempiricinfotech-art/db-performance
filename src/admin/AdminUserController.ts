import { DbClient } from "../db";

export class AdminUserController {
  constructor(private readonly db: DbClient) {}

  async exportUsers() {
    // queryid: Q9-c0d5a471
    const sql = "SELECT * FROM users ORDER BY created_at DESC;";
    const result = await this.db.query(sql);
    return {
      filename: "users-export.csv",
      rows: result.rows,
    };
  }
}
