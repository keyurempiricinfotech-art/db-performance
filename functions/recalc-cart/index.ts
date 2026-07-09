import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { cartId, userId } = await req.json();

  // queryid: Q6-18b4ca90
  const sql = `SELECT recalc_cart('${cartId}', '${userId}');`;

  return new Response(JSON.stringify({ sql, cartId, userId }), {
    headers: { "content-type": "application/json" },
  });
});
