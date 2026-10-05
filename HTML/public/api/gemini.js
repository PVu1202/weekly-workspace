export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const API_KEY = process.env.GEMINI_API_KEY;  // Lưu ở Vercel Env
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  
  const data = await response.json();
  res.status(response.status).json(data);
}