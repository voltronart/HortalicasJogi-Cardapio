import { initCardapio } from './cardapio.js';

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// expõe globalmente pro transition.js (Barba) conseguir chamar
// depois de uma troca de página, já que ele não é um módulo ES
window.initCardapio = initCardapio;

document.addEventListener('DOMContentLoaded', () => {
  initCardapio();
});