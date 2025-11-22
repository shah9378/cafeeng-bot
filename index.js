// =======================
//   نیازمندی‌ها
// =======================
const express = require("express");
const { Telegraf } = require("telegraf");

// =======================
//   تنظیمات ربات
// =======================

// ⚠️ توکن ربات تلگرام خودت را اینجا بگذار
const BOT_TOKEN = "8434442638:AAE-77hXCMlqYrZVkrzfvJHtuvaNsMB1B20";

// آدرس Render
const BASE_URL = "https://cafeeng-bot-1.onrender.com";

console.log("🔥 فایل index.js اجرا شد!");

// =======================
//   ساخت ربات
// =======================
const bot = new Telegraf(BOT_TOKEN);

console.log("🤖 ربات ساخته شد");

// /start
bot.start((ctx) => {
  ctx.reply(
    "سلام! به ربات Cafeeng خوش اومدی 👷‍♂️📚\n\nاز دکمه‌های زیر استفاده کن:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 اجرای Mini App",
              web_app: { url: `${BASE_URL}/app` },
            },
          ],
          [{ text: "ℹ️ درباره ربات", callback_data: "about" }],
          [{ text: "📚 راهنما", callback_data: "help" }],
        ],
      },
    }
  );
});

// دکمه‌ها
bot.action("about", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("ربات Cafeeng برای مینی‌اپ‌ها و اتوماسیون طراحی شده است.");
});

bot.action("help", (ctx) => {
  ctx.answerCbQuery();
  ctx.reply("برای شروع Mini App را باز کنید یا دستور /start را وارد کنید.");
});

// =======================
//   Express Server
// =======================
const app = express();
app.use(express.json());

// مسیر اجرای Mini App
app.use("/app", express.static("miniapp.html" ? __dirname : "/"));

// صفحه Home
app.get("/", (req, res) => {
  res.send("Cafeeng Bot is Running! ✔️");
});

// =======================
//   API مخصوص Mini App
// =======================
app.post("/api/action-test", (req, res) => {
  console.log("📩 درخواست تست از Mini App دریافت شد");
  res.send("پاسخ تست از سرور ✔️");
});

// =======================
//   Webhook
// =======================
app.use(bot.webhookCallback("/webhook"));
bot.telegram.setWebhook(`${BASE_URL}/webhook`);

console.log("🌐 Webhook تنظیم شد:", `${BASE_URL}/webhook`);

// =======================
//   اجرای سرور Render
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 سرور روی پورت ${PORT} اجرا شد`);
  console.log(`🌍 Mini App: ${BASE_URL}/app`);
  console.log(`📩 Webhook:  ${BASE_URL}/webhook`);
});
