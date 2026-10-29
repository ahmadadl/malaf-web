// ساده‌کراوی Rate Limiting بۆ ڕێگری لە سپام
const requestLimits = new Map();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // پشکنینی سەرچاوەی داواکاری (Domain Whitelisting)
    const referer = req.headers.referer || '';
    if (!referer.includes('vercel.app')) {
        return res.status(403).json({ error: 'Forbidden request' });
    }

    // سیستەمی Rate Limiting بەپێی IP
    const clientIp = req.headers['x-forwarded-for'] || 'unknown';
    const currentTime = Date.now();
    
    if (requestLimits.has(clientIp)) {
        const lastRequestTime = requestLimits.get(clientIp);
        if (currentTime - lastRequestTime < 3000) { // 3 چرکە نێوان هەر داواکارییەک
            return res.status(429).json({ error: 'Too many requests. Please wait.' });
        }
    }
    requestLimits.set(clientIp, currentTime);

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        const { type, text, caption, data } = req.body;
        let telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        let bodyData = { chat_id: CHAT_ID, text: text ? text.slice(0, 4000) : "داتای ڤیدیۆیی/وێنەیی", parse_mode: "Markdown" };

        if (type === 'photo' && data) {
            telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
        }

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        const result = await response.json();
        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
