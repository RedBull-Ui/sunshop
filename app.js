const express = require('express');
const app = express();
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // Importez Axios

app.set('view engine', 'ejs');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'alimentaire',
});

connection.connect((err) => {
  if (err) {
      console.error('Erreur de connexion à la base de données :', err);
  } else {
      console.log('Connecté à la base de données MySQL');
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/boutique', (req, res) => {
  const sql = 'SELECT * FROM produits';

  connection.query(sql, (err, rows) => {
      if (err) {
          console.error('Erreur lors de la récupération des données :', err);
          res.status(500).json({ error: 'Erreur de base de données' });
      } else {
        res.render('boutique', { produits: rows });
      }
  });
});

// Nous allons créer un tableau pour stocker les produits ajoutés côté client
const produitsDansLePanier = [];

// Lorsqu'un produit est ajouté côté client, nous l'ajoutons au tableau
app.post('/ajouter-au-panier', (req, res) => {
  const produitId = req.body.produitId;
  // Vous pouvez ajouter d'autres informations sur le produit ici, si nécessaire

  // Recherchez le produit par son ID (vous devez implémenter cette recherche)
  const produit = /* Recherchez le produit par son ID dans la base de données */

  // Ajoutez le produit au tableau des produits dans le panier
  produitsDansLePanier.push(produit);

  // Envoyez une réponse pour indiquer le succès de l'ajout
  res.json({ success: true });
});

app.get('/panier', (req, res) => {
  // Affichez les produits ajoutés côté client dans la vue panier.ejs
  res.render('panier', { produitsDansLePanier });
});

app.get('/contact', function (req, res) {
  res.render('contact');
});
app.get('/apropos', function (req, res) {
  res.render('apropos');
});
app.get('/regler', function (req, res) {
  res.render('regler');
});
app.get('/effectuer', function (req, res) {
  res.render('effectuer');
});

// ... Autres configurations et routes ...

// Ajoutez une route pour recevoir les données du client
app.post('/envoyer-sur-telegram', bodyParser.json(), async (req, res) => {
  const { nom, numeroTelephone, produits } = req.body;

  // Construisez le message à envoyer sur Telegram en utilisant les données reçues
  const message = `🎀 Commande de ${nom} (${numeroTelephone}) :\n\n` +
    produits.map((produit) => {
      return `${produit.nom} - ${produit.prix} €\nDescription : ${produit.description}\n`;
    }).join('\n');

  // Remplacez 'YOUR_BOT_TOKEN' et 'CHAT_ID' par les valeurs appropriées
  const botToken = '5244781796:AAGCvFJnb8M6TcmUGidpMs4Ox8Rs72PVi-U';
  const chatId = '1016981131';

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

app.listen(3000, () => {
  console.log('Le serveur est lancé sur le port 3000 !');
});
