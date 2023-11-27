document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.row');

  var pointRouge = document.getElementById('point-rouge');

  // Vérifie si localStorage est disponible
if (typeof localStorage !== 'undefined') {
  // Obtenez le tableau panier depuis le localStorage
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  // Parcourez les produits dans le panier et affichez-les
  panier.forEach((produit) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
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
            <!-- Bouton "Supprimer" minimaliste avec data-product-id --> <br>
            <i class="fas fa-trash-alt supprimer" onclick="effacer()" data-product-id="${produit.id}"></i>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Si des produits ont été trouvés, mettez 'pointRouge' sur 'on' et affichez l'élément
  if (panier.length > 0) {
    localStorage.setItem('pointRouge', 'on');
    pointRouge.style.display = 'block';
    mettreAJourPointRouge();
  } else {
    // Aucun produit trouvé, mettez 'pointRouge' sur 'off' et masquez l'élément
    localStorage.setItem('pointRouge', 'off');
    pointRouge.style.display = 'none';
    mettreAJourPointRouge();
  }
} else {
  // Gérez le cas où localStorage n'est pas disponible
  localStorage.setItem('pointRouge', 'off');
  pointRouge.style.display = 'none';
  console.error('localStorage is not available.');
}

 })

function mettreAJourPointRouge() {
  const pointRouge = document.getElementById('point-rouge');

  // Vérifiez si localStorage est disponible
  if (typeof localStorage !== 'undefined') {
    // Parcourez les clés du localStorage pour vérifier s'il y a des produits
    let produitFound = false;

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('produit_')) {
        produitFound = true;
        return; // Sortez de la boucle dès qu'un produit est trouvé
      }
    });

    // Si un produit a été trouvé, mettez 'pointRouge' sur 'on' et affichez l'élément
    if (produitFound) {
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

function effacer() {
  // Sélectionnez tous les éléments ayant la classe "fa-trash-alt"
  const trashIcons = document.querySelectorAll('.fa-trash-alt');

  // Retirez d'abord tous les gestionnaires d'événements existants pour éviter les doublons
  trashIcons.forEach((icon) => {
    icon.removeEventListener('click', handleClick);
  });

  // Ajoutez un gestionnaire d'événements de clic à chaque icône de corbeille
  trashIcons.forEach((icon) => {
    icon.addEventListener('click', handleClick);
  });

  // Définition du gestionnaire d'événements de clic
  function handleClick(event) {
    // Récupérez l'ID du produit associé à l'icône
    const productId = event.target.getAttribute('data-product-id');
  
    // Obtenez le tableau panier depuis le localStorage
    const panier = JSON.parse(localStorage.getItem('panier')) || [];
  
    // Recherchez l'index du produit dans le panier en utilisant son ID
    const productIndex = panier.findIndex((produit) => produit.id === productId);
  
    // Vérifiez si le produit a été trouvé dans le panier
    if (productIndex !== -1) {
      // Supprimez le produit du panier
      panier.splice(productIndex, 1);
  
      // Mettez à jour le localStorage avec le nouveau panier
      localStorage.setItem('panier', JSON.stringify(panier));
    }
  
    // Cachez l'élément parent (la carte de produit) en utilisant display: none
    const productCard = event.target.closest('.card');
    if (productCard) {
      productCard.style.display = 'none';
  
      // Mettez à jour le point rouge après la suppression du produit
      mettreAJourPointRouge();
    }
  }
  
}


function swipe() {
  // Récupérez le tableau panier depuis le localStorage
  const panier = JSON.parse(localStorage.getItem('panier')) || [];

  // Vérifie si le panier est vide
  if (panier.length === 0) {
    // Effectuez une action si le panier est vide
    var notif = document.getElementById('notif');
    notif.innerText = '🍃 Panier vide !';
    console.log('Le panier est vide.');
  } else {
    // Effectuez une action si le panier n'est pas vide
    var notif = document.getElementById('notif');
    notif.innerText = '';
    window.location.href = '/regler';
    console.log('Le panier n\'est pas vide.');
  }
}

