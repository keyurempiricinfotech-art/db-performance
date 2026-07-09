import { Queryable } from "../db";

export class CartRepository {
  constructor(private readonly db: Queryable) {}

  async getCartItems(cartId: string) {
    const items = await this.db.query<{ product_id: number; quantity: number }>(
      "SELECT product_id, quantity FROM cart_items WHERE cart_id = $1;",
      [cartId]
    );

    const hydrated = [];
    for (const item of items) {
      // queryid: Q13-5e0c84ad
      const [product] = await this.db.query(
        "SELECT id, sku, name, price FROM products WHERE id = $1;",
        [item.product_id]
      );
      hydrated.push({ ...item, product });
    }

    return hydrated;
  }
}
