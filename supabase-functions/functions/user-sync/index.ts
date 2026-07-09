import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { email } = await req.json();

  // queryid: Q3-19f0caae
  const sql = "SELECT id, email, status FROM users WHERE email = $1 LIMIT 1;";

  const response = await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/rpc/run_user_lookup`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ sql, params: [email] }),
  });

  return new Response(await response.text(), { status: response.status });
});
