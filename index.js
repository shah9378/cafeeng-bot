const express = require("express");
const path = require("path");
const { Telegraf } = require("telegraf");

console.log("🔥 index.js اجرا شد");

// =========================
//   تنظیمات مهم
// =========================

// توکن ربات
const BOT_TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20";  // 🔺 حتما اینو با توکن واقعی عوض کن

// آدرس دامنه Render (بدون اسلش آخر! مهم)
const RENDER_URL = "https://cafeeng-bot-1.onrender.com";

// =========================
//   ساخت ربات
// =========================

const bot = new Telegraf(BOT_TOKEN);

// پیام /start + دکمه Mini App
bot.start((ctx) => {
  ctx.reply(
    "سلام! به کافه مهندسی خوش اومدی 👷‍♂️📚\nبرای ورود به مینی‌اپ، دکمه زیر را بزن:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 ورود به مینی‌اپ کافه مهندسی",
              web_app: {
                url: `${RENDER_URL}/app/`
              }
            }
          ]
        ]
      }
    }
  );
});

// =========================
//   Express Web Server
// =========================

const app = express();

// سرو کردن فایل‌های frontend به صورت استاتیک
app.use("/app", express.static(path.join(__dirname, "frontend")));

// روت اصلی
app.get("/", (req, res) => {
  res.send("Cafeeng Bot is Running! ✔️");
});

// webhook
app.use(bot.webhookCallback("/webhook"));

// فعال‌سازی webhook
bot.telegram.setWebhook(`${RENDER_URL}/webhook`);

// پورت
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 سرور روی پورت ${PORT} اجرا شد`);
  console.log(`🌐 Webhook فعال شد: ${RENDER_URL}/webhook`);
  console.log(`📱 Mini App: ${RENDER_URL}/app/`);
});
