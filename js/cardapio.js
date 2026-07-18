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

  cardapio.forEach(({ semana, itens }) => {
    const bloco = document.createElement('div');
    bloco.className = 'dia';

    const titulo = document.createElement('h3');
    titulo.textContent = semana;
    bloco.appendChild(titulo);

    const lista = document.createElement('ul');

    itens.forEach(item => {
      const li = document.createElement('li');

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
}