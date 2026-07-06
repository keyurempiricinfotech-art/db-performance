import { Queryable } from "../db";

export class SessionRepository {
  constructor(private readonly db: Queryable) {}

  async touch(sessionId: string) {
    // queryid: Q24-cb6d991a
    await this.db.query(
      "UPDATE sessions SET last_seen_at = now() WHERE id = $1;",
      [sessionId]
    );
  }
}
