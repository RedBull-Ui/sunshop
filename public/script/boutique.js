document.addEventListener('DOMContentLoaded', () => {
  const boutonsAjouterAuPanier = document.querySelectorAll('.ajouter-au-panier');

  boutonsAjouterAuPanier.forEach((bouton) => {
    bouton.addEventListener('click', () => {
      const id = bouton.dataset.id;
      const nom = bouton.dataset.nom;
      const prix = bouton.dataset.prix;
      const description = bouton.dataset.desc;
      const url = bouton.dataset.url;

      // Récupère le panier depuis le localStorage
      const panier = JSON.parse(localStorage.getItem('panier')) || [];

      // Vérifie si le produit avec le même ID existe déjà dans le panier
      const produitExiste = panier.some((produit) => produit.id === id);

      if (produitExiste) {
        alert('Ce produit est déjà ajouté au panier.');
        return;
      }

      // Ajoute le produit au panier
      panier.push({ id, nom, prix, description, url });

      // Enregistre le panier mis à jour dans le localStorage
      localStorage.setItem('panier', JSON.stringify(panier));

      console.log('Produit ajouté au panier !', panier);
    });
  });
});
