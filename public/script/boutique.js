document.addEventListener("DOMContentLoaded", function () {
    // Récupération de tous les boutons "Ajouter au panier"
    const ajoutAuPanierButtons = document.querySelectorAll('.ajouter-au-panier');
  
    // Fonction pour gérer l'ajout au panier
    function ajouterAuPanier(produit) {
      // Générez une clé unique en ajoutant l'ID du produit
      const cleProduit = `produit_${produit.id}`;
  
      // Vérifiez d'abord si le produit existe déjà dans le localStorage
      const produitExistant = localStorage.getItem(cleProduit);
  
      if (produitExistant) {
        // Si le produit existe déjà, mettez à jour la quantité
        const produitParse = JSON.parse(produitExistant);
        produitParse.quantite += 1;
        localStorage.setItem(cleProduit, JSON.stringify(produitParse));
      } else {
        // Si le produit n'existe pas, ajoutez-le avec une quantité de 1
        produit.quantite = 1;
        localStorage.setItem(cleProduit, JSON.stringify(produit));
      }
  
      alert('Produit ajouté au panier !'); // Affichez un message de confirmation
      location.reload();
    }
  
    // Gestion des clics sur les boutons "Ajouter au panier"
    ajoutAuPanierButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const produitId = button.getAttribute('data-id'); // Récupère l'ID du produit
        const produitNom = button.getAttribute('data-nom'); // Récupère le nom du produit
        const produitPrix = button.getAttribute('data-prix'); // Récupère le prix du produit
        const produitDescription = button.getAttribute('data-description'); // Récupère la description du produit
        const produitUrl = button.getAttribute('data-url'); // Récupère l'URL de l'image du produit
  
        const produit = {
          id: produitId,
          nom: produitNom,
          prix: produitPrix,
          description: produitDescription,
          url: produitUrl,
        };
  
        // Appelez la fonction pour ajouter au panier
        ajouterAuPanier(produit);
      });
    });
  });
  