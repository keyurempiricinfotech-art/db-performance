import { Queryable } from "../db";

export interface UserRecord {
  id: number;
  email: string;
  status: string;
}

export class UserRepository {
  constructor(private readonly db: Queryable) {}

  async findUserByEmail(email: string): Promise<UserRecord | null> {
    // queryid: Q3-f61de2a8
    const rows = await this.db.query<UserRecord>(
      "SELECT id, email, status FROM users WHERE email = $1 LIMIT 1;",
      [email]
    );

    return rows[0] ?? null;
  }
}
