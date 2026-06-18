export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { keyword, minPrice } = req.query;
  if (!keyword) return res.status(400).json({ error: 'keyword required' });

  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;
  if (!appId) return res.status(500).json({ error: 'RAKUTEN_APP_ID not set' });
  if (!accessKey) return res.status(500).json({ error: 'RAKUTEN_ACCESS_KEY not set' });

  const params = new URLSearchParams({
    applicationId: appId,
    accessKey: accessKey,
    keyword,
    hits: '10',
    sort: '+itemPrice',
    format: 'json',
  });
  if (minPrice && Number(minPrice) > 0) params.set('minPrice', minPrice);

  const r = await fetch(
    `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20260401?${params}`,
    {
      headers: {
        'Referer': 'https://feedfesta.co.jp/',
        'Origin': 'https://feedfesta.co.jp',
      }
    }
  );
  const data = await r.json();
  return res.status(r.ok ? 200 : r.status).json(data);
}





