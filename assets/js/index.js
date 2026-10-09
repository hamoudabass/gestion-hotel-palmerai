
// --- CONFIGURATION ---
// Remplacez ce numéro par le vôtre (format international sans le +, ex: 25377XXXXXX)
const WHATSAPP_NUMBER = "25377222819"; 

// Panier (objet pour stocker les articles)
let cart = {};

// Fonction pour ajouter un article au panier
function addToCart(button) {
    const itemElement = button.closest('.menu-item');
    const id = itemElement.dataset.id;
    const name = itemElement.dataset.name;
    const price = parseInt(itemElement.dataset.price);

    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        cart[id] = {
            name: name,
            price: price,
            quantity: 1
        };
    }

    updateCartUI();
}

// Fonction pour mettre à jour l'interface du panier
function updateCartUI() {
    const cartBar = document.getElementById('cart-bar');
    const totalElement = document.getElementById('cart-total');
    const previewElement = document.getElementById('cart-items-preview');

    let total = 0;
    let itemCount = 0;
    let previewText = [];

    for (let id in cart) {
        const item = cart[id];
        total += item.price * item.quantity;
        itemCount += item.quantity;
        previewText.push(`${item.quantity}x ${item.name}`);
    }

    // Mettre à jour le total
    totalElement.textContent = `Total: ${total.toLocaleString('fr-FR')} FDJ`;
    
    // Mettre à jour l'aperçu
    if (itemCount > 0) {
        previewElement.textContent = previewText.join(', ');
        cartBar.classList.add('active');
    } else {
        previewElement.textContent = "Aucun article";
        cartBar.classList.remove('active');
    }
}

// Fonction pour envoyer la commande sur WhatsApp
function sendOrderToWhatsApp() {
    let message = "Bonjour Hôtel Palmersaie, je souhaite passer une commande :\n\n";
    let total = 0;

    for (let id in cart) {
        const item = cart[id];
        const subTotal = item.price * item.quantity;
        message += `▪️ ${item.quantity}x ${item.name} (${subTotal.toLocaleString('fr-FR')} FDJ)\n`;
        total += subTotal;
    }

    message += `\n*Total de la commande : ${total.toLocaleString('fr-FR')} FDJ*`;
    message += `\n\nMerci de me confirmer la disponibilité.`;

    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Créer le lien WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank');
}
