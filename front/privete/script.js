function calculateTotal() {
    const ticketPrice = 100.00;
    const quantity = document.getElementById('ticketQuantity').value;
    const totalPrice = ticketPrice * quantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2).replace('.', ',');
}

function comprarIngressos() {
    const quantity = document.getElementById('ticketQuantity').value;
    alert(`Compra realizada com sucesso! Você comprou ${quantity} ingresso(s).`);
}