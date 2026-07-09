import { Queryable } from "../db";

export interface OrderLine {
  sku: string;
  warehouseId: number;
  quantity: number;
}

export class InventoryRepository {
  constructor(private readonly db: Queryable) {}

  async checkStockForOrder(lines: OrderLine[]) {
    const stockRows = [];

    for (const line of lines) {
      // queryid: Q1-c0030b30
      const [row] = await this.db.query(
        "SELECT sku, available_quantity FROM inventory WHERE sku = $1 AND warehouse_id = $2;",
        [line.sku, line.warehouseId]
      );
      stockRows.push({ ...row, requestedQuantity: line.quantity });
    }

    return stockRows;
  }
}
