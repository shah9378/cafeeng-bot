const express = require("express");
const path = require("path");
const { Telegraf } = require("telegraf");

// ===============
//   تنظیمات مهم
// ===============
const BOT_TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20";

// آدرس Render (بدون / آخر)
const WEBHOOK_URL = "https://cafeeng-bot-1.onrender.com";

// ===============
//   ساخت ربات
// ===============
const bot = new Telegraf(BOT_TOKEN);

// پاسخ به /start
bot.start((ctx) => {
  ctx.reply(
    "سلام! ربات Cafeeng همیشه آنلاینه 👷‍♂️📚\nبرای باز کردن Mini App روی دکمه پایین بزن:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 باز کردن Mini App",
              web_app: { url: `${WEBHOOK_URL}/app` },
            },
          ],
        ],
      },
    }
  );
});

// ===============
//   ساخت Express
// ===============
const app = express();

// فایل‌های پوشه frontend مثل CSS, JS
app.use(express.static("frontend"));

// مسیر Mini App
app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "miniapp.html"));
});

// وب‌هوک ربات
app.use(bot.webhookCallback("/webhook"));

// تنظیم وب‌هوک
bot.telegram.setWebhook(`${WEBHOOK_URL}/webhook`);

// صفحه اصلی فقط برای تست
app.get("/", (req, res) => {
  res.send("Cafeeng Bot is Running! ✔️");
});

// ===============
//   اجرای سرور
// ===============
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 سرور اجرا شد روی پورت:", PORT);
  console.log("🌐 Webhook فعال شد:", `${WEBHOOK_URL}/webhook`);
  console.log("📱 MiniApp URL:", `${WEBHOOK_URL}/app`);
});
