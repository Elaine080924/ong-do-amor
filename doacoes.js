/* doacoes.js
   Gerencia o cadastro e listagem de doações com total acumulado.
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-doacao');
  const listEl = document.getElementById('doa-list');
  const totalEl = document.getElementById('total-arrecadado');

  const data = JSON.parse(localStorage.getItem('ong_data') || '{}');
  if (!data.doacoes) data.doacoes = [];

  // Função para atualizar o total
  function atualizarTotal() {
    const total = data.doacoes.reduce((sum, d) => sum + d.valor, 0);
    totalEl.textContent = "R$ " + total.toFixed(2).replace('.', ',');
  }

  // Renderiza as doações
  function renderDoacoes() {
    if (data.doacoes.length === 0) {
      listEl.innerHTML = "<p>Nenhuma doação registrada ainda.</p>";
      totalEl.textContent = "R$ 0,00";
      return;
    }

    listEl.innerHTML = "";
    data.doacoes.forEach(d => {
      const card = document.createElement('div');
      card.className = 'doa-card';
      card.innerHTML = `
        <h3>${d.nome}</h3>
        <p><strong>Valor:</strong> R$ ${d.valor.toFixed(2).replace('.', ',')}</p>
        <p><strong>Método:</strong> ${d.metodo}</p>
      `;
      listEl.appendChild(card);
    });
    atualizarTotal();
  }

  renderDoacoes();

  // Cadastrar nova doação
  form.addEventListener('submit', e => {
    e.preventDefault();

    const novaDoacao = {
      id: 'd' + Date.now(),
      nome: document.getElementById('doa-nome').value.trim(),
      valor: parseFloat(document.getElementById('doa-valor').value),
      metodo: document.getElementById('doa-metodo').value
    };

    data.doacoes.push(novaDoacao);
    localStorage.setItem('ong_data', JSON.stringify(data));

    form.reset();
    renderDoacoes();
  });
});
