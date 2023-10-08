// telegram.js

const TelegramBot = require('node-telegram-bot-api');

// Remplacez 'YOUR_BOT_TOKEN' par le token de votre bot Telegram
const token = '5244781796:AAGCvFJnb8M6TcmUGidpMs4Ox8Rs72PVi-U';

// Créez une instance du bot
const bot = new TelegramBot(token, { polling: true });

// Récupérez les données depuis le localStorage
const produitsDansLePanier = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('produit_')) {
    const produit = JSON.parse(localStorage.getItem(key));
    produitsDansLePanier.push(produit);
  }
}

// Envoyez les données au bot Telegram
const chatId = '1016981131'; // Remplacez par l'ID de chat de votre utilisateur ou groupe cible
produitsDansLePanier.forEach((produit) => {
  const message = `Nouveau produit ajouté au panier :\nNom : ${produit.nom}\nPrix : ${produit.prix} CFA\nDescription : ${produit.description}`;
  bot.sendMessage(chatId, message);
  alert('envoyer !')
});
