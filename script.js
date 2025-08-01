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
const darkModeToggle = document.getElementById("darkModeToggle");
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
  },

  light: {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#555555" },
      opacity: { value: 0.4, random: false },  // aumentei a opacidade para melhor visibilidade
      size: { value: 3, random: true },
      links: {
        enable: true,
        distance: 130,
        color: "#555555",
        opacity: 0.25,
        width: 1
      },
      move: { enable: true, speed: 1.2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
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

function loadParticles(theme) {
  setParticlesContainerSize();

  if (window.pJSDom && window.pJSDom.length) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
  particlesJS("particles-js", particleConfigs[theme]);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  loadParticles(isDark ? "dark" : "light");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark", isDark);
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";

  loadParticles(isDark ? "dark" : "light");
}

function toggleMenu() {
  navMenu.classList.toggle("open");
  menuBtn.classList.toggle("open");
}

function checkout() {
  if (cartItems.length === 0) {
    showToast("Seu carrinho está vazio.");
    return;
  }
  showToast(`Compra finalizada! Total: ${cartTotal.textContent}`);
  cartItems = [];
  updateCartUI();
  toggleCart();
}

window.addEventListener("resize", () => {
  setParticlesContainerSize();
});

document.addEventListener("DOMContentLoaded", () => {
  renderProdutos();
  updateCartUI();
  loadTheme();

  container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.dataset.index !== undefined) {
      addToCart(Number(e.target.dataset.index));
    }
  });

  cartBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);
  darkModeToggle.addEventListener("click", toggleDarkMode);
  menuBtn.addEventListener("click", toggleMenu);
  checkoutBtn.addEventListener("click", checkout);

  document.addEventListener("click", e => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target) && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuBtn.classList.remove("open");
    }
  });
});
