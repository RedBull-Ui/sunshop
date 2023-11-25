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
        alert('Déjà ajouté au panier.');
        return;
      }else{
        // Ajoute le produit au panier
      panier.push({ id, nom, prix, description, url });

      // Enregistre le panier mis à jour dans le localStorage
      localStorage.setItem('panier', JSON.stringify(panier));

      localStorage.setItem('pointRouge','on')
      alert('Produit ajouté au panier !');
      mettreAJourPointRouge();
      }

      
    });
  });

  function mettreAJourPointRouge() {
    const pointRouge = document.getElementById('point-rouge');
  
    // Vérifiez si localStorage est disponible
    if (typeof localStorage !== 'undefined') {
      // Récupère le panier depuis le localStorage
      const panier = JSON.parse(localStorage.getItem('panier')) || [];
  
      // Vérifie si le panier n'est pas vide
      if (panier.length > 0) {
        // Mettez 'pointRouge' sur 'on' et affichez l'élément
        localStorage.setItem('pointRouge', 'on');
        pointRouge.style.display = 'block';
      } else {
        // Aucun produit trouvé, mettez 'pointRouge' sur 'off' et masquez l'élément
        localStorage.setItem('pointRouge', 'off');
        pointRouge.style.display = 'none';
      }
    } else {
      // Gérez le cas où localStorage n'est pas disponible
      localStorage.setItem('pointRouge', 'off');
      pointRouge.style.display = 'none';
      console.error('localStorage is not available.');
    }
  }
  
  
});
