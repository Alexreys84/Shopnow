// Lista de produtos
const produtos = [
    { id: 1, nome: "Produto 1", preco: 50.00, img: "img/produto1.webp" },
    { id: 2, nome: "Produto 2", preco: 75.00, img: "img/produto2.webp" },
    { id: 3, nome: "Produto 3", preco: 100.00, img: "img/produto3.jpeg" }
];

// Carrinho de compras
let carrinho = [];

// Função para carregar os produtos na página
function carregarProdutos() {
    let lista = document.getElementById("lista-produtos");
    lista.innerHTML = ""; // Limpa a lista antes de carregar os produtos

    produtos.forEach(produto => {
        let card = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${produto.img}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${produto.nome}</h5>
                        <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                    </div>
                </div>
            </div>
        `;
        lista.innerHTML += card; // Adiciona o card do produto à lista
    });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(id) {
    let produto = produtos.find(p => p.id === id); // Encontra o produto pelo ID
    if (produto) {
        carrinho.push(produto); // Adiciona o produto ao carrinho
        atualizarCarrinho(); // Atualiza a exibição do carrinho
        atualizarContadorCarrinho(); // Atualiza o contador do carrinho
    }
}

// Função para atualizar o contador do carrinho
function atualizarContadorCarrinho() {
    let contador = document.getElementById("carrinho-contador");
    contador.textContent = carrinho.length; // Atualiza o número de itens no carrinho
}

// Função para calcular o total do carrinho
function calcularTotal() {
    let total = carrinho.reduce((acc, item) => acc + item.preco, 0); // Soma os preços dos itens
    document.getElementById("total-carrinho").textContent = `R$ ${total.toFixed(2)}`; // Atualiza o total
}

// Função para limpar o carrinho
function limparCarrinho() {
    carrinho = []; // Remove todos os itens do carrinho
    atualizarCarrinho(); // Atualiza a exibição do carrinho
    atualizarContadorCarrinho(); // Atualiza o contador
    calcularTotal(); // Atualiza o total
}

// Função para atualizar a exibição do carrinho no modal
function atualizarCarrinho() {
    let lista = document.getElementById("itens-carrinho");
    lista.innerHTML = ""; // Limpa a lista antes de atualizar

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${item.img}" alt="${item.nome}" class="img-thumbnail me-3">
                <div>
                    <h6 class="mb-0">${item.nome}</h6>
                    <small>R$ ${item.preco.toFixed(2)}</small>
                </div>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${index})">X</button>
        `;
        lista.appendChild(li); // Adiciona o item à lista do carrinho
    });

    calcularTotal(); // Atualiza o total sempre que o carrinho é atualizado
}

// Função para remover um item do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1); // Remove o item do carrinho
    atualizarCarrinho(); // Atualiza a exibição do carrinho
    atualizarContadorCarrinho(); // Atualiza o contador
    calcularTotal(); // Atualiza o total
}

// Carrega os produtos quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarProdutos);
