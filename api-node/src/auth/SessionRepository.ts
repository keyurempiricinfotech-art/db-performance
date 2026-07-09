import { Queryable } from "../db";

export class SessionRepository {
  constructor(private readonly db: Queryable) {}

  async touch(sessionId: string) {
    // queryid: Q24-8ed340b9
    await this.db.query(
      "UPDATE sessions SET last_seen_at = now() WHERE id = $1;",
      [sessionId]
    );
  }
}
