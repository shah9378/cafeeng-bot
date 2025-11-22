const express = require("express");
const { Telegraf } = require("telegraf");

console.log("🔥 فایل index.js اجرا شد! مرحله تست 1");

// =======================
//   تنظیمات مهم
// =======================

// توکن ربات
const BOT_TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20";  

// آدرس سایت Render
const WEB_APP_URL = "https://cafeeng-bot.onrender.com";

// =======================
//   ساخت ربات
// =======================
console.log("🔥 مرحله تست 2: Telegraf لود شد");
const bot = new Telegraf(BOT_TOKEN);
console.log("🔥 مرحله تست 3: bot ساخته شد");

// پاسخ به /start
bot.start((ctx) => {
  ctx.reply("سلام! ربات Cafeeng همیشه آنلاینه 👷‍♂️📚");
});

// =======================
//   Express Web Server
// =======================
const app = express();

// Telegraf webhook
app.use(bot.webhookCallback("/webhook"));

// تنظیمWebhook برای تلگرام
bot.telegram.setWebhook(`${WEB_APP_URL}/webhook`);

app.get("/", (req, res) => {
  res.send("Cafeeng Bot is Running!");
});

// پورت Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 سرور روی پورت ${PORT} اجرا شد`);
  console.log(`🌐 Webhook فعال شد: ${WEB_APP_URL}/webhook`);
});
