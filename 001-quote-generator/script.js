'use strict';

const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');
const btnTwitter = document.querySelector('.twitter');
const btnNewQuote = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quotes from API
async function quoteGenerator() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    const apiQuotes = await response.json();

    // Get 1 quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // TextContent
    quote.text.length > 50
      ? quoteText.classList.add('long-quote')
      : quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;

    const author = quote.author.replace('type.fit', '').replace(',', '');
    !author
      ? (quoteAuthor.textContent = 'Unknown')
      : (quoteAuthor.textContent = author);
    complete();
  } catch (error) {
    // Catch error
  }
}

btnNewQuote.addEventListener('click', quoteGenerator);

btnTwitter.addEventListener('click', () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
});

// On load
quoteGenerator();
