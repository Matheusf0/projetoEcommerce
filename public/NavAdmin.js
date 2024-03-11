let cartItems = [];
let total = 0;

function toggleNav() {
  const cart = document.getElementById('cart');
  if (cart.style.width === '250px') {
    cart.style.width = '0';
    document.querySelector('.content').style.marginRight = '0';
  } else {
    cart.style.width = '250px';
    document.querySelector('.content').style.marginRight = '250px';
  }
}

function addToCart(product) {
  cartItems.push(product);
  total += product.price;
  updateCartUI();
}

function updateCartUI() {
  const cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name + ' - R$ ' + item.price.toFixed(2);
    cartItemsElement.appendChild(li);
  });
  document.getElementById('total').textContent = 'Total: R$ ' + total.toFixed(2);
}

// Exemplo de uso
addToCart({ name: 'Produto 1', price: 10.99 });
addToCart({ name: 'Produto 2', price: 19.99 });
addToCart({ name: 'Produto 2', price: 19.99 });
addToCart({ name: 'Produto 4', price: 15.99 });

function enviarPedidoViaWhatsApp(numero) {
    // Coletar os detalhes do pedido
    const itensDoCarrinho = document.querySelectorAll("#cart-items li");
    const total = document.getElementById("total").innerText;

    let mensagem = "Pedido:\n";
    itensDoCarrinho.forEach(item => {
        const nome = item.textContent.split(' - ')[0]; // Obtém apenas o nome do produto
        const preco = item.textContent.split(' - ')[1]; // Obtém apenas o preço do produto
        mensagem += `${nome}: ${preco}\n`;
    });
    mensagem += `Total: ${total}`;

    // Formatar a mensagem para a URL do WhatsApp
    const mensagemFormatada = encodeURIComponent(mensagem);

    // Verificar se o usuário está em um dispositivo móvel
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let whatsappURL = '';
    if (isMobileDevice) {
        // Abrir o aplicativo do WhatsApp com a mensagem preenchida e o número especificado
        whatsappURL = `whatsapp://send?phone=${numero}&text=${mensagemFormatada}`;
    } else {
        // Abrir o WhatsApp Web com a mensagem preenchida
        whatsappURL = `https://web.whatsapp.com/send?phone=${numero}&text=${mensagemFormatada}`;
    }

    // Abrir o WhatsApp com o número especificado e a mensagem preenchida
    window.open(whatsappURL, '_blank');
}