const express = require("express");
const path = require("path");
const { Telegraf } = require("telegraf");

console.log("🔥 index.js اجرا شد");

// =======================
//   تنظیمات مهم
// =======================

// توکن ربات
const BOT_TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20"; // ⬅️ توکن واقعی را بگذار

// آدرس دامنه Render
const WEBHOOK_URL = "https://cafeeng-bot-1.onrender.com/webhook";

// =======================
//   ساخت ربات
// =======================
const bot = new Telegraf(BOT_TOKEN);

// پاسخ به /start
bot.start((ctx) => {
  ctx.reply("سلام! ربات Cafeeng همیشه آنلاینه 👷‍♂️📚\nبرای اجرای مینی‌اپ دکمه زیر را بزن:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "اجرای Mini App 🚀",
              web_app: { url: "https://cafeeng-bot-1.onrender.com/app" }
            }
          ]
        ]
      }
    }
  );
});

// =======================
//   Express Web Server
// =======================
const app = express();

// ثبت webhook
app.use(bot.webhookCallback("/webhook"));

// دریافت فایل miniapp.html
app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "miniapp.html"));
});

// صفحه اصلی تست
app.get("/", (req, res) => {
  res.send("Cafeeng Bot is Running!");
});

// فعال‌سازی Webhook هنگام اجرا
bot.telegram.setWebhook(WEBHOOK_URL);

// پورت Render
const PORT = process.env.PORT || 3000;

// اجرای سرور
app.listen(PORT, () => {
  console.log(`🚀 سرور روی پورت ${PORT} اجرا شد`);
  console.log(`🌐 Webhook فعال شد: ${WEBHOOK_URL}`);
});
app.post("/api/action-test", (req, res) => {
  res.send("پاسخ تست از سرور دریافت شد ✔️");
});
