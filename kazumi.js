const produtos = [
  { nome: "10 Tokens", preco: "R$ 30,00", img: "https://i.imgur.com/fBJlCeO.png" },
  { nome: "20 Tokens", preco: "R$ 60,00", img: "https://i.imgur.com/zZGs3dN.png" },
  { nome: "25 Tokens", preco: "R$ 75,00", img: "https://i.imgur.com/RKnfX8D.png" },
  { nome: "35 Tokens", preco: "R$ 100,00", img: "https://i.imgur.com/fBJlCeO.png" }
];


const container = document.getElementById("produtos-lista");
produtos.forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("produto-card");
  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.nome}">
    <h3>${prod.nome}</h3>
    <p>${prod.preco}</p>
    <button>Comprar</button>
  `;
  container.appendChild(card);
});


function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}
