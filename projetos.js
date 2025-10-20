/* projetos.js
   Lida com listagem, adição e salvamento de projetos no localStorage.
*/

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('project-list');
  const modal = document.getElementById('project-modal');
  const form = document.getElementById('form-project');
  const btnAdd = document.getElementById('btn-add-project');
  const btnCancel = document.getElementById('btn-cancel');

  const data = JSON.parse(localStorage.getItem('ong_data') || '{}');

  // Função para renderizar os projetos
  function renderProjects() {
    if (!data.projects || data.projects.length === 0) {
      listEl.innerHTML = "<p>Nenhum projeto cadastrado ainda.</p>";
      return;
    }

    listEl.innerHTML = "";
    data.projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <p><strong>Categoria:</strong> ${p.category}</p>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${p.progress}%"></div>
        </div>
        <small>Progresso: ${p.progress}%</small>
      `;
      listEl.appendChild(card);
    });
  }

  renderProjects();

  // Abrir modal
  btnAdd.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('proj-title').focus();
  });

  // Fechar modal
  btnCancel.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
    form.reset();
  });

  // Salvar novo projeto
  form.addEventListener('submit', e => {
    e.preventDefault();
    const newProj = {
      id: 'p' + Date.now(),
      title: document.getElementById('proj-title').value,
      summary: document.getElementById('proj-summary').value,
      category: document.getElementById('proj-category').value,
      progress: parseInt(document.getElementById('proj-progress').value || 0)
    };
    data.projects.push(newProj);
    localStorage.setItem('ong_data', JSON.stringify(data));

    form.reset();
    modal.setAttribute('aria-hidden', 'true');
    renderProjects();
  });
});
