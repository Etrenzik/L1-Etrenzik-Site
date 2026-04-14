---
description: "Deploy the Sami-Ali-Lawsuit litigation workspace to a subdomain under etrenzik.com using Vercel + GoDaddy DNS. Generates CI/CD, Vercel config, Next.js settings, and DNS records."
agent: "agent"
tools: ["run_in_terminal", "create_file", "replace_string_in_file", "read_file", "file_search", "grep_search"]
---

# Deploy Litigation Workspace to `case.etrenzik.com`

You are deploying the **Sami-Ali-Lawsuit** monorepo (Turborepo) to a subdomain of `etrenzik.com`. The domain is registered at **GoDaddy**. The target deployment platform is **Vercel**.

## Context

- **Repository:** `Etrenzik/Sami-Ali-Lawsuit` (GitHub, private)
- **Domain registrar:** GoDaddy (etrenzik.com)
- **Subdomain target:** `case.etrenzik.com`
- **Monorepo:** Turborepo with `apps/web` (Next.js 16), `apps/api` (Fastify 5), `apps/worker` (BullMQ)
- **Database:** PostgreSQL 16 + pgvector (needs managed DB — Supabase or Neon recommended)
- **Cache/Queue:** Redis 7 (needs managed Redis — Upstash recommended)
- **This is a PRIVATE litigation workspace** — must be access-controlled, not public-facing

## Step 1 — Vercel Project Configuration

Create `apps/web/vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "cd ../.. && npx turbo run build --filter=@l1-etrenzik/web",
  "installCommand": "cd ../.. && npm install",
  "outputDirectory": ".next",
  "rewrites": [
    { "source": "/api/:path*", "destination": "{{API_DEPLOYMENT_URL}}/api/:path*" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Disclaimer", "value": "DRAFT WORK PRODUCT — NOT LEGAL ADVICE" },
        { "key": "X-Robots-Tag", "value": "noindex, nofollow" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

## Step 2 — Next.js Production Config

Update `apps/web/next.config.ts` for production deployment:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ["case.etrenzik.com"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://case-api.etrenzik.com",
    NEXT_PUBLIC_SITE_URL: "https://case.etrenzik.com",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Disclaimer", value: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## Step 3 — GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npx turbo run lint
      - run: npx turbo run test

  deploy-preview:
    needs: lint-and-test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    environment: preview
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install -g vercel@latest
      - run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}

  deploy-production:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install -g vercel@latest
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - id: deploy
        run: echo "url=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})" >> $GITHUB_OUTPUT
      - name: Output deployment URL
        run: echo "Deployed to ${{ steps.deploy.outputs.url }}"
```

## Step 4 — GoDaddy DNS Records

Add these DNS records at GoDaddy for `etrenzik.com`:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `case` | `cname.vercel-dns.com` | 600 |

If also deploying the API separately:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `case-api` | `<your-api-host>` | 600 |

Then in **Vercel Dashboard** → Project Settings → Domains → Add `case.etrenzik.com`.

## Step 5 — Environment Variables (Vercel Dashboard)

Set these in Vercel project settings → Environment Variables:

```
DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/l1_etrenzik?schema=public
REDIS_URL=redis://default:<pass>@<host>:6379
LLM_API_KEY=sk-...
LLM_BASE_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4o
LLM_EMBEDDING_MODEL=text-embedding-3-small
NEXT_PUBLIC_API_URL=https://case-api.etrenzik.com
API_CORS_ORIGIN=https://case.etrenzik.com
```

## Step 6 — Authentication Middleware

Create `apps/web/src/middleware.ts` to protect the entire site:

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for auth cookie or header
  const token = request.cookies.get("session_token")?.value;

  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("X-Disclaimer", "DRAFT WORK PRODUCT — NOT LEGAL ADVICE");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|login).*)"],
};
```

## Step 7 — Robots & Indexing Prevention

Create `apps/web/public/robots.txt`:

```
User-agent: *
Disallow: /
```

## Step 8 — GitHub Secrets Required

Add these secrets to the `Etrenzik/Sami-Ali-Lawsuit` repository settings:

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | `vercel pull` outputs this |
| `VERCEL_PROJECT_ID` | `vercel pull` outputs this |

## Execution Checklist

1. [ ] Create `apps/web/vercel.json` with security headers + Turbo build command
2. [ ] Update `apps/web/next.config.ts` with standalone output + production env
3. [ ] Create `.github/workflows/deploy.yml` for CI/CD
4. [ ] Create `apps/web/src/middleware.ts` for auth protection
5. [ ] Create `apps/web/public/robots.txt` to prevent indexing
6. [ ] Add CNAME record `case → cname.vercel-dns.com` at GoDaddy
7. [ ] Add `case.etrenzik.com` domain in Vercel project settings
8. [ ] Set all environment variables in Vercel dashboard
9. [ ] Add GitHub secrets (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
10. [ ] Push to main → verify deployment at `https://case.etrenzik.com`
11. [ ] Verify SSL certificate auto-provisioned by Vercel
12. [ ] Test auth middleware blocks unauthenticated access

## Security Requirements

- **PRIVATE** — no public access, auth required on all routes
- **noindex** — robots.txt + X-Robots-Tag header prevent search engine indexing
- **HSTS** — Strict-Transport-Security enforced
- **No iframes** — X-Frame-Options: DENY
- **Disclaimer** — every response tagged DRAFT WORK PRODUCT
