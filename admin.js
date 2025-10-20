/* admin.js
   Painel administrativo da ONG: lê dados do localStorage,
   exibe em tabelas e oferece ações de limpeza e relatório.
*/

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('ong_data') || '{}');
  if (!data.projetos) data.projetos = [];
  if (!data.voluntarios) data.voluntarios = [];
  if (!data.doacoes) data.doacoes = [];

  const tabelaProjetos = document.getElementById('tabela-projetos');
  const tabelaVoluntarios = document.getElementById('tabela-voluntarios');
  const tabelaDoacoes = document.getElementById('tabela-doacoes');

  const btnRelatorio = document.getElementById('btn-relatorio');
  const btnLimpar = document.getElementById('btn-limpar');

  // === Função para montar uma tabela dinâmica ===
  function gerarTabela(lista, colunas) {
    if (lista.length === 0) return "<p>Nenhum registro encontrado.</p>";

    let thead = "<thead><tr>";
    colunas.forEach(c => thead += `<th>${c.label}</th>`);
    thead += "</tr></thead>";

    let tbody = "<tbody>";
    lista.forEach(item => {
      tbody += "<tr>";
      colunas.forEach(c => {
        let valor = item[c.key];
        if (typeof valor === "number") valor = "R$ " + valor.toFixed(2).replace('.', ',');
        tbody += `<td>${valor || "-"}</td>`;
      });
      tbody += "</tr>";
    });
    tbody += "</tbody>";

    return `<table>${thead}${tbody}</table>`;
  }

  // === Renderização ===
  tabelaProjetos.innerHTML = gerarTabela(data.projetos, [
    { key: "titulo", label: "Título" },
    { key: "descricao", label: "Descrição" },
    { key: "categoria", label: "Categoria" }
  ]);

  tabelaVoluntarios.innerHTML = gerarTabela(data.voluntarios, [
    { key: "nome", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "interesse", label: "Área de Interesse" }
  ]);

  tabelaDoacoes.innerHTML = gerarTabela(data.doacoes, [
    { key: "nome", label: "Doador" },
    { key: "valor", label: "Valor" },
    { key: "metodo", label: "Método" }
  ]);

  // === Botão: Gerar Relatório ===
  btnRelatorio.addEventListener('click', () => {
    const totalDoacoes = data.doacoes.reduce((s, d) => s + d.valor, 0);

    const relatorio = `
RELATÓRIO DE TRANSPARÊNCIA - ONG DO AMOR
=======================================

PROJETOS ATIVOS: ${data.projetos.length}
VOLUNTÁRIOS CADASTRADOS: ${data.voluntarios.length}
DOAÇÕES RECEBIDAS: ${data.doacoes.length}
TOTAL ARRECADADO: R$ ${totalDoacoes.toFixed(2).replace('.', ',')}

Gerado em: ${new Date().toLocaleString('pt-BR')}
`;

    // Cria arquivo de texto para download
    const blob = new Blob([relatorio], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "relatorio_transparencia.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  // === Botão: Limpar dados ===
  btnLimpar.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja apagar todos os dados da ONG?")) {
      localStorage.removeItem('ong_data');
      alert("Todos os dados foram apagados.");
      location.reload();
    }
  });
});
