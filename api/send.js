export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = "9011362716:AAHu7AJ1P7dEZCMfs0Mhu8B2U-Df0XnYOOQ";
    const CHAT_ID = "6947664268";

    try {
        const { type, text, caption, data } = req.body;
        let telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        let bodyData = { chat_id: CHAT_ID, text: text, parse_mode: "Markdown" };

        if (type === 'photo') {
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
