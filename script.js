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
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', initAnimations);