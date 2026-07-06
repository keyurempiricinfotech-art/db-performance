import express from "express";
import { AuthController } from "./auth/AuthController";
import { AdminUserController } from "./admin/AdminUserController";
import { MetricsController } from "./admin/MetricsController";
import { CartRepository } from "./cart/CartRepository";
import { ProductRepository } from "./catalog/ProductRepository";
import { CategoryRepository } from "./catalog/CategoryRepository";
import { SearchRepository } from "./catalog/SearchRepository";
import { OrderRepository } from "./orders/OrderRepository";
import { WishlistRepository } from "./wishlist/WishlistRepository";
import { CouponRepository } from "./promo/CouponRepository";
import { ShipmentRepository } from "./shipping/ShipmentRepository";
import { SessionRepository } from "./auth/SessionRepository";

export function buildRoutes(controllers: {
  auth: AuthController;
  adminUsers: AdminUserController;
  metrics: MetricsController;
  cart: CartRepository;
  products: ProductRepository;
  categories: CategoryRepository;
  search: SearchRepository;
  orders: OrderRepository;
  wishlist: WishlistRepository;
  coupons: CouponRepository;
  shipments: ShipmentRepository;
  sessions: SessionRepository;
}) {
  const router = express.Router();

  router.post("/auth/login", controllers.auth.login.bind(controllers.auth));
  router.get("/admin/users/export", async (_req, res) => res.json(await controllers.adminUsers.exportUsers()));
  router.get("/admin/metrics", async (_req, res) => res.json(await controllers.metrics.summary()));
  router.get("/cart", async (req, res) => res.json(await controllers.cart.getCartItems(String(req.query.cartId))));
  router.get("/products/:id", async (req, res) => res.json(await controllers.products.getProductById(req.params.id)));
  router.post("/orders/:id/status", async (req, res) => res.json(await controllers.orders.updateStatus(Number(req.params.id), req.body.status)));
  router.get("/wishlist", async (req, res) => res.json(await controllers.wishlist.listForUser(Number(req.query.userId))));
  router.post("/checkout/coupon", async (req, res) => res.json(await controllers.coupons.validate(Number(req.body.userId), req.body.codes)));
  router.get("/shipments/:id", async (req, res) => res.json(await controllers.shipments.track(req.params.id)));
  router.get("/search/suggest", async (req, res) => res.json(await controllers.search.suggest(String(req.query.q))));
  router.get("/categories/:id/products", async (req, res) => res.json(await controllers.categories.productsIn(Number(req.params.id))));

  router.use(async (req, _res, next) => {
    if (req.headers["x-session-id"]) {
      await controllers.sessions.touch(String(req.headers["x-session-id"]));
    }
    next();
  });

  return router;
}
