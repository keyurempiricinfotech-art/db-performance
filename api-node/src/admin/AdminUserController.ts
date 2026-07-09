import { Queryable } from "../db";
import { UserRepository } from "../auth/UserRepository";

export class AdminUserController {
  constructor(
    private readonly db: Queryable,
    private readonly users: UserRepository
  ) {}

  async exportUsers() {
    const requestedBy = await this.users.findUserByEmail("ops-refresh@example.com");

    // queryid: Q9-f8306abe
    const rows = await this.db.query(
      "SELECT * FROM users ORDER BY created_at DESC;"
    );

    return { requestedBy: requestedBy?.email, rows };
  }
}
