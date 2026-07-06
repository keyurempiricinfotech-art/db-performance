import { Queryable } from "../db";
import { UserRepository } from "../auth/UserRepository";

export class AdminUserController {
  constructor(
    private readonly db: Queryable,
    private readonly users: UserRepository
  ) {}

  async exportUsers() {
    const requestedBy = await this.users.findUserByEmail("admin@example.com");

    // queryid: Q9-5b8c0d2e
    const rows = await this.db.query(
      "SELECT * FROM users ORDER BY created_at DESC;"
    );

    return { requestedBy: requestedBy?.email, rows };
  }
}
