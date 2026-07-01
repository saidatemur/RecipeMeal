// Backend API adresi. Vercel'de VITE_API_URL environment variable'ını
// Render backend URL'ine (örn: https://recipemeal-api.onrender.com) ayarlayin.
// Lokal geliştirmede .env dosyası yoksa localhost:5113'e düşer.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5113";
