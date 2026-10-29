export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // پشکنینی سەرچاوەی داواکاری بۆ ڕێگری لە سپام
    const referer = req.headers.referer || '';
    if (!referer.includes('vercel.app')) {
        // دەتوانیت لێرەدا ناوی دامەینەکەی خۆت بنووسیت
        return res.status(403).json({ error: 'Forbidden request' });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    try {
        const { type, text, caption, data } = req.body;
        let telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        let bodyData = { chat_id: CHAT_ID, text: text, parse_mode: "Markdown" };

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
