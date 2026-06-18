export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ error: 'keyword required' });

  const appId = process.env.RAKUTEN_APP_ID;
  if (!appId) return res.status(500).json({ error: 'RAKUTEN_APP_ID not set' });

  const params = new URLSearchParams({
    applicationId: appId,
    keyword,
    hits: '10',
    sort: '+itemPrice',
    format: 'json',
  });

  const r = await fetch(
    `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?${params}`
  );
  const data = await r.json();
  return res.status(r.ok ? 200 : r.status).json(data);
}
