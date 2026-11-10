/* eslint-disable import/no-default-export */
import { handleContactRequest } from './contact';
import type { WorkerEnv } from './types';

const worker = {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight for /api/*
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) {
      const origin = request.headers.get('origin') || '*';
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Lead contact API route
    if (url.pathname === '/api/contact') {
      return handleContactRequest(request, env);
    }

    // Explicit sitemap.xml handling (guarantee clean headers, correct Content-Type, no duplicate nosniff)
    if (url.pathname === '/sitemap.xml' && env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      const headers = new Headers();
      headers.set('Content-Type', 'application/xml; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600');
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      headers.set('Access-Control-Allow-Origin', '*');
      return new Response(assetRes.body, {
        status: assetRes.status,
        headers,
      });
    }

    // Explicit robots.txt handling (guarantee clean headers, correct Content-Type, no duplicate nosniff)
    if (url.pathname === '/robots.txt' && env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      const headers = new Headers();
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Cache-Control', 'public, max-age=3600');
      headers.set('X-Content-Type-Options', 'nosniff');
      headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
      headers.set('Access-Control-Allow-Origin', '*');
      return new Response(assetRes.body, {
        status: assetRes.status,
        headers,
      });
    }

    // Static assets fallback (Workers Static Assets binding)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};

export default worker;
