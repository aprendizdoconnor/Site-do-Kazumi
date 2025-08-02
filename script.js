const produtos = [
  { nome: "10 Tokens", preco: 30.0, precoFormat: "R$ 30,00", img: "imagens/Trade.png" },
  { nome: "20 Tokens", preco: 60.0, precoFormat: "R$ 60,00", img: "imagens/Trade.png" },
  { nome: "25 Tokens", preco: 75.0, precoFormat: "R$ 75,00", img: "imagens/Trade.png" },
  { nome: "35 Tokens", preco: 100.0, precoFormat: "R$ 100,00", img: "imagens/Trade.png" },
];

const container = document.getElementById("produtos-lista");
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkoutBtn");
const toast = document.getElementById("toast");
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.getElementById("menu");

let cartItems = [];

function renderProdutos() {
  container.innerHTML = "";
  produtos.forEach((prod, index) => {
    const card = document.createElement("div");
    card.classList.add("produto-card");
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.nome}" loading="lazy" />
      <h3>${prod.nome}</h3>
      <p>${prod.precoFormat}</p>
      <button data-index="${index}">Comprar</button>
    `;
    container.appendChild(card);
  });
}

function updateCartUI() {
  cartItemsList.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = `<li>Seu carrinho está vazio.</li>`;
    cartCount.textContent = 0;
    cartTotal.textContent = "R$ 0,00";
    checkoutBtn.disabled = true;
    return;
  }

  cartItems.forEach((item, idx) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} <span>${item.precoFormat}</span>
      <button aria-label="Remover ${item.nome}" class="remove-btn" data-idx="${idx}">×</button>
    `;
    cartItemsList.appendChild(li);
  });

  cartCount.textContent = cartItems.length;
  cartTotal.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  checkoutBtn.disabled = false;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.idx;
      cartItems.splice(idx, 1);
      updateCartUI();
      showToast("Item removido do carrinho.");
    });
  });
}

function addToCart(index) {
  const prod = produtos[index];
  cartItems.push(prod);
  updateCartUI();
  showToast(`Adicionado: ${prod.nome}`);
}

function toggleCart() {
  const isOpen = cart.classList.contains("open");
  cart.classList.toggle("open", !isOpen);
  cart.setAttribute("aria-hidden", isOpen ? "true" : "false");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

const particleConfigs = {
  dark: {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#ffcc00" },
      opacity: { value: 0.25, random: false },
      size: { value: 3, random: true },
      links: {           
        enable: true,
        distance: 120,
        color: "#ffcc00",
        opacity: 0.2,
        width: 1
      },
      move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  }
};

function setParticlesContainerSize() {
  const particlesDiv = document.getElementById("particles-js");
  if (particlesDiv) {
    particlesDiv.style.width = window.innerWidth + "px";
    particlesDiv.style.height = window.innerHeight + "px";
  }
}

function loadParticles() {
  setParticlesContainerSize();

  if (window.pJSDom && window.pJSDom.length) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
  particlesJS("particles-js", particleConfigs.dark);
}

function toggleMenu() {
  navMenu.classList.toggle("open");
  menuBtn.classList.toggle("open");
}


function addPixStyles() {
  if (document.getElementById("pix-style")) return; 

  const style = document.createElement("style");
  style.id = "pix-style";
  style.textContent = `
    
    #pixPanel {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      z-index: 2000;
      font-family: 'Poppins', sans-serif;
      padding: 20px;
      box-sizing: border-box;
      animation: fadeIn 0.3s ease;
    }

    
    #pixPanel .content {
      background: linear-gradient(145deg, #1c1c1c, #2a2a2a);
      padding: 35px 30px;
      border-radius: 16px;
      text-align: center;
      max-width: 460px;
      width: 100%;
      box-shadow: 0 0 25px rgba(255, 204, 0, 0.25);
      animation: slideUp 0.35s ease;
      border: 1px solid rgba(255, 204, 0, 0.1);
    }

    #pixPanel h2 {
      color: #ffcc00;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 1.8rem;
    }

    #pixPanel p {
      font-size: 1.05rem;
      margin: 10px 0;
      color: #ddd;
    }

    
    #pixPanel #pixKey {
      background: #111;
      color: #ffcc00;
      padding: 14px;
      border-radius: 10px;
      margin: 20px 0;
      font-family: monospace;
      font-size: 1.15rem;
      user-select: all;
      word-break: break-all;
      border: 1px solid rgba(255, 204, 0, 0.2);
      box-shadow: 0 0 12px rgba(255, 204, 0, 0.15) inset;
    }

    
    #pixPanel button {
      padding: 12px 25px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 700;
      margin: 12px 8px 0 8px;
      transition: all 0.25s ease;
      font-size: 1rem;
    }
    #pixPanel #copiarPix {
      background: #ffcc00;
      color: #000;
    }
    #pixPanel #copiarPix:hover {
      background: #ffd633;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 204, 0, 0.4);
    }
    #pixPanel #fecharPix {
      background: #444;
      color: #fff;
    }
    #pixPanel #fecharPix:hover {
      background: #555;
      transform: translateY(-2px);
    }

    /* Animações */
    @keyframes fadeIn {
      from {opacity: 0;} 
      to {opacity: 1;}
    }
    @keyframes slideUp {
      from {transform: translateY(30px); opacity:0;}
      to {transform: translateY(0); opacity:1;}
    }
  `;
  document.head.appendChild(style);
}



function checkout() {
  if (cartItems.length === 0) {
    showToast("Seu carrinho está vazio.");
    return;
  }

  addPixStyles(); 

  const total = cartTotal.textContent;
  const chavePix = "77cec2c4-5ad1-4568-ab1c-6b1143f50794";

  
  const pagamentoDiv = document.createElement("div");
  pagamentoDiv.id = "pixPanel";
  pagamentoDiv.innerHTML = `
    <div class="content" role="dialog" aria-modal="true" aria-labelledby="pixTitle">
      <h2 id="pixTitle">Pagamento via Pix</h2>
      <p>Total da Compra: <strong style="color:#0f0;">${total}</strong></p>
      <p>Use esta chave Pix aleatória:</p>
      <p id="pixKey">${chavePix}</p>
      <button id="copiarPix" type="button">Copiar Chave Pix</button>
      <button id="fecharPix" type="button">Fechar</button>
    </div>
  `;
  document.body.appendChild(pagamentoDiv);

  document.getElementById("copiarPix").addEventListener("click", () => {
    navigator.clipboard.writeText(chavePix).then(() => alert("Chave Pix copiada!"));
  });

  document.getElementById("fecharPix").addEventListener("click", () => {
    pagamentoDiv.remove();
  });

  // Limpa carrinho
  cartItems = [];
  updateCartUI();
  toggleCart();
}

window.addEventListener("resize", () => {
  setParticlesContainerSize();
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("dark"); 
  renderProdutos();
  updateCartUI();
  loadParticles(); 

  container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.dataset.index !== undefined) {
      addToCart(Number(e.target.dataset.index));
    }
  });

  cartBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  checkoutBtn.addEventListener("click", checkout);

  document.addEventListener("click", e => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuBtn.classList.remove("open");
    }
  });
});
