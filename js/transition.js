document.addEventListener('DOMContentLoaded', () => {

  if (typeof barba === 'undefined') {
    console.warn('Barba.js não carregado.');
    return;
  }

  // cria o container das faixas, uma única vez, fora do Barba
  const cover = document.createElement('div');
  cover.className = 'barba-transition-cover';

  const NUM_FAIXAS = 10;
  for (let i = 0; i < NUM_FAIXAS; i++) {
    const faixa = document.createElement('div');
    faixa.className = 'faixa-cortina';
    cover.appendChild(faixa);
  }

  document.body.appendChild(cover);

  const faixas = cover.querySelectorAll('.faixa-cortina');

  barba.init({
    transitions: [
      {
        name: 'zigzag-transition',

        leave(data) {
          return gsap.timeline()
            .set(faixas, { scaleY: 0 })
            .to(faixas, {
              scaleY: 1,
              duration: 0.5,
              ease: 'power2.inOut',
              stagger: {
                each: 0.05,
                from: 'start' // pode ser 'start', 'end', 'center', 'edges'
              }
            })
            .to(data.current.container, {
              opacity: 0,
              duration: 0.2
            }, '<0.2');
        },

        enter(data) {
          window.scrollTo(0, 0);

          return gsap.timeline()
            .fromTo(data.next.container,
              { opacity: 0 },
              { opacity: 1, duration: 0.3 }
            )
            .to(faixas, {
              scaleY: 0,
              duration: 0.5,
              ease: 'power2.inOut',
              stagger: {
                each: 0.05,
                from: 'start'
              }
            }, '<0.1');
        }
      }
    ]
  });

  barba.hooks.after((data) => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }

    const temCardapio = data.next.container.querySelector('#lista-semanas');
    if (temCardapio && typeof window.initCardapio === 'function') {
      window.initCardapio();
    }
  });

});