/* main.js
   Scripts comuns ao site:
   - Menu mobile
   - Atualização do ano no rodapé
   - Seed (dados iniciais) no localStorage para simular backend
   - Carregamento de estatísticas simples para a página inicial
*/

/* ---------- Helper: seed de dados no localStorage ----------
   Esses dados simulam projetos, voluntários e doações para as páginas
   funcionarem sem servidor. Se já existir, não sobrescreve.
*/
(function seedData() {
  if (!localStorage.getItem('ong_data')) {
    const data = {
      projects: [
        { id: 'p1', title: 'Projeto Educação', summary: 'Reforço escolar e materiais', category: 'Educação', progress: 76 },
        { id: 'p2', title: 'Saúde Comunitária', summary: 'Oficinas e campanhas', category: 'Saúde', progress: 42 },
      ],
      volunteers: [
        { id: 'v1', name: 'Ana Silva', joinedAt: '2024-09-01' },
        { id: 'v2', name: 'Carlos Souza', joinedAt: '2025-02-12' },
      ],
      donations: [
        { id: 'd1', amount: 150.0, donor: 'Rita', date: '2025-03-05' },
      ]
    };
    localStorage.setItem('ong_data', JSON.stringify(data));
  }
})();

/* ---------- Menu mobile toggle ---------- */
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btn-menu');
  const nav = document.getElementById('main-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Coloca o ano atual no rodapé (útil para o relatório)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Ativa o link do menu conforme a página atual
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.href === window.location.href || link.getAttribute('href') === window.location.pathname.split('/').pop()) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Atualiza estatísticas na homepage (se a seção existir)
  const statProjects = document.getElementById('stat-projects');
  const statVols = document.getElementById('stat-vols');
  const statDon = document.getElementById('stat-donations');
  const stored = JSON.parse(localStorage.getItem('ong_data') || '{}');
  if (statProjects) statProjects.textContent = (stored.projects || []).length;
  if (statVols) statVols.textContent = (stored.volunteers || []).length;
  if (statDon) {
    const count = (stored.donations || []).length;
    statDon.textContent = count;
  }

  // Link simulado para baixar relatório (não há pdf real)
  const downloadBtn = document.getElementById('download-report');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Download simulado: no trabalho final substitua pelo arquivo PDF real na pasta /docs.');
    });
  }
});

// Menu responsivo simples
const menuButton = document.getElementById("btn-menu");
const mainNav = document.getElementById("main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("active");
  menuButton.setAttribute("aria-expanded", isOpen);
});
// =========================
// MUDANÇA DE TEMA
// =========================
function setTheme(themeName) {
  document.body.className = themeName;
  localStorage.setItem("theme", themeName); // salva a escolha
}

// Quando recarregar, mantém o tema escolhido
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "branco";
  setTheme(savedTheme);
});

