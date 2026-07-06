import { Queryable } from "../db";

export class AuditRepository {
  constructor(private readonly db: Queryable) {}

  async write(events: Array<{ actorId: number; action: string; entityId: string }>) {
    const values = events.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3}, now())`).join(", ");
    const params = events.flatMap((event) => [event.actorId, event.action, event.entityId]);

    // queryid: Q23-9ea40731
    return this.db.query(
      `INSERT INTO audit_log(actor_id, action, entity_id, created_at) VALUES ${values} RETURNING id;`,
      params
    );
  }
}
