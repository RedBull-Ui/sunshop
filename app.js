const express = require('express');
const app = express();
// const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // Importez Axios
const admin = require('firebase-admin');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Configuration de la connexion à la base de données 

const serviceAccount = require('./sunshop.json'); // Remplacez par le chemin vers votre fichier de configuration Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/boutique', async (req, res) => {
  try {
    const snapshot = await db.collection('produits').get();
    const produits = snapshot.docs.map(doc => doc.data());
    res.render('boutique.ejs', { produits });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur de base de données' });
  }
});


// Nous allons créer un tableau pour stocker les produits ajoutés côté client
const produitsDansLePanier = [];

app.post('/ajouter-au-panier', async (req, res) => {
  const produitId = req.body.produitId;

  try {
    const produitRef = db.collection('produits').doc(produitId);
    const produitDoc = await produitRef.get();
    const produit = produitDoc.data();

    // Ajoutez le produit au tableau des produits dans le panier
    produitsDansLePanier.push(produit);

    // Envoyez une réponse pour indiquer le succès de l'ajout
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout au panier' });
  }
});


// Exemple de récupération des données du panier depuis Firestore
app.get('/panier', (req, res) => {
  // Vous devez adapter cette partie en fonction de la structure réelle de votre base de données Firestore
  res.render('panier.ejs', { produitsDansLePanier });
});


app.get('/contact', function (req, res) {
  res.render('contact.ejs');
});
app.get('/apropos', function (req, res) {
  res.render('apropos.ejs');
});
app.get('/regler', function (req, res) {
  res.render('regler.ejs');
});
app.get('/effectuer', function (req, res) {
  res.render('effectuer.ejs');
});

// ... Autres configurations et routes ...

// Ajoutez une route pour recevoir les données du client
app.post('/envoyer-sur-telegram', bodyParser.json(), async (req, res) => {
  const { nom, numeroTelephone, produits } = req.body;

  // Construisez le message à envoyer sur Telegram en utilisant les données reçues
  const message = `🎀 Commande de ${nom} (${numeroTelephone}) :\n\n` +
    produits.map((produit) => {
      return `${produit.nom} - ${produit.prix} CFA\nDescription : ${produit.description}\n`;
    }).join('\n');

  // Remplacez 'YOUR_BOT_TOKEN' et 'CHAT_ID' par les valeurs appropriées
  // const botToken = '5244781796:AAGCvFJnb8M6TcmUGidpMs4Ox8Rs72PVi-U';
  // const chatId = '1016981131';
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

// Utilisez botToken et chatId dans votre code


  try {
    const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
    
    if (response.status === 200) {
      res.json({ success: true });
    } else {
      console.error('Erreur lors de l\'envoi de la commande sur Telegram.');
      res.status(500).json({ error: 'Erreur lors de l\'envoi de la commande sur Telegram' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la commande sur Telegram :', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la commande sur Telegram' });
  }
});


// ... D'autres configurations et routes ...


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// app.listen(3000, () => {
//   console.log('Le serveur est lancé sur le port 3000 !');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

