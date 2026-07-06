import { Queryable } from "../db";

export class ShipmentRepository {
  constructor(private readonly db: Queryable) {}

  async track(shipmentId: string) {
    // queryid: Q19-61dd8b02
    const rows = await this.db.query(
      "SELECT s.id, s.status, s.tracking_number, e.location, e.created_at FROM shipments s JOIN shipment_events e ON e.shipment_id = s.id WHERE s.id = $1 ORDER BY e.created_at DESC;",
      [shipmentId]
    );

    return rows;
  }
}
