/* voluntariado.js
   Gerencia o cadastro e listagem de voluntários usando localStorage.
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-voluntario');
  const listEl = document.getElementById('vol-list');

  // Recupera o banco de dados local
  const data = JSON.parse(localStorage.getItem('ong_data') || '{}');
  if (!data.volunteers) data.volunteers = [];

  // Função para renderizar voluntários
  function renderVolunteers() {
    if (data.volunteers.length === 0) {
      listEl.innerHTML = "<p>Nenhum voluntário cadastrado ainda.</p>";
      return;
    }

    listEl.innerHTML = "";
    data.volunteers.forEach(v => {
      const card = document.createElement('div');
      card.className = 'vol-card';
      card.innerHTML = `
        <h3>${v.nome}</h3>
        <p><strong>Email:</strong> ${v.email}</p>
        <p><strong>Área:</strong> ${v.area}</p>
      `;
      listEl.appendChild(card);
    });
  }

  renderVolunteers();

  // Função para renderizar voluntários
function renderVolunteers() {
  const volList = document.getElementById('vol-list');
  volList.innerHTML = '';

  // Pega os voluntários do objeto data
  const volunteers = data.volunteers || [];

  volunteers.forEach((vol, index) => {
    const volDiv = document.createElement('div');
    volDiv.className = 'vol-item';
    volDiv.innerHTML = `
      <strong>${index + 1}. ${vol.nome}</strong>
      <p>E-mail: ${vol.email}</p>
      <p>CPF: ${vol.cpf}</p>
      <p>Telefone: ${vol.telefone}</p>
      <p>Data de Nascimento: ${vol.nascimento}</p>
      <p>Endereço: ${vol.endereco}, ${vol.cidade} - ${vol.estado}, CEP: ${vol.cep}</p>
      <p>Área de Interesse: ${vol.area}</p>
    `;
    volList.appendChild(volDiv);
  });
}

// Carrega voluntários do localStorage ao iniciar a página
window.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem('ong_data');
  if (storedData) {
    Object.assign(data, JSON.parse(storedData));
  }
  renderVolunteers();
});
});
