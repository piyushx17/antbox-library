export default async (req) => {
  try {
    process.env.ANTBOX_ROOT ||= new URL('../..', import.meta.url).pathname;
    const { handleApiFetch } = await import('../../server.mjs');
    const url = new URL(req.url);
    let body = {};
    if (req.method !== 'GET' && req.headers.get('content-length') !== '0') {
      const raw = await req.text();
      body = raw ? JSON.parse(raw) : {};
    }
    const result = await handleApiFetch(req.method, url.pathname, body);
    return Response.json(result.body, {
      status: result.status,
      headers: { 'cache-control': 'no-store' }
    });
  } catch (error) {
    return Response.json(
      { error: error.message || 'Server error' },
      { status: 500, headers: { 'cache-control': 'no-store' } }
    );
  }
};

export const config = {
  path: '/api/*'
};
