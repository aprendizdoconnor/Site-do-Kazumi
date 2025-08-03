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

function renderizarJogos() {
  const cardsJogosContainer = document.querySelector(".cards-jogos");
  cardsJogosContainer.innerHTML = "";

  jogos.forEach(jogo => {
    const card = document.createElement("article");
    card.className = "card-jogo";
    card.tabIndex = 0;

    card.innerHTML = `
      <div class="card-jogo-img-container">
        <img src="${jogo.imagem}" alt="Imagem do jogo ${jogo.nome}" class="jogo-img" loading="lazy" />
      </div>
      <h3>${jogo.nome}</h3>
      <button class="btn-ver-ofertas" data-id="${jogo.id}">Ver Ofertas</button>
    `;

    cardsJogosContainer.appendChild(card);
  });

  document.querySelectorAll(".btn-ver-ofertas").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = `produtos.html?jogo=${btn.dataset.id}`;
    });
  });
}

renderizarJogos();