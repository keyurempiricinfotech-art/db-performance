# DB Performance Trace Seed

This repository contains fresh WF seed source code for tracing slow PostgreSQL queries back to the code that fires them.

Current seed generation: WF rerun seed refreshed on 2026-07-09.

The service folders keep the workflow service names and paths:

- api-node: TypeScript API with controllers, repositories, routes, and GraphQL resolvers.
- workers-python: Python workers for revenue, inventory, notification, finance, and digest jobs.
- supabase-functions: Supabase edge functions plus SQL/RPC-style call sites.
- web-storefront: Next.js screens that call checkout, auth, search, cart, and order endpoints.
- admin-panel: React admin screens for revenue, metrics, and user export workflows.

## Trace catalog

Q1-Q26 are represented by real code paths and SQL statements. Q11 Session Cleanup, Q12 Ad-hoc Analytics, Q27 Legacy Report, and Q28 Manual Backfill deliberately have no matching source code when marked untraceable by the seed sheets.

## Ranking and ownership tests

The Drive seed sheets include 28 distinct fingerprints, folded query variants, N+1 trace proof rows, impact-unknown background jobs, and fresh previous-run tracker rows. The root CODEOWNERS file starts with a catch-all default and then uses later, more specific rules so last-match-wins behavior can be tested. Q23 audit logging intentionally falls through to the default platform owner.

## Database

The schema in migrations/schema.sql deliberately omits the indexes that would fix the slow queries, including payments(user_id), users(lower(email)), trigram product search indexes, and supporting reporting partitions.
