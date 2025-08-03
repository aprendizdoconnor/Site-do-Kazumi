const jogos = [
  {
    id: "bladeball",
    nome: "Blade Ball",
    imagem: "imagens/capa.png",
    tokens: [
      { id: "100tokens", nome: "100 Tokens", preco: 2.20, img: "imagens/Trade.png" },
      { id: "200tokens", nome: "200 Tokens", preco: 4.40, img: "imagens/Trade.png" },
      { id: "300tokens", nome: "300 Tokens", preco: 6.60, img: "imagens/Trade.png" },
      { id: "400tokens", nome: "400 Tokens", preco: 8.80, img: "imagens/Trade.png" },
      { id: "500tokens", nome: "500 Tokens", preco: 11.0, img: "imagens/Trade.png" },
      { id: "600tokens", nome: "600 Tokens", preco: 13.20, img: "imagens/Trade.png" },
      { id: "700tokens", nome: "700 Tokens", preco: 15.40, img: "imagens/Trade.png" },
      { id: "800tokens", nome: "800 Tokens", preco: 17.60, img: "imagens/Trade.png" },
      { id: "900tokens", nome: "900 Tokens", preco: 19.80, img: "imagens/Trade.png" },
      { id: "1000tokens", nome: "1000 Tokens", preco: 22.0, img: "imagens/Trade.png" },
    ],
  },
];

const urlParams = new URLSearchParams(window.location.search);
const jogoId = urlParams.get("jogo");

const jogoSelecionado = jogos.find(j => j.id === jogoId);
const cardsTokensContainer = document.querySelector(".cards-tokens");
const tituloJogo = document.getElementById("tituloJogo");

const state = {
  carrinho: [],
};

const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeCartBtn = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const pixModal = document.getElementById("pixModal");
const closePixBtn = document.getElementById("closePixBtn");
const copyPixBtn = document.getElementById("copyPixBtn");
const pixKeyElement = document.getElementById("pixKey");

function formatarPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function renderizarTokens() {
  if (!jogoSelecionado) {
    tituloJogo.textContent = "Jogo não encontrado!";
    cardsTokensContainer.innerHTML = "<p>Nenhum produto disponível.</p>";
    return;
  }

  tituloJogo.textContent = `Ofertas de ${jogoSelecionado.nome}`;
  cardsTokensContainer.innerHTML = "";

  jogoSelecionado.tokens.forEach(token => {
    const card = document.createElement("article");
    card.className = "card-token";
    card.tabIndex = 0;

    card.innerHTML = `
      <img src="${token.img}" alt="${token.nome}" class="token-img" />
      <h4>${token.nome}</h4>
      <p class="preco">${formatarPreco(token.preco)}</p>
      <button class="btn-comprar" data-token="${token.id}">Comprar</button>
    `;

    cardsTokensContainer.appendChild(card);
  });

  document.querySelectorAll(".btn-comprar").forEach(btn => {
    btn.addEventListener("click", () => {
      adicionarAoCarrinho(btn.dataset.token);
    });
  });
}

function adicionarAoCarrinho(idToken) {
  const token = jogoSelecionado.tokens.find(t => t.id === idToken);
  if (!token) return;

  const itemIndex = state.carrinho.findIndex(item => item.idToken === idToken);
  if (itemIndex > -1) {
    state.carrinho[itemIndex].quantidade++;
  } else {
    state.carrinho.push({
      idToken,
      nome: token.nome,
      preco: token.preco,
      quantidade: 1,
    });
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  cartItems.innerHTML = "";

  if (state.carrinho.length === 0) {
    cartItems.innerHTML = "<li>Carrinho vazio</li>";
    checkoutBtn.disabled = true;
    cartSubtotal.textContent = formatarPreco(0);
    cartTotal.textContent = formatarPreco(0);
    cartCount.textContent = 0;
    return;
  }

  let subtotal = 0;
  state.carrinho.forEach(item => {
    subtotal += item.preco * item.quantidade;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.nome} x${item.quantidade}</span>
      <span>
        ${formatarPreco(item.preco * item.quantidade)}
        <button class="remove-item" aria-label="Remover ${item.nome}">&times;</button>
      </span>
    `;

    li.querySelector(".remove-item").addEventListener("click", () => {
      removerDoCarrinho(item.idToken);
    });

    cartItems.appendChild(li);
  });

  cartSubtotal.textContent = formatarPreco(subtotal);
  cartTotal.textContent = formatarPreco(subtotal);
  checkoutBtn.disabled = false;
  cartCount.textContent = state.carrinho.reduce((acc, cur) => acc + cur.quantidade, 0);
}

function removerDoCarrinho(idToken) {
  const index = state.carrinho.findIndex(item => item.idToken === idToken);
  if (index > -1) {
    state.carrinho.splice(index, 1);
    atualizarCarrinho();
  }
}

cartBtn.addEventListener("click", () => {
  cart.setAttribute("aria-hidden", "false");
  if(overlay) overlay.style.display = "block";
});
closeCartBtn.addEventListener("click", fecharCarrinho);
if(overlay) overlay.addEventListener("click", fecharCarrinho);

function fecharCarrinho() {
  cart.setAttribute("aria-hidden", "true");
  if(overlay) overlay.style.display = "none";
}

checkoutBtn.addEventListener("click", () => {
  if (state.carrinho.length === 0) return;
  pixModal.classList.add("active");
  pixModal.style.display = "flex";
  copyPixBtn.focus();
});

closePixBtn.addEventListener("click", () => {
  pixModal.classList.remove("active");
  pixModal.style.display = "none";
});

pixModal.addEventListener("click", (e) => {
  if (e.target === pixModal) {
    pixModal.classList.remove("active");
    pixModal.style.display = "none";
  }
});

copyPixBtn.addEventListener("click", () => {
  const chave = pixKeyElement.textContent.trim();
  navigator.clipboard.writeText(chave).then(() => {
    copyPixBtn.textContent = "Copiado!";
    setTimeout(() => {
      copyPixBtn.textContent = "Copiar";
    }, 2000);
  }).catch(() => {
    alert("Erro ao copiar a chave Pix. Por favor, copie manualmente.");
  });
});

renderizarTokens();
atualizarCarrinho();