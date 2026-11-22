
const content = document.getElementById("central-content");

let jogadores = JSON.parse(localStorage.getItem("the77_jogadores") || "[]");
let eventos = JSON.parse(localStorage.getItem("the77_eventos") || "[]");

function salvarDados() {
  localStorage.setItem("the77_jogadores", JSON.stringify(jogadores));
  localStorage.setItem("the77_eventos", JSON.stringify(eventos));
  atualizarContadores();
}

function atualizarContadores() {
  document.getElementById("memberCount").textContent = jogadores.length;
  document.getElementById("eventCount").textContent = eventos.length;
}

function elemento(tag, texto) {
  const el = document.createElement(tag);
  el.textContent = texto;
  return el;
}

function abrirInicio() {
  content.replaceChildren(
    elemento("h2", "Painel principal"),
    elemento("p", "Bem-vindo à central oficial da THE 77!"),
    elemento("p", "Aqui você organiza os jogadores, eventos e o ranking da guilda.")
  );
}

function abrirJogadores() {
  content.replaceChildren();

  content.append(
    elemento("h2", "Jogadores"),
    elemento("p", "Cadastre os membros da guilda.")
  );

  const nome = document.createElement("input");
  nome.placeholder = "Digite o nick do jogador";
  nome.maxLength = 30;

  const cargo = document.createElement("select");

  ["Jogador", "ADM", "Líder", "Recrutador"].forEach(item => {
    const opcao = elemento("option", item);
    opcao.value = item;
    cargo.append(opcao);
  });

  const botao = elemento("button", "ADICIONAR JOGADOR");

  botao.addEventListener("click", () => {
    const nick = nome.value.trim();

    if (!nick) {
      alert("Digite o nick do jogador!");
      return;
    }

    jogadores.push({
      id: Date.now(),
      nome: nick,
      cargo: cargo.value,
      pontos: 0
    });

    salvarDados();
    abrirJogadores();
  });

  content.append(nome, cargo, botao);

  content.append(elemento("h2", "Lista de membros"));

  if (jogadores.length === 0) {
    content.append(elemento("p", "Nenhum jogador cadastrado ainda."));
  }

  jogadores.forEach(jogador => {
    const item = document.createElement("div");
    item.className = "item";

    const informacao = elemento(
      "p",
      jogador.nome + " • " + jogador.cargo
    );

    const excluir = elemento("button", "EXCLUIR");

    excluir.addEventListener("click", () => {
      if (!confirm("Deseja excluir este jogador?")) return;

      jogadores = jogadores.filter(p => p.id !== jogador.id);
      salvarDados();
      abrirJogadores();
    });

    item.append(informacao, excluir);
    content.append(item);
  });
}

function abrirEventos() {
  content.replaceChildren();

  content.append(
    elemento("h2", "Eventos"),
    elemento("p", "Organize os confrontos da THE 77.")
  );

  const nome = document.createElement("input");
  nome.placeholder = "Nome do evento";
  nome.maxLength = 50;

  const tipo = document.createElement("select");

  ["4v4", "6v6", "Campeonato", "Treino"].forEach(item => {
    const opcao = elemento("option", item);
    opcao.value = item;
    tipo.append(opcao);
  });

  const data = document.createElement("input");
  data.type = "date";

  const botao = elemento("button", "CRIAR EVENTO");

  botao.addEventListener("click", () => {
    if (!nome.value.trim() || !data.value) {
      alert("Preencha o nome e a data do evento!");
      return;
    }

    eventos.push({
      id: Date.now(),
      nome: nome.value.trim(),
      tipo: tipo.value,
      data: data.value
    });

    salvarDados();
    abrirEventos();
  });

  content.append(nome, tipo, data, botao);
  content.append(elemento("h2", "Próximos eventos"));

  if (eventos.length === 0) {
    content.append(elemento("p", "Nenhum evento cadastrado."));
  }

  eventos.forEach(evento => {
    const item = document.createElement("div");
    item.className = "item";

    const informacao = elemento(
      "p",
      evento.nome + " • " + evento.tipo + " • " + evento.data
    );

    const excluir = elemento("button", "EXCLUIR");

    excluir.addEventListener("click", () => {
      if (!confirm("Deseja excluir este evento?")) return;

      eventos = eventos.filter(e => e.id !== evento.id);
      salvarDados();
      abrirEventos();
    });

    item.append(informacao, excluir);
    content.append(item);
  });
}

function abrirRanking() {
  content.replaceChildren(
    elemento("h2", "Ranking THE 77"),
    elemento("p", "Pontuação dos jogadores da guilda.")
  );

  const ordenados = [...jogadores].sort(
    (a, b) => b.pontos - a.pontos
  );

  if (ordenados.length === 0) {
    content.append(elemento("p", "Cadastre jogadores para montar o ranking."));
  }

  ordenados.forEach((jogador, indice) => {
    const item = document.createElement("div");
    item.className = "item";

    const informacao = elemento(
      "p",
      (indice + 1) + "º " + jogador.nome + " — " + jogador.pontos + " pontos"
    );

    const adicionar = elemento("button", "+1 PONTO");

    adicionar.addEventListener("click", () => {
      jogador.pontos++;
      salvarDados();
      abrirRanking();
    });

    item.append(informacao, adicionar);
    content.append(item);
  });
}

const paginas = {
  inicio: abrirInicio,
  jogadores: abrirJogadores,
  eventos: abrirEventos,
  ranking: abrirRanking
};

document.querySelectorAll(".menu button").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".menu button").forEach(item => {
      item.classList.remove("active");
    });

    botao.classList.add("active");

    const pagina = botao.dataset.page;
    if (paginas[pagina]) paginas[pagina]();
  });
});

atualizarContadores();
abrirInicio();
