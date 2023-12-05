document.addEventListener('DOMContentLoaded', function () {

  window.swipe = function() {
    // Récupérez le tableau panier depuis le localStorage
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
  
    // Vérifie si le panier est vide
    if (panier.length === 0) {
      
      console.log('Le panier est vide.');
      return alert('Le panier est vide.')
    } else {
      // Effectuez une action si le panier n'est pas vide
      console.log('Le panier n\'est pas vide.');
      // Ajoutez ici le code pour rediriger seulement lorsque le panier n'est pas vide
      window.location.href = '/regler';
    }
  }

  const totalSpan = document.querySelector('.total-span');
  let panier = [];

  // Vérifie si localStorage est disponible
  if (typeof localStorage !== 'undefined') {
    // Obtenez le tableau panier depuis le localStorage
    panier = JSON.parse(localStorage.getItem('panier')) || [];

    // Affichez les produits et calculez le total
    afficherProduitsEtTotal(panier);

    // Ajoutez un gestionnaire d'événements de clic à chaque icône de corbeille
    ajouterGestionnaireEffacer();

    // ... Votre code existant

  } else {
    // Gérez le cas où localStorage n'est pas disponible
    localStorage.setItem('pointRouge', 'off');
    pointRouge.style.display = 'none';
    console.error('localStorage is not available.');
  }
});

function calculerTotal(panier) {
  if (panier.length === 0) {
    return 0;
  }

  let totalPrix = 0;

  panier.forEach((produit) => {
    totalPrix += parseFloat(produit.prix.replace(/\s/g, '').replace(',', '.'));
  });

  return totalPrix + 1000;
}


function afficherProduitsEtTotal(panier) {
  const container = document.querySelector('.row');
  const totalSpan = document.querySelector('.total-span');

  // Vide le contenu du conteneur avant d'afficher les produits
  container.innerHTML = '';

  // Parcourez les produits dans le panier et affichez-les
  panier.forEach((produit) => {
    const card = creerCarteProduit(produit);
    container.appendChild(card);
  });

  // Ajoutez 1000 au total
  let totalPrix = 0;
  panier.forEach((produit) => {
    totalPrix += parseFloat(produit.prix.replace(/\s/g, '').replace(',', '.'));
  });
  totalPrix += 1000;

  // Mettez à jour le total affiché dans le DOM
  if (totalSpan) {
    const totalPrix = calculerTotal(panier);
    totalSpan.textContent = `Total: ${totalPrix.toFixed(2)} CFA`; // Arrondir à 2 décimales
  }
}


function creerCarteProduit(produit) {
  const card = document.createElement('div');
  card.className = 'col-md-3';
  card.innerHTML = `
    <div class="carte shadow-sm">
      <div class="cardTop">
        <img src="${produit.url}" alt="${produit.nom}">
      </div>
      <div class="cardBottom">
        <h6><strong>${produit.nom}</strong></h6>
        
        <div class="cardFooter">
          <div class="prix-quantite">
            <!-- Affichage du prix -->
            <p class="prix">${produit.prix} CFA</p>
            <!-- Menu déroulant pour la quantité -->
            <select name="quantite" id="quantite">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <!-- Bouton "Supprimer" minimaliste avec data-product-id -->
          <br>
          <i class="fas fa-trash-alt supprimer" data-product-id="${produit.id}"></i>
        </div>
      </div>
    </div>
  `;
  return card;
}

function ajouterGestionnaireEffacer() {
  // Sélectionnez tous les éléments ayant la classe "fa-trash-alt"
  const trashIcons = document.querySelectorAll('.fa-trash-alt');

  // Retirez tous les gestionnaires d'événements existants
  trashIcons.forEach((icon) => {
    icon.removeEventListener('click', handleClick);
  });

  // Ajoutez un gestionnaire d'événements de clic à chaque icône de corbeille
  trashIcons.forEach((icon) => {
    icon.addEventListener('click', handleClick);
  });

  // Définition du gestionnaire d'événements de clic
  function handleClick(event) {
    const productId = event.target.getAttribute('data-product-id');

    // Récupérez le tableau panier depuis le localStorage
    let panier = JSON.parse(localStorage.getItem('panier')) || [];

    const productIndex = panier.findIndex((produit) => produit.id === productId);

    if (productIndex !== -1) {
      panier.splice(productIndex, 1);
      localStorage.setItem('panier', JSON.stringify(panier));
      afficherProduitsEtTotal(panier);
      ajouterGestionnaireEffacer(); // Recharge les gestionnaires d'événements
    }
  }
}


