
document.addEventListener("DOMContentLoaded", () => {
  console.log("THE 77 CENTRAL iniciado!");

  const app = document.body;

  // Identidade do aplicativo
  document.title = "THE 77 CENTRAL";

  // Criar painel principal
  const painel = document.createElement("section");
  painel.className = "central-panel";

  painel.innerHTML = `
    <div class="central-header">
      <span class="central-logo">77</span>
      <span class="central-status">● SISTEMA ONLINE</span>
    </div>

    <h2>Bem-vindo à THE 77</h2>
    <p>Sua comunidade começa aqui.</p>

    <div class="central-menu">
      <button data-page="inicio">INÍCIO</button>
      <button data-page="comunidade">COMUNIDADE</button>
      <button data-page="perfil">MEU PERFIL</button>
    </div>

    <div id="central-content">
      <h3>Painel principal</h3>
      <p>Estamos preparando novidades para você.</p>
    </div>

    <div class="central-footer">
      THE 77 CENTRAL • VERSÃO 1.0
    </div>
  `;

  app.appendChild(painel);

  // Navegação
  const paginas = {
    inicio: `
      <h3>Painel principal</h3>
      <p>Bem-vindo ao seu espaço!</p>
    `,
    comunidade: `
      <h3>Comunidade THE 77</h3>
      <p>Em breve: novidades, eventos e interação.</p>
    `,
    perfil: `
      <h3>Meu perfil</h3>
      <p>Área de perfil em construção.</p>
    `
  };

  document.querySelectorAll("[data-page]").forEach(botao => {
    botao.addEventListener("click", () => {
      const pagina = botao.dataset.page;
      document.getElementById("central-content").innerHTML =
        paginas[pagina];
    });
  });
});
