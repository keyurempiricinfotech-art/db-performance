import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { cartId } = await req.json();

  // queryid: Q6-c7031635
  const sql = "SELECT * FROM recalc_cart($1);";

  const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/rpc/recalc_cart`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ cart_id: cartId, sql }),
  });

  return new Response(await response.text(), { status: response.status });
});
