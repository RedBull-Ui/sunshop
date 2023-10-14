document.addEventListener('DOMContentLoaded', function () {

    ////////// la recherche ici ../////////


    // Définir une fonction pour gérer la recherche de produits
    // Définir une fonction pour gérer la recherche de produits
    function rechercherProduits() {
        const searchInput = document.getElementById('search-input');
        const searchInput2 = document.getElementById('search-input2');
        const productCards = document.querySelectorAll('.product-card');

        // Fonction pour gérer la recherche pour le premier champ
        searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();

            productCards.forEach((card) => {
                const productName = card.getAttribute('data-nom').toLowerCase();

                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Fonction pour gérer la recherche pour le second champ
        searchInput2.addEventListener('input', function () {
            const searchTerm2 = searchInput2.value.toLowerCase();

            productCards.forEach((card) => {
                const productName = card.getAttribute('data-nom').toLowerCase();

                if (productName.includes(searchTerm2)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Appeler la fonction de recherche de produits
    rechercherProduits();


    ////////// la recherche ici ../////////

    // ///////// ratio button ici //////
    // function ratio() {
    //     // Fonction pour filtrer les cartes en fonction de la catégorie sélectionnée
    //     function filtrerCartesParCategorie(categorie) {
    //         const productCards = document.querySelectorAll('.product-card');

    //         productCards.forEach((card) => {
    //             const cardCategorie = card.getAttribute('data-categorie').toLowerCase();

    //             if (categorie === 'tout' || cardCategorie.includes(categorie)) {
    //                 card.style.display = 'block';
    //             } else {
    //                 card.style.display = 'none';
    //             }
    //         });
    //     }
    // }


});


// Définir une fonction pour gérer l'état actif du menu
function gérerÉtatMenu() {
    // Déclaration de variable pour les éléments du menu (home, boutique, contact, apropos)
    var home = document.getElementById('home');
    var panier = document.getElementById('sac');
    var boutique = document.getElementById('boutique');
    var contact = document.getElementById('contact');
    var apropos = document.getElementById('apropos');

    // Gestion de l'état actif du menu en fonction de localStorage
    var state = localStorage.getItem('state');
    if (state == 'home') {
        home.classList.add('focus');
        boutique.classList.remove('focus');
        apropos.classList.remove('focus');
        contact.classList.remove('focus');
    }
    if (state == 'boutique') {
        boutique.classList.add('focus');
        home.classList.remove('focus');
        apropos.classList.remove('focus');
        contact.classList.remove('focus');
    }
    if (state == 'panier') {
        panier.classList.add('panier');

        boutique.classList.remove('focus');
        home.classList.remove('focus');
        apropos.classList.remove('focus');
        contact.classList.remove('focus');
    }
    if (state == 'contact') {
        contact.classList.add('focus');
        home.classList.remove('focus');
        apropos.classList.remove('focus');
        boutique.classList.remove('focus');
    }
    if (state == 'apropos') {
        apropos.classList.add('focus');

        boutique.classList.remove('focus');
        home.classList.remove('focus');
        contact.classList.remove('focus');
    }
}

// Attacher la fonction gérerÉtatMenu à l'événement DOMContentLoaded
document.addEventListener('DOMContentLoaded', gérerÉtatMenu);



function boutique() {
    window.location.href = '/boutique'
}
// Toggle the burger menu on click


// Obtenir les éléments du DOM
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('me');
const closeButton = document.getElementById('close');
var burger = document.getElementById('burger-menu');


// Ajouter un gestionnaire d'événements pour le clic sur le bouton du menu hamburger
menu.addEventListener('click', () => {
    burger.style.display = "block";

});

// Ajouter un gestionnaire d'événements pour le clic sur le bouton de fermeture
closeButton.addEventListener('click', () => {
    burger.style.display = "none";

});
function menuOnclick() {

}




