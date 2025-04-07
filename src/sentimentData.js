// src/sentimentData.js

const sentiments = ["Positive 😊", "Neutral 😐", "Negative 😞"];

function getRandomSentiment() {
  return sentiments[Math.floor(Math.random() * sentiments.length)];
}

const assetSentiments = {
  "Apple (AAPL)": getRandomSentiment(),
  "Tesla (TSLA)": getRandomSentiment(),
  "Bitcoin (BTC)": getRandomSentiment(),
  "Ethereum (ETH)": getRandomSentiment(),
};

export default assetSentiments;
