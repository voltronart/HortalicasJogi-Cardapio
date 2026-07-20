const NUMERO_WHATSAPP = "5561996433209";
const CARRINHO_KEY = "hortalicas-jogi-carrinho";
const CLIENTE_KEY = "hortalicas-jogi-cliente";

let carrinho = carregarCarrinho();

function carregarCarrinho() {
  try {
    const salvo = localStorage.getItem(CARRINHO_KEY);
    return salvo ? JSON.parse(salvo) : {};
  } catch (e) {
    return {};
  }
}

function salvarCarrinho() {
  try {
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
  } catch (e) {
    /* localStorage indisponível (ex: modo privado) — segue sem persistir */
  }
}

function parsePreco(preco) {
  // "4,00" -> 4.00
  return parseFloat(String(preco).replace(',', '.')) || 0;
}

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function initCardapio() {
  const container = document.getElementById('lista-semanas');
  if (!container) return;

  const cardapio = [
    {
      semana: "Novidade toda semana",
      itens: [
        { nome: "Acelga", img: "img/acelga.png", preco: "4,00", calorias: "19 kcal / 100g", descricao: "Folhas largas e macias, direto do canteiro pra sua panela." },
        { nome: "Agrião", img: "img/agriao.png", preco: "4,00", calorias: "11 kcal / 100g", descricao: "Sabor picante e fresco, ótimo em saladas e sanduíches." },
        { nome: "Alface Crespa", img: "img/alface-crespa.png", preco: "3,00", calorias: "15 kcal / 100g", descricao: "Crocante e leve, a base clássica de qualquer salada." },
        { nome: "Alface Americana", img: "img/alface-americana.png", preco: "3,00", calorias: "14 kcal / 100g", descricao: "Folhas firmes e suculentas, perfeitas pra hambúrgueres." },
        { nome: "Alface Roxa", img: "img/alfacer.png", preco: "3,00", calorias: "16 kcal / 100g", descricao: "Toque de cor e antioxidantes a mais na sua mesa." },
        { nome: "Brócolis de Cabeça", img: "img/brocolisc.png", preco: "6,00", calorias: "34 kcal / 100g", descricao: "Compacto e nutritivo, ótimo no vapor ou refogado." },
        { nome: "Brócolis de Rama", img: "img/brocolisr.png", preco: "5,00", calorias: "28 kcal / 100g", descricao: "Talos macios e sabor suave, versátil na cozinha." },
        { nome: "Cheiro Verde", img: "img/cheiro.png", preco: "3,00", calorias: "24 kcal / 100g", descricao: "Cebolinha e salsa fresquinhas, o tempero de todo dia." },
        { nome: "Couve (inteira)", img: "img/couve.png", preco: "3,00", calorias: "27 kcal / 100g", descricao: "Folhas firmes, ideais pra couve refogada ou suco verde." },
        { nome: "Rúcula", img: "img/rucula.png", preco: "3,00", calorias: "25 kcal / 100g", descricao: "Sabor levemente picante que dá vida a qualquer prato." },
        { nome: "Mostarda", img: "img/mostarda.png", preco: "4,00", calorias: "27 kcal / 100g", descricao: "Folhas com um leve ardor, ótimas refogadas com alho." },
      ]
    }
  ];

  container.innerHTML = '';

  cardapio.forEach(({ semana, itens }, semanaIdx) => {
    const bloco = document.createElement('div');
    bloco.className = 'dia';

    const titulo = document.createElement('h3');
    titulo.textContent = semana;
    bloco.appendChild(titulo);

    const lista = document.createElement('ul');

    itens.forEach((item, itemIdx) => {
      const id = `${semanaIdx}-${itemIdx}`;
      const li = document.createElement('li');
      li.dataset.id = id;

      const art = document.createElement('div');
      art.className = 'card-art';

      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.nome;
      img.onerror = () => { img.style.display = 'none'; };
      art.appendChild(img);

      const plate = document.createElement('div');
      plate.className = 'card-plate';

      const nome = document.createElement('span');
      nome.className = 'item-nome';
      nome.textContent = item.nome;
      plate.appendChild(nome);

      const stats = document.createElement('div');
      stats.className = 'card-stats';

      const preco = document.createElement('span');
      preco.className = 'etiqueta-preco';
      preco.textContent = `R$ ${item.preco}`;

      const calorias = document.createElement('span');
      calorias.className = 'etiqueta-calorias';
      calorias.textContent = item.calorias;

      stats.appendChild(preco);
      stats.appendChild(calorias);

      const desc = document.createElement('p');
      desc.className = 'card-desc';
      desc.textContent = item.descricao;

      // ---- Controles de quantidade (só aparecem com a carta aberta) ----
      const qtdControl = document.createElement('div');
      qtdControl.className = 'card-qtd';

      const btnMenos = document.createElement('button');
      btnMenos.type = 'button';
      btnMenos.className = 'qtd-btn';
      btnMenos.dataset.action = 'menos';
      btnMenos.setAttribute('aria-label', `Diminuir quantidade de ${item.nome}`);
      btnMenos.textContent = '−';

      const qtdValor = document.createElement('span');
      qtdValor.className = 'qtd-valor';
      qtdValor.textContent = carrinho[id]?.qtd || 0;

      const btnMais = document.createElement('button');
      btnMais.type = 'button';
      btnMais.className = 'qtd-btn';
      btnMais.dataset.action = 'mais';
      btnMais.setAttribute('aria-label', `Aumentar quantidade de ${item.nome}`);
      btnMais.textContent = '+';

      qtdControl.appendChild(btnMenos);
      qtdControl.appendChild(qtdValor);
      qtdControl.appendChild(btnMais);

      qtdControl.addEventListener('click', (e) => {
        e.stopPropagation(); // não deixa o clique fechar/reabrir a carta
        const btn = e.target.closest('.qtd-btn');
        if (!btn) return;
        alterarQuantidade(btn, li, item, semana);
      });

      const fechar = document.createElement('button');
      fechar.className = 'card-close';
      fechar.type = 'button';
      fechar.setAttribute('aria-label', 'Fechar carta');
      fechar.textContent = '✕';

      fechar.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.remove('is-active');
        bloco.classList.remove('is-dimmed');
        document.body.classList.remove('no-scroll');
      });

      li.appendChild(art);
      li.appendChild(plate);
      li.appendChild(stats);
      li.appendChild(desc);
      li.appendChild(qtdControl);
      li.appendChild(fechar);

      li.addEventListener('click', () => {
        if (li.classList.contains('is-active')) return;

        const active = document.querySelector('.dia li.is-active');
        const dimmed = document.querySelector('.dia.is-dimmed');

        if (active) active.classList.remove('is-active');
        if (dimmed) dimmed.classList.remove('is-dimmed');

        li.classList.add('is-active');
        bloco.classList.add('is-dimmed');
        document.body.classList.add('no-scroll');
      });

      lista.appendChild(li);
    });

    bloco.appendChild(lista);
    container.appendChild(bloco);
  });

  initCarrinhoFlutuante();
  atualizarResumoCarrinho();
}

/* ---------- CARRINHO ---------- */

function alterarQuantidade(btn, li, item, semana) {
  const id = li.dataset.id;
  const atual = carrinho[id]?.qtd || 0;
  const nova = btn.dataset.action === 'mais' ? atual + 1 : Math.max(0, atual - 1);

  if (nova === 0) {
    delete carrinho[id];
  } else {
    carrinho[id] = {
      qtd: nova,
      nome: item.nome,
      preco: parsePreco(item.preco),
      semana,
    };
  }

  li.querySelector('.qtd-valor').textContent = nova;
  salvarCarrinho();
  atualizarResumoCarrinho();
}

function atualizarResumoCarrinho() {
  const barra = document.getElementById('carrinho-flutuante');
  const totalEl = document.getElementById('carrinho-total');
  const itensEl = document.getElementById('carrinho-itens');
  if (!barra) return;

  const entradas = Object.values(carrinho);
  const totalItens = entradas.reduce((soma, e) => soma + e.qtd, 0);
  const totalValor = entradas.reduce((soma, e) => soma + e.qtd * e.preco, 0);

  if (totalItens === 0) {
    barra.classList.remove('visivel');
    return;
  }

  totalEl.textContent = formatarPreco(totalValor);
  itensEl.textContent = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`;
  barra.classList.add('visivel');
}

function limparCarrinho() {
  carrinho = {};
  salvarCarrinho();
  document.querySelectorAll('.qtd-valor').forEach(el => { el.textContent = '0'; });
  atualizarResumoCarrinho();
}

function montarMensagemPedido(dadosCliente) {
  const porSemana = {};
  Object.values(carrinho).forEach(e => {
    if (!porSemana[e.semana]) porSemana[e.semana] = [];
    porSemana[e.semana].push(e);
  });

  let texto = 'Olá! Gostaria de fazer o seguinte pedido:\n';
  let total = 0;

  Object.entries(porSemana).forEach(([semana, itens]) => {
    texto += `\n*${semana}*\n`;
    itens.forEach(e => {
      const subtotal = e.qtd * e.preco;
      total += subtotal;
      texto += `- ${e.qtd}x ${e.nome} — ${formatarPreco(subtotal)}\n`;
    });
  });

  texto += `\n*Total: ${formatarPreco(total)}*\n`;
  texto += `\n*Dados para entrega*\n`;
  texto += `Nome: ${dadosCliente.nome}\n`;
  texto += `Telefone: ${dadosCliente.telefone}\n`;
  texto += `Endereço: ${dadosCliente.endereco}\n`;
  texto += `Pagamento: ${dadosCliente.pagamento}\n`;
  texto += `\nAguardo confirmação, obrigado!`;

  return texto;
}

/* ---------- MODAL DE CHECKOUT ---------- */

function carregarDadosCliente() {
  try {
    const salvo = localStorage.getItem(CLIENTE_KEY);
    return salvo ? JSON.parse(salvo) : {};
  } catch (e) {
    return {};
  }
}

function salvarDadosCliente(dados) {
  try {
    localStorage.setItem(CLIENTE_KEY, JSON.stringify(dados));
  } catch (e) {
    /* localStorage indisponível — segue sem persistir */
  }
}

function initCarrinhoFlutuante() {
  const btnFinalizar = document.getElementById('carrinho-finalizar');
  const overlay = document.getElementById('modal-overlay');
  const btnFechar = document.getElementById('modal-fechar');
  const form = document.getElementById('form-pedido');
  if (!btnFinalizar || !overlay || !form) return;
  if (btnFinalizar.dataset.bound) return; // evita ligar os eventos duas vezes
  btnFinalizar.dataset.bound = 'true';

  const campoNome = document.getElementById('campo-nome');
  const campoTelefone = document.getElementById('campo-telefone');
  const campoEndereco = document.getElementById('campo-endereco');
  const campoPagamento = document.getElementById('campo-pagamento');

  function abrirModal() {
    if (Object.keys(carrinho).length === 0) return;

    const salvo = carregarDadosCliente();
    campoNome.value = salvo.nome || '';
    campoTelefone.value = salvo.telefone || '';
    campoEndereco.value = salvo.endereco || '';
    campoPagamento.value = salvo.pagamento || '';

    overlay.classList.add('aberto');
  }

  function fecharModal() {
    overlay.classList.remove('aberto');
  }

  btnFinalizar.addEventListener('click', abrirModal);
  btnFechar.addEventListener('click', fecharModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) fecharModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dadosCliente = {
      nome: campoNome.value.trim(),
      telefone: campoTelefone.value.trim(),
      endereco: campoEndereco.value.trim(),
      pagamento: campoPagamento.value,
    };

    if (!dadosCliente.nome || !dadosCliente.telefone || !dadosCliente.endereco || !dadosCliente.pagamento) {
      return; // validação HTML5 (required) já cobre o feedback visual
    }

    salvarDadosCliente(dadosCliente);

    const mensagem = montarMensagemPedido(dadosCliente);
    const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');

    fecharModal();
    limparCarrinho();
  });
}
