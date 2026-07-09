import { Queryable } from "../../db";

export function buildInventoryResolvers(db: Queryable) {
  return {
    Query: {
      async availability(_: unknown, args: { variantIds: number[] }) {
        const results = [];
        for (const variantId of args.variantIds) {
          // queryid: Q18-229be6c4
          const [row] = await db.query(
            "SELECT variant_id, available_quantity FROM inventory WHERE variant_id = $1;",
            [variantId]
          );
          results.push(row);
        }
        return results;
      },
    },
  };
}
