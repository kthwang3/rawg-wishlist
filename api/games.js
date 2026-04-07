export default async function handler(req, res) {
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Missing RAWG_API_KEY environment variable on the server.'
    });
  }

  const pageSizeParam = req.query?.page_size;
  const parsedPageSize = Number(pageSizeParam);
  const pageSize = Number.isFinite(parsedPageSize) && parsedPageSize > 0
    ? parsedPageSize
    : 40;

  const rawgUrl = `https://api.rawg.io/api/games?key=${encodeURIComponent(apiKey)}&page_size=${pageSize}`;

  try {
    const response = await fetch(rawgUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `RAWG request failed with HTTP ${response.status}`
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: `Unexpected server error: ${error.message}`
    });
  }
}