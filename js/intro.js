document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap === 'undefined') {
    console.warn('GSAP não carregado.');
    return;
  }

  const intro = document.getElementById('intro');
  if (!intro) return;

  const nuvens = intro.querySelectorAll('.nuvem');
  const titulo = intro.querySelector('.intro-title');
  const sol = intro.querySelector('.sol');
  const montanhaLonge = intro.querySelector('.montanha-longe');
  const montanhaMeio = intro.querySelector('.montanha-meio');
  const montanhaPerto = intro.querySelector('.montanha-perto');

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' }
  });

  // 1. sol aparece primeiro, sozinho, dando ambientação
  tl.fromTo(sol, {
    opacity: 0,
    scale: 0.7
  }, {
    opacity: 1,
    scale: 1,
    duration: 1
  }, 0);

  // 2. montanhas sobem do chão em sequência: longe -> meio -> perto
  //    (isso simula profundidade: cada camada "assenta" depois da anterior)
  tl.fromTo(montanhaLonge, {
    y: 60, opacity: 0
  }, {
    y: 0, opacity: 1, duration: 0.9
  }, 0.3);

  tl.fromTo(montanhaMeio, {
    y: 60, opacity: 0
  }, {
    y: 0, opacity: 1, duration: 0.9
  }, 0.45);

  tl.fromTo(montanhaPerto, {
    y: 60, opacity: 0
  }, {
    y: 0, opacity: 1, duration: 0.9
  }, 0.6);

  // 3. nuvens entram por cima do cenário já montado
  tl.fromTo(nuvens, {
    opacity: 0,
    x: (i, el) => (el.classList.contains('nuvem-2') || el.classList.contains('nuvem-4') || el.classList.contains('nuvem-6') ? 80 : -80),
    scale: 0.85
  }, {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 1.1,
    stagger: 0.12
  }, 0.9);

  // 4. leve flutuação contínua nas nuvens
  tl.to(nuvens, {
    x: '+=18',
    duration: 2.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: 1
  }, '<');

  // 5. título aparece no centro, cenário já pronto
  tl.fromTo(titulo, {
    opacity: 0, scale: 0.9, y: 10
  }, {
    opacity: 1, scale: 1, y: 0, duration: 0.8
  }, 2.0);

  // 6. pausa pra "respirar"
  tl.to({}, { duration: 1.1 });

  // 7. título sai primeiro
  tl.to(titulo, {
    opacity: 0, y: -16, duration: 0.5, ease: 'power2.in'
  });

  // 8. nuvens saem voando pros lados de origem
  tl.to(nuvens, {
    x: (i, el) => (el.classList.contains('nuvem-2') || el.classList.contains('nuvem-4') || el.classList.contains('nuvem-6') ? 600 : -600),
    opacity: 0,
    duration: 0.9,
    ease: 'power3.in',
    stagger: 0.08
  }, '-=0.2');

  // 9. montanhas afundam de volta, na ordem inversa (perto -> meio -> longe)
  tl.to(montanhaPerto, {
    y: 60, opacity: 0, duration: 0.6, ease: 'power2.in'
  }, '-=0.5');

  tl.to(montanhaMeio, {
    y: 60, opacity: 0, duration: 0.6, ease: 'power2.in'
  }, '-=0.45');

  tl.to(montanhaLonge, {
    y: 60, opacity: 0, duration: 0.6, ease: 'power2.in'
  }, '-=0.4');

  // 10. sol se apaga
  tl.to(sol, {
    opacity: 0, scale: 0.7, duration: 0.6
  }, '-=0.5');

  // 11. o céu esvai por último, revelando a página real
  tl.to(intro, {
    opacity: 0, duration: 0.5, ease: 'power1.inOut'
  }, '-=0.3');

  tl.call(() => {
    intro.remove();
  });

});