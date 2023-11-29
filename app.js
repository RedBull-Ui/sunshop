const express = require('express');
const app = express();
// const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios'); // Importez Axios
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid'); // Importe uuid


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
    const produits = snapshot.docs.map((doc) => {
      const produitData = doc.data();
      return {
        ...produitData,
        id: uuidv4(), // Ajoute un nouvel ID unique à chaque produit
      };
    });
    res.render('boutique.ejs', { produits });
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    res.status(500).json({ error: 'Erreur de base de données' });
  }
});

app.get('/neocell', async (req, res) => {
  try {
    const maCollection = db.collection('produits');
    const motCle = 'NEOCELL';

    // Utilisation d'une expression régulière pour rechercher la sous-chaîne 'NEOCELL' dans le champ 'nom'
    const querySnapshot = await maCollection.where('nom', '>=', motCle).where('nom', '<=', motCle + '\uf8ff').get();

    const neocell = querySnapshot.docs.map((doc) => {
      const produitData = doc.data();
      return {
        ...produitData,
        id: doc.id, // Utilisez l'ID réel du document Firestore
      };
    });

    res.render('neocell.ejs', { neocell });
    console.log(neocell);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ error: 'Erreur de base de données' });
  }
});

app.get('/nivea', async (req, res) => {
  try {
    const maCollection = db.collection('produits');
    const motCle = 'NIVEA';

    // Utilisation d'une expression régulière pour rechercher la sous-chaîne 'nivea' dans le champ 'nom'
    const querySnapshot = await maCollection.where('nom', '>=', motCle).where('nom', '<=', motCle + '\uf8ff').get();

    const nivea = querySnapshot.docs.map((doc) => {
      const produitData = doc.data();
      return {
        ...produitData,
        id: doc.id, // Utilisez l'ID réel du document Firestore
      };
    });

    res.render('nivea.ejs', { nivea });
    console.log(nivea);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ error: 'Erreur de base de données' });
  }
});


app.get('/panier', function (req, res) {
  res.render('panier.ejs');
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

app.post('/envoyer-sur-telegram', bodyParser.json(), async (req, res) => {
  const botToken = '5244781796:AAGCvFJnb8M6TcmUGidpMs4Ox8Rs72PVi-U';
  const chatId = '1016981131';

  // Assurez-vous que le corps de la requête contient les champs "panier", "nomPrenom" et "numeroTelephone"
  const { panier, nomPrenom, numeroTelephone } = req.body;

  try {
    if (nomPrenom && numeroTelephone) {
      // Formatez les éléments du panier dans un message lisible
      const panierMessage = panier.map(item => `Produit: ${item.nom}, Prix: ${item.prix} CFA`).join('\n');

      const message = `✅ Nouvelle commande de : \n${nomPrenom} (${numeroTelephone}).\n\n📝 Détails de la commande:\n${panierMessage}`;
      
      const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`);
      
      if (response.status === 200) {
        res.json({ success: true });
      } else {
        console.error('Erreur lors de l\'envoi de la commande sur Telegram.');
        res.status(500).json({ error: 'Erreur lors de l\'envoi de la commande sur Telegram' });
      }
    } else {
      console.error('Erreur: champs manquants.');
      res.status(400).json({ error: 'Champs manquants' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la commande sur Telegram :', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de la commande sur Telegram' });
  }
});



// ... D'autres configurations et routes ...

const panier = [];

app.post('/ajouter-au-panier', (req, res) => {
  const { id, nom, prix, desc, url } = req.body;

  // Vérifie si id est une chaîne non vide
  if (!id || typeof id !== 'string') {
    console.error('ID invalide');
    return res.status(400).json({ error: 'ID invalide' });
  }

  // Ajouter le produit au panier
  panier.push({ id, nom, prix, desc, url });

  res.json({ success: true, panier });
});




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

