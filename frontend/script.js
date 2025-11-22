const tg = window.Telegram.WebApp;
tg.expand();

// مقالات نمونه اولیه — می‌توانی داخل API ذخیره کنی
let articles = [
  "نحوه طراحی دال بتنی",
  "اصول بارگذاری پل‌ها",
  "آزمایش‌های مخرب و غیرمخرب بتن"
];

function loadArticles() {
  const ul = document.getElementById("articles-list");
  ul.innerHTML = "";
  articles.forEach(article => {
    const li = document.createElement("li");
    li.innerText = article;
    ul.appendChild(li);
  });
}

function addArticle() {
  const title = prompt("عنوان مقاله جدید را وارد کنید:");
  if (title && title.trim() !== "") {
    articles.unshift(title);
    loadArticles();
  }
}

function openWebsite() {
  window.location.href = "https://www.cafeeng.com";
}

window.onload = loadArticles;
