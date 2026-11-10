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

    // Explicit sitemap.xml handling (guarantee Content-Type: application/xml; charset=utf-8, no X-Robots-Tag)
    if (url.pathname === '/sitemap.xml' && env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      const headers = new Headers(assetRes.headers);
      headers.set('Content-Type', 'application/xml; charset=utf-8');
      headers.delete('X-Robots-Tag');
      return new Response(assetRes.body, {
        status: assetRes.status,
        headers,
      });
    }

    // Explicit robots.txt handling (guarantee Content-Type: text/plain; charset=utf-8, no X-Robots-Tag)
    if (url.pathname === '/robots.txt' && env.ASSETS) {
      const assetRes = await env.ASSETS.fetch(request);
      const headers = new Headers(assetRes.headers);
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.delete('X-Robots-Tag');
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
