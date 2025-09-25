function enviarWhatsApp(event) {
  event.preventDefault(); // evita que o formulário recarregue a página

  const nome = document.getElementById("nome").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // Validação simples
  if (!nome || !celular || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const texto = `*Nome:* ${nome}\n*Celular:* ${celular}\n*Mensagem:* ${mensagem}`;
  const numeroDestino = "5511985301306";
  const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(texto)}`;

  window.open(url, '_blank');
}

// Função para animação de digitação corrigida
function typeWriter(element, text, speed = 80) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      // Preservar as tags HTML
      if (text.charAt(i) === '<') {
        // Encontrar o fechamento da tag
        let tagEnd = text.indexOf('>', i);
        if (tagEnd !== -1) {
          element.innerHTML += text.substring(i, tagEnd + 1);
          i = tagEnd + 1;
        } else {
          element.innerHTML += text.charAt(i);
          i++;
        }
      } else {
        element.innerHTML += text.charAt(i);
        i++;
      }
      setTimeout(type, speed);
    } else {
      // Adicionar cursor piscante após a digitação
      element.innerHTML += '<span class="typing-cursor"></span>';
    }
  }
  
  type();
}

// Função para alternar modo escuro
function toggleDarkMode() {
  const body = document.body;
  const darkModeButton = document.querySelector('.modo-dark i');
  const logoEscuro = document.querySelector('.logo-escuro');
  const logoClaro = document.querySelector('.logo-claro');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    darkModeButton.className = 'bi bi-moon-fill';
    localStorage.setItem('darkMode', 'enabled');
    
    // Mostrar logo clara, esconder logo escura
    if (logoEscuro && logoClaro) {
      logoEscuro.style.display = 'none';
      logoClaro.style.display = 'block';
    }
  } else {
    darkModeButton.className = 'bi bi-brightness-high-fill';
    localStorage.setItem('darkMode', 'disabled');
    
    // Mostrar logo escura, esconder logo clara
    if (logoEscuro && logoClaro) {
      logoEscuro.style.display = 'block';
      logoClaro.style.display = 'none';
    }
  }
}

// Função para verificar modo escuro salvo
function checkSavedDarkMode() {
  const savedMode = localStorage.getItem('darkMode');
  const body = document.body;
  const darkModeButton = document.querySelector('.modo-dark i');
  const logoEscuro = document.querySelector('.logo-escuro');
  const logoClaro = document.querySelector('.logo-claro');
  
  if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    darkModeButton.className = 'bi bi-moon-fill';
    
    // Mostrar logo clara, esconder logo escura
    if (logoEscuro && logoClaro) {
      logoEscuro.style.display = 'none';
      logoClaro.style.display = 'block';
    }
  }
}

// Função para animações de entrada
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('animate');
    }
  });
}

// Função para inicializar animações quando a página carrega
function initAnimations() {
  // Verificar modo escuro salvo
  checkSavedDarkMode();
  
  // Animação de digitação no título principal
  const tituloPrincipal = document.querySelector('.text-motivacao h1');
  if (tituloPrincipal) {
    const textoOriginal = tituloPrincipal.innerHTML;
    setTimeout(() => {
      typeWriter(tituloPrincipal, textoOriginal, 80);
    }, 500);
  }
  
  // Adicionar classes para animações de scroll
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    section.classList.add('animate-on-scroll');
    section.style.animationDelay = `${index * 0.2}s`;
  });
  
  // Adicionar listener para scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Adicionar listener para modo escuro
  const darkModeButton = document.querySelector('.modo-dark');
  if (darkModeButton) {
    darkModeButton.addEventListener('click', toggleDarkMode);
  }
  
  // Executar uma vez para elementos já visíveis
  animateOnScroll();

  // Inicializar carrossel Quem Somos
  initQuemSomosCarousel();
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', initAnimations);

// ================== Carrossel Quem Somos ==================
function initQuemSomosCarousel() {
  const carousel = document.querySelector('.qs-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.qs-track');
  const slides = Array.from(track.querySelectorAll('[data-slide]'));
  const prevBtn = carousel.querySelector('.qs-prev');
  const nextBtn = carousel.querySelector('.qs-next');
  const dotsContainer = document.querySelector('.qs-dots');

  let index = 0;
  let slidesPerView = 1; // exibir 1 slide por vez (texto ocupa 100%)

  // Criar dots
  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pages = Math.ceil(slides.length / slidesPerView);
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
      dot.addEventListener('click', () => {
        index = i * slidesPerView;
        update();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function getSlidesPerView() { return 1; }

  function clampIndex() {
    const maxIndex = Math.max(0, slides.length - slidesPerView);
    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;
  }

  function updateDots() {
    if (!dotsContainer) return;
    const pages = Math.ceil(slides.length / slidesPerView);
    const activePage = Math.floor(index / slidesPerView);
    dotsContainer.querySelectorAll('button').forEach((btn, i) => {
      btn.setAttribute('aria-selected', i === activePage ? 'true' : 'false');
    });
  }

  function update() {
    slidesPerView = 1;
    const rect = slides[0].getBoundingClientRect();
    const slideWidth = rect.width; // sem gap
    clampIndex();
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    updateDots();
  }

  // Navegação
  prevBtn?.addEventListener('click', () => { index -= slidesPerView; update(); });
  nextBtn?.addEventListener('click', () => { index += slidesPerView; update(); });

  // Rebuild em resize
  window.addEventListener('resize', () => {
    buildDots();
    update();
  });

  // Removida animação de glow/tilt seguindo o mouse

  // Inicialização
  buildDots();
  update();

  // Swipe/drag para mobile
  let isPointerDown = false;
  let startX = 0;
  let startTranslate = 0;
  let lastX = 0;
  let velocity = 0;
  let lastTime = 0;
  const viewport = carousel.querySelector('.qs-viewport');

  function getTranslateX() {
    const style = window.getComputedStyle(track);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

  function onPointerDown(e) {
    isPointerDown = true;
    viewport.setPointerCapture?.(e.pointerId || 0);
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startTranslate = getTranslateX();
    lastX = startX;
    track.style.transition = 'none';
    lastTime = performance.now();
    velocity = 0;
  }

  function onPointerMove(e) {
    if (!isPointerDown) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const now = performance.now();
    const delta = clientX - startX;
    velocity = (clientX - lastX) / (now - lastTime + 0.0001); // px/ms
    lastX = clientX;
    lastTime = now;
    const eased = startTranslate + delta;
    track.style.transform = `translateX(${eased}px)`;
  }

  function onPointerUp() {
    if (!isPointerDown) return;
    isPointerDown = false;
    const rect = slides[0].getBoundingClientRect();
    const slideWidth = rect.width;
    // inércia simples
    const momentum = velocity * 180; // px
    const totalMove = (lastX - startX) + momentum;
    const threshold = slideWidth * 0.18;
    if (totalMove < -threshold) { index += slidesPerView; }
    else if (totalMove > threshold) { index -= slidesPerView; }
    track.style.transition = 'transform 420ms cubic-bezier(.22,.61,.36,1)';
    update();
  }

  // Pointer + touch events
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('touchstart', (e) => onPointerDown(e), { passive: true });
  viewport.addEventListener('touchmove', (e) => onPointerMove(e), { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });
}