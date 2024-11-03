function confirmarValor() {
    const valor = parseFloat(document.getElementById('valorInput').value);
    const notificacao = document.getElementById('notificacao');
    if (!isNaN(valor) && valor > 0) {
        // Exibe a notificação de pechincha
        notificacao.innerHTML = `O pedido da pechincha foi mandado para o vendedor! Você será respondido em 24 horas sobre o resultado!`;
        notificacao.style.display = 'block'; // Mostra a notificação
    } else {
        notificacao.innerHTML = `Por favor, insira um valor válido.`;
        notificacao.style.display = 'block'; // Mostra a notificação de erro
        setTimeout(() => {
            notificacao.style.display = 'none'; // Oculta a notificação após 3 segundos
        }, 3000);
    }
}