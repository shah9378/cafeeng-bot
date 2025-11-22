const express = require("express");
const { Telegraf } = require("telegraf");

// =======================
//   تنظیمات اصلی
// =======================

// توکن ربات
const BOT_TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20";  // ← توکن واقعی ربات را وارد کن

// آدرس دامنه Render
const WEBHOOK_DOMAIN = "https://cafeeng-bot-1.onrender.com";

// مسیر وبهوک
const WEBHOOK_PATH = "/webhook";

// =======================
//   ساخت ربات
// =======================
const bot = new Telegraf(BOT_TOKEN);

// پاسخ به استارت
bot.start((ctx) => {
  ctx.reply("سلام! ربات Cafeeng همیشه آنلاینه 👷‍♂️📚");
});

// =======================
//   ساخت سرور Express
// =======================
const app = express();

// فعال کردن مسیر استاتیک برای Mini App
app.use("/app", express.static("frontend"));

// صفحه اصلی سایت
app.get("/", (req, res) => {
  res.send("Cafeeng Bot is Running! ✔️");
});

// اتصال وبهوک
app.use(bot.webhookCallback(WEBHOOK_PATH));

// ست‌کردن وبهوک تلگرام
bot.telegram.setWebhook(`${WEBHOOK_DOMAIN}${WEBHOOK_PATH}`);

// اجرای سرور
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Webhook active at: ${WEBHOOK_DOMAIN}${WEBHOOK_PATH}`);
  console.log(`📱 MiniApp served at: ${WEBHOOK_DOMAIN}/app/`);
});
