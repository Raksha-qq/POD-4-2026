const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.getElementById("newQuote");
const loading = document.getElementById("loading");

const copyBtn = document.getElementById("copy");
const tweetBtn = document.getElementById("tweet");
const API_URL = "https://api.quotable.io/random";

async function getQuote() {
     try {
          loading.classList.remove("hidden");
          quoteEl.textContent = "";
          authorEl.textContent = "";

          const res = await fetch(API_URL);

          if (!res.ok) {
               throw new Error("Failed to fetch quote");
          }

          const data = await res.json();

          quoteEl.textContent = `"${data.content}"`;
          authorEl.textContent = `- ${data.author}`;

     } catch (error) {
          quoteEl.textContent = "Oops! Something went wrong.";
          authorEl.textContent = "";
          console.error(error);
     } finally {
          loading.classList.add("hidden");
     }
}

copyBtn.addEventListener("click", () => {
     const text = `${quoteEl.textContent} ${authorEl.textContent}`;
     navigator.clipboard.writeText(text);
     alert("Copied to clipboard!");
});

tweetBtn.addEventListener("click", () => {
     const text = `${quoteEl.textContent} ${authorEl.textContent}`;
     const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
     window.open(url, "_blank");
});

btn.addEventListener("click", getQuote);
getQuote();