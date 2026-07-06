# DB Performance Trace Seed

This repository contains compact mock source code for tracing slow PostgreSQL queries back to the code that fires them.

The service folders keep the original workflow service names and paths where possible:

- api-node: TypeScript API with controllers, services, repositories, routes, and a small GraphQL entry.
- workers-python: Python workers for the revenue report and inventory sync jobs.
- supabase-functions: Supabase edge function plus the recalc_cart SQL RPC.
- web-storefront: Next.js screens that call checkout, auth, search, cart, and order endpoints.
- admin-panel: React admin screens for revenue and user export workflows.

## Trace catalog

Q1-Q10 are represented by real code paths and SQL statements. Q11 Session Cleanup and Q12 Ad-hoc Analytics are deliberately absent from source code so the workflow can exercise the Not Traceable path.

## Database

The schema in migrations/schema.sql deliberately omits the indexes that would fix the slow queries, including payments(user_id), users(lower(email)), trigram product search indexes, and supporting reporting partitions.
