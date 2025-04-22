let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function removerDoCarrinho(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("itens-carrinho");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - Quantidade: ${item.quantidade} - Total: R$ ${(item.preco * item.quantidade).toFixed(2)}`;
    lista.appendChild(li);
    total += item.preco * item.quantidade;
  });

  document.getElementById("total").textContent = total.toFixed(2);
}

function finalizarCompra() {
  if (carrinho.length === 0) return;
  carrinho = [];
  localStorage.removeItem("carrinho");
  atualizarCarrinho();
  alert("Compra finalizada com sucesso!");
}

document.addEventListener("DOMContentLoaded", atualizarCarrinho);
