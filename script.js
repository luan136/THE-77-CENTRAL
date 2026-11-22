
const STORAGE_KEY = "the77_central_x1";

let dados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  jogadores: [],
  confrontos: []
};

let paginaAtual = "inicio";

function salvar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
  atualizarEstatisticas();
}

function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, letra => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[letra]);
}

function atualizarEstatisticas() {
  document.getElementById("totalJogadores").textContent =
    dados.jogadores.length;

  document.getElementById("totalConfrontos").textContent =
    dados.confrontos.length;

  document.getElementById("totalVitorias").textContent =
    dados.confrontos.filter(c => c.vencedor).length;
}

function abrirPagina(pagina) {
  paginaAtual = pagina;
  const area = document.getElementById("conteudo");

  if (pagina === "inicio") {
    area.innerHTML = `
      <div class="panel">
        <h2>Bem-vindo à THE 77</h2>
        <p>Central oficial de confrontos da guilda.</p>
        <p>Cadastre jogadores e organize seus desafios X1.</p>
      </div>`;
  }

  if (pagina === "jogadores") {
    area.innerHTML = `
      <div class="panel">
        <h2>Jogadores</h2>
        <p>Cadastre os membros da guilda.</p>

        <form id="formJogador">
          <input name="nome" placeholder="Nick do Free Fire" required>
          <input name="id" placeholder="ID do jogador" required>
          <button type="submit">Cadastrar jogador</button>
        </form>

        <div class="lista">
          ${dados.jogadores.map(j => `
            <div class="item">
              <div>
                <strong>${escapar(j.nome)}</strong>
                <p>ID: ${escapar(j.id)}</p>
              </div>
              <button data-action="remover-jogador"
                data-id="${j.idInterno}">Excluir</button>
            </div>
          `).join("") || "<p>Nenhum jogador cadastrado.</p>"}
        </div>
      </div>`;
  }

  if (pagina === "confrontos") {
    const opcoes = dados.jogadores.map(j =>
      `<option value="${j.idInterno}">${escapar(j.nome)}</option>`
    ).join("");

    area.innerHTML = `
      <div class="panel">
        <h2>Novo confronto X1</h2>
        <p>Escolha os dois jogadores do desafio.</p>

        ${dados.jogadores.length < 2
          ? "<p>Cadastre pelo menos dois jogadores primeiro.</p>"
          : `
          <form id="formConfronto">
            <label>Jogador 1</label>
            <select name="jogador1" required>${opcoes}</select>

            <label>Jogador 2</label>
            <select name="jogador2" required>${opcoes}</select>

            <label>Data e horário</label>
            <input type="datetime-local" name="data" required>

            <button type="submit">Criar confronto</button>
          </form>
        `}

        <h2>Histórico de confrontos</h2>

        ${dados.confrontos.map(c => {
          const j1 = dados.jogadores.find(j => j.idInterno === c.jogador1);
          const j2 = dados.jogadores.find(j => j.idInterno === c.jogador2);

          return `
            <div class="item">
              <div>
                <strong>${escapar(j1?.nome || "Jogador removido")}
                  VS ${escapar(j2?.nome || "Jogador removido")}</strong>
                <p>${escapar(c.data || "Data não informada")}</p>
                <p>${c.vencedor
                  ? "Vencedor: " + escapar(
                    dados.jogadores.find(j => j.idInterno === c.vencedor)?.nome || "Não disponível"
                  )
                  : "Aguardando resultado"}</p>
              </div>
              ${!c.vencedor ? `
                <button data-action="resultado"
                  data-id="${c.id}">Registrar resultado</button>
              ` : ""}
            </div>`;
        }).join("") || "<p>Nenhum confronto criado.</p>"}
      </div>`;
  }

  if (pagina === "ranking") {
    const ranking = dados.jogadores.map(j => ({
      ...j,
      vitorias: dados.confrontos.filter(c => c.vencedor === j.idInterno).length,
      derrotas: dados.confrontos.filter(c =>
        c.vencedor &&
        (c.jogador1 === j.idInterno || c.jogador2 === j.idInterno) &&
        c.vencedor !== j.idInterno
      ).length
    })).sort((a, b) => b.vitorias - a.vitorias);

    area.innerHTML = `
      <div class="panel">
        <h2>Ranking THE 77</h2>
        ${ranking.map((j, i) => `
          <div class="item">
            <strong>#${i + 1} ${escapar(j.nome)}</strong>
            <span>${j.vitorias} vitórias • ${j.derrotas} derrotas</span>
          </div>
        `).join("") || "<p>Cadastre jogadores para iniciar o ranking.</p>"}
      </div>`;
  }

  if (pagina === "equipes") {
    area.innerHTML = `
      <div class="panel">
        <h2>Equipes</h2>
        <p>Área reservada para organizar equipes e confrontos 4v4 e 6v6.</p>
        <p>Vamos desenvolver essa função na próxima etapa.</p>
      </div>`;
  }

  document.querySelectorAll("[data-page]").forEach(botao => {
    botao.style.background =
      botao.dataset.page === pagina ? "#702cc0" : "";
  });
}

document.addEventListener("click", evento => {
  const menu = evento.target.closest("[data-page]");

  if (menu) {
    abrirPagina(menu.dataset.page);
    return;
  }

  const botao = evento.target.closest("[data-action]");
  if (!botao) return;

  const id = botao.dataset.id;

  if (botao.dataset.action === "remover-jogador") {
    if (!confirm("Deseja excluir este jogador?")) return;

    dados.jogadores = dados.jogadores.filter(j => j.idInterno !== id);
    salvar();
    abrirPagina("jogadores");
  }

  if (botao.dataset.action === "resultado") {
    const confronto = dados.confrontos.find(c => c.id === id);
    if (!confronto) return;

    const opcoes = [confronto.jogador1, confronto.jogador2]
      .map(idJogador => dados.jogadores.find(j => j.idInterno === idJogador))
      .filter(Boolean);

    const escolha = prompt(
      "Digite 1 para " + (opcoes[0]?.nome || "Jogador 1") +
      " ou 2 para " + (opcoes[1]?.nome || "Jogador 2")
    );

    if (escolha !== "1" && escolha !== "2") return;

    confronto.vencedor = escolha === "1"
      ? confronto.jogador1
      : confronto.jogador2;

    salvar();
    abrirPagina("confrontos");
  }
});

document.addEventListener("submit", evento => {
  evento.preventDefault();
  const formulario = evento.target;
  const campos = new FormData(formulario);

  if (formulario.id === "formJogador") {
    const nome = String(campos.get("nome")).trim();
    const id = String(campos.get("id")).trim();

    if (!nome || !id) return;

    dados.jogadores.push({
      idInterno: crypto.randomUUID(),
      nome,
      id
    });

    salvar();
    abrirPagina("jogadores");
  }

  if (formulario.id === "formConfronto") {
    const jogador1 = campos.get("jogador1");
    const jogador2 = campos.get("jogador2");
    const data = campos.get("data");

    if (jogador1 === jogador2) {
      alert("Escolha dois jogadores diferentes.");
      return;
    }

    dados.confrontos.push({
      id: crypto.randomUUID(),
      jogador1,
      jogador2,
      data,
      vencedor: null
    });

    salvar();
    abrirPagina("confrontos");
  }
});

atualizarEstatisticas();
abrirPagina("inicio");
