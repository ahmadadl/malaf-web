export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = "9011362716:AAHu7AJ1P7dEZCMfs0Mhu8B2U-Df0XnYOOQ";
    const CHAT_ID = "6947664268";

    try {
        const body = req.body || {};
        let text = body.text || "پەیامی تاقیکردنەوە";

        // ئەگەر شفرە کرابوو بیکەینەوە، ئەگەر نەخێر وەک خۆی دەیهێڵینەوە
        try {
            text = atob(text).split('').map(char => 
                String.fromCharCode(char.charCodeAt(0) - 3)
            ).join('');
        } catch(e) {}

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });

        const result = await response.json();
        return res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
