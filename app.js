// --- Age Verification Modal ---
document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const modal = document.getElementById('age-modal');
    const errorMsg = document.getElementById('age-error');
    const mainContent = document.getElementById('main-content');

    // Check if user already verified
    if (localStorage.getItem('ageVerified') === 'true') {
        modal.style.display = 'none';
        mainContent.classList.remove('content-blurred');
    }

    btnYes.addEventListener('click', () => {
        localStorage.setItem('ageVerified', 'true');
        modal.style.display = 'none';
        mainContent.classList.remove('content-blurred');
    });

    btnNo.addEventListener('click', () => {
        errorMsg.classList.remove('hidden');
    });

    // --- Cart Logic ---
    let cart = JSON.parse(localStorage.getItem('venusCart')) || [];
    
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const addCartBtns = document.querySelectorAll('.btn-add-cart');

    // Store WhatsApp Number (Example)
    const STORE_WHATSAPP = '5541999999999'; // Replace with real number

    function updateCartUI() {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Seu carrinho está vazio.</div>';
            cartTotalPrice.textContent = 'R$ 0,00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.quantity}x R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-remove" data-index="${index}"><i class="ph ph-trash"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        // Add event listeners to remove buttons
        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.currentTarget.getAttribute('data-index');
                cart.splice(index, 1);
                saveCart();
                updateCartUI();
            });
        });
    }

    function saveCart() {
        localStorage.setItem('venusCart', JSON.stringify(cart));
    }

    function toggleCart() {
        cartDrawer.classList.toggle('open');
        cartOverlay.classList.toggle('active');
    }

    // Add to cart
    addCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            saveCart();
            updateCartUI();
            toggleCart(); // Open drawer on add
        });
    });

    // Checkout via WhatsApp
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return alert('Seu carrinho está vazio!');

        let message = 'Olá! Gostaria de finalizar o meu pedido na Segredos de Vênus:\n\n';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `- ${item.quantity}x ${item.name} (R$ ${itemTotal.toFixed(2).replace('.', ',')})\n`;
        });

        message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Optional: clear cart after checkout redirect
        // cart = [];
        // saveCart();
        // updateCartUI();
    });

    // Event Listeners for Cart drawer
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // --- Mobile Menu ---
    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', () => {
        const categories = document.querySelector('.category-circles');
        if (categories) {
            categories.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // --- Carousel Dots ---
    const carousels = document.querySelectorAll('.products-carousel');
    carousels.forEach(carousel => {
        const cards = carousel.querySelectorAll('.product-card');
        const numDots = cards.length;
        if (numDots <= 1) return;

        // Create dots container
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        carousel.parentNode.insertBefore(dotsContainer, carousel.nextSibling);

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                const scrollLeft = cards[i].offsetLeft - carousel.offsetLeft;
                carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            });
            dotsContainer.appendChild(dot);
        }

        // Update active dot on scroll
        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const centerPosition = scrollLeft + (carousel.offsetWidth / 2);
            
            let activeIndex = 0;
            let minDistance = Infinity;

            cards.forEach((card, index) => {
                const cardCenter = (card.offsetLeft - carousel.offsetLeft) + (card.offsetWidth / 2);
                const distance = Math.abs(centerPosition - cardCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });
            
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    });

    // Initial render
    updateCartUI();
});
