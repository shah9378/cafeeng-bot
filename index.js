import express from "express";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20";
const bot = new TelegramBot(TOKEN, { polling: false });

await bot.setWebHook("https://cafeeng-bot-1.onrender.com/webhook");

// ارائه فایل‌های استاتیک (در صورت وجود)
app.use(express.static(__dirname));

// *** مهم‌ترین قسمت: روت درست برای WebApp ***
app.get("/app", (req, res) => {
    res.sendFile(path.join(__dirname, "miniapp.html"));
});

app.get("/app/", (req, res) => {
    res.sendFile(path.join(__dirname, "miniapp.html"));
});

app.get("/", (req, res) => {
    res.send("Cafeeng Bot is Running! ✔️");
});

// webhook
app.post("/webhook", express.json(), async (req, res) => {
    const update = req.body;

    if (update.message) {
        const chatId = update.message.chat.id;

        if (update.message.text === "/start") {
            bot.sendMessage(chatId, "سلام! این مینی‌اپ است ✔️", {
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "🚀 باز کردن مینی اپ",
                                web_app: { url: "https://cafeeng-bot-1.onrender.com/app/" }
                            }
                        ]
                    ],
                    resize_keyboard: true
                }
            });
        }
    }

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log("SERVER ON PORT", PORT);
});
