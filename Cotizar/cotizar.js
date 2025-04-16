// Funcionalidad del sistema de cotización
const questions = [
  {
    question: "¿Qué tipo de servicios deseas realizar?",
    options: [
      "Bautizos",
      "Bodas",
      "Quinceañera",
      "Cumpleaños",
      "Sesión de fotos",
      "Promociones",
    ],
  },
  {
    question: "¿Qué plan desea para su evento?",
    options: ["Básico", "Premium", "Golden"],
  },
  { question: "¿Desea cuadros foto firma?", options: ["Sí", "No"] },
  {
    question: "¿Cómo llego a nosotros?",
    options: [
      "Por recomendaciones de amigos o familiares",
      "Por las redes sociales (Facebook, TikTok)",
      "Prefiero saltar esta pregunta",
    ],
  },
  {
    question: "¿Nos recomendaría con sus familiares o personas de confianza?",
    options: ["Sí", "No"],
  },
  { question: "Déjanos tu número para contactarnos", options: [] },
];

let currentStep = 0;
let responses = [];

function loadQuestion() {
  document.getElementById("question").textContent =
    questions[currentStep].question;
  const optionsDiv = document.getElementById("options");
  const phoneInput = document.querySelector(".phone-input-container");
  const nextBtn = document.getElementById("next-btn");

  optionsDiv.innerHTML = "";
  phoneInput.style.display = "none";

  // Actualizar indicador de progreso
  document.getElementById("progress-bar").style.width = `${
    ((currentStep + 1) / questions.length) * 100
  }%`;
  document.getElementById("current-step").textContent = `Paso ${
    currentStep + 1
  }`;
  document.getElementById("total-steps").textContent = `de ${questions.length}`;

  if (questions[currentStep].options.length > 0) {
    questions[currentStep].options.forEach((option) => {
      let btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("option-btn");
      btn.onclick = () => {
        responses.push({
          question: questions[currentStep].question,
          answer: option,
        });
        // Añadir efecto de selección
        document
          .querySelectorAll(".option-btn")
          .forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        setTimeout(() => nextStep(), 300);
      };
      optionsDiv.appendChild(btn);
    });
  } else {
    phoneInput.style.display = "flex";
    nextBtn.textContent = "Finalizar";
  }
}

function nextStep() {
  if (currentStep === questions.length - 1) {
    let phoneNumber = document.getElementById("phone-number").value.trim();
    if (!/^\d{9}$/.test(phoneNumber)) {
      alert("Por favor, ingrese un número válido de 9 dígitos.");
      return;
    }
    responses.push({
      question: "Número de contacto",
      answer: phoneNumber,
    });
    sendWhatsApp();
  } else {
    currentStep++;
    loadQuestion();

    // Animar el contenedor de la pregunta
    const questionContainer = document.querySelector(".question-container");
    questionContainer.style.opacity = "0";
    questionContainer.style.transform = "translateY(20px)";

    setTimeout(() => {
      questionContainer.style.opacity = "1";
      questionContainer.style.transform = "translateY(0)";
    }, 200);
  }
}

function sendWhatsApp() {
  let message = "Hola, estas son mis respuestas:%0A";
  responses.forEach((res) => {
    message += `*${res.question}*%0A${res.answer}%0A%0A`;
  });

  let whatsappURL = `https://web.whatsapp.com/send?phone=51991157028&text=${message}`;
  window.open(whatsappURL, "_blank");

  // Mostrar mensaje de confirmación
  const quotationContainer = document.querySelector(".quotation-container");
  quotationContainer.innerHTML = `
      <div class="success-message">
        <i class="fas fa-check-circle"></i>
        <h3>¡Gracias por tu interés!</h3>
        <p>Hemos recibido tu información y nos pondremos en contacto contigo a la brevedad.</p>
        <a href="#services" class="btn btn-primary">Volver a servicios</a>
      </div>
    `;
}

// Funciones adicionales para interactividad
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar la cotización
  loadQuestion();

  // Navbar scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Menú móvil
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    mobileMenu.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Animación al scroll para elementos
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".service-card, .testimonial-card, .about-content, .contact-form"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Configurar animaciones iniciales
  document
    .querySelectorAll(
      ".service-card, .testimonial-card, .about-content, .contact-form"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "all 0.6s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  setTimeout(animateOnScroll, 500); // Primera verificación después de cargar

  // Envío del formulario de contacto
  const contactForm = document.querySelector(".contact-form form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const formElements = this.elements;

    // Animación de envío
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    // Simulación de envío
    setTimeout(() => {
      this.innerHTML = `
          <div class="success-message text-center">
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
          </div>
        `;
    }, 1500);
  });

  // Efectos hover en botones
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.paddingRight = "35px";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.paddingRight = "24px";
    });
  });

  // Animación para tarjetas de servicios
  document.querySelectorAll(".service-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Animación para testimonios
  document.querySelectorAll(".testimonial-card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // Efectos de animación para el logo
  const logoIcon = document.querySelector(".logo-icon");
  setInterval(() => {
    logoIcon.classList.add("pulse");
    setTimeout(() => {
      logoIcon.classList.remove("pulse");
    }, 1000);
  }, 5000);
});

// Efectos parallax para el fondo del hero
let hero = document.querySelector(".hero");
window.addEventListener("scroll", function () {
  let scrollPosition = window.pageYOffset;
  hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
});

// Contador de números para la sección de estadísticas
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50; // Ajustar velocidad
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    element.textContent = Math.round(current);
  }, 30);
}

// Iniciar contadores cuando sean visibles en la pantalla
function initCounters() {
  const counters = document.querySelectorAll(".counter-number");
  if (counters.length === 0) return;

  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const checkCounters = () => {
    counters.forEach((counter) => {
      if (isInViewport(counter) && !counter.getAttribute("data-counted")) {
        counter.setAttribute("data-counted", true);
        const target = parseInt(counter.getAttribute("data-target"));
        animateCounter(counter, target);
      }
    });
  };

  window.addEventListener("scroll", checkCounters);
  checkCounters(); // Verificar al cargar
}

// Carrusel testimonios automático
function initTestimonialCarousel() {
  const testimonialsContainer = document.querySelector(".testimonials-grid");
  if (!testimonialsContainer) return;

  // Clone el primer testimonio al final para un carrusel infinito
  const firstTestimonial =
    testimonialsContainer.querySelector(".testimonial-card");
  if (firstTestimonial) {
    const clone = firstTestimonial.cloneNode(true);
    testimonialsContainer.appendChild(clone);
  }

  let currentSlide = 0;
  const testimonials =
    testimonialsContainer.querySelectorAll(".testimonial-card");
  const totalSlides = testimonials.length;

  const moveToSlide = (index) => {
    testimonialsContainer.style.transform = `translateX(-${
      (index * 100) / totalSlides
    }%)`;
  };

  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveToSlide(currentSlide);

    // Si llegamos al último (que es el clon), volvemos al primero sin transición
    if (currentSlide === totalSlides - 1) {
      setTimeout(() => {
        testimonialsContainer.style.transition = "none";
        currentSlide = 0;
        moveToSlide(0);
        setTimeout(() => {
          testimonialsContainer.style.transition = "transform 0.5s ease";
        }, 50);
      }, 500);
    }
  }, 5000);
}

// Inicializar cuando la página esté lista
window.addEventListener("load", function () {
  initCounters();
  setTimeout(() => {
    initTestimonialCarousel();
  }, 1000);

  // Añadir efecto de tipografía animada al hero
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i] === " " ? " " : text[i];
      span.style.opacity = "0";
      span.style.transition = "opacity 0.1s ease";
      span.style.animationDelay = `${i * 0.1}s`;
      heroTitle.appendChild(span);
    }

    setTimeout(() => {
      const spans = heroTitle.querySelectorAll("span");
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.style.opacity = "1";
        }, i * 100);
      });
    }, 500);
  }
});

// Añadir estilos CSS adicionales programáticamente
const style = document.createElement("style");
style.textContent = `
    .option-btn.selected {
      background-color: var(--primary) !important;
      border-color: var(--primary) !important;
      transform: scale(1.05);
    }
    
    .success-message {
      text-align: center;
      padding: 30px;
    }
    
    .success-message i {
      font-size: 5rem;
      color: var(--primary);
      margin-bottom: 20px;
    }
    
    .success-message h3 {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }
    
    .success-message p {
      margin-bottom: 25px;
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
    
    .pulse {
      animation: pulse 1s ease-in-out;
    }
    
    /* Estilos para el slider de testimonios */
    .testimonials-grid {
      display: flex;
      transition: transform 0.5s ease;
      width: calc(100% * var(--total-slides, 3));
    }
    
    .testimonial-card {
      flex: 0 0 calc(100% / var(--total-slides, 3));
      padding: 0 15px;
    }
    
    /* Botones de navegación para slider */
    .slider-nav {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
    
    .slider-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.2);
      margin: 0 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .slider-dot.active {
      background-color: var(--primary);
      transform: scale(1.2);
    }
    
    /* Animación para servicio destacado */
    .service-card.featured::before {
      content: 'Destacado';
      position: absolute;
      top: 20px;
      right: 0;
      background-color: var(--primary);
      color: white;
      padding: 5px 15px;
      font-size: 0.8rem;
      font-weight: 600;
      z-index: 2;
      transform: translateX(0) rotate(0);
      animation: featureBadge 5s infinite alternate;
    }
    
    @keyframes featureBadge {
      0%, 100% {
        transform: translateX(0) rotate(0);
      }
      50% {
        transform: translateX(-5px) rotate(-5deg);
      }
    }
    
    /* Estilo para contador */
    .counter-container {
      text-align: center;
    }
    
    .counter-number {
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 10px;
    }
    
    .counter-label {
      font-size: 1.1rem;
      color: var(--dark);
    }
  
    
    /* Nuevo diseño para el formulario del teléfono */
    .phone-form-container,
    form[data-step="phone"],
    .phone-input-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0 auto;
    }
  
    /* Contenedor del campo de teléfono */
    .phone-input-wrapper {
      width: 100%;
      margin-bottom: 25px;
      position: relative;
      max-width: 320px; /* Reducido para que sea menos ancho */
    }
  
    /* Estilo para el campo de teléfono */
    input[type="tel"], 
    input[type="text"][name="phone"],
    input[placeholder*="número"],
    .phone-input {
      width: 100% !important;
      padding: 12px 15px 12px 40px;
      font-size: 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      max-width: 320px; /* Ancho máximo reducido */
    }
  
    /* Estilo para el ícono del teléfono */
    .phone-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #FF5722;
    }
  
    /* Estilo para el botón de finalizar */
    button[type="submit"],
    .submit-button,
    .form-submit-btn,
    button:contains("FINALIZAR") {
      font-size: 1rem; /* Texto un poco más pequeño */
      font-weight: 600;
      padding: 10px 25px; /* Padding reducido */
      width: auto; /* Ancho automático basado en contenido */
      max-width: 180px; /* Ancho máximo reducido */
      border-radius: 40px;
      background-color: #FF5722;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
      text-align: center;
      display: block;
    }
  
    /* Eliminar la disposición en línea que pueda estar causando el problema */
    .form-row,
    .input-group,
    .form-group {
      display: block !important;
      width: 100%;
      flex-direction: column !important;
    }
  
    /* Eliminar cualquier float que pueda estar afectando */
    .form-control,
    .form-group,
    .form-element {
      float: none !important;
      display: block;
    } 
  `;

document.head.appendChild(style);

// Detector de desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Añadir efecto de desplazamiento suave
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Ajustar para el navbar fijo
        behavior: "smooth",
      });

      // Actualizar URL sin recargar la página
      history.pushState(null, null, targetId);
    }
  });
});

// Marca como "featured" el servicio de Bodas
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length > 1) {
    // Marca el segundo servicio (Bodas)
    serviceCards[1].classList.add("featured");
  }

  // Añadir contador de visitantes simulado al final de la página
  const footer = document.querySelector(".footer-container");
  if (footer) {
    const visitorCounter = document.createElement("div");
    visitorCounter.className = "visitor-counter";
    visitorCounter.innerHTML = `
        <p>Visitantes: <span id="visitor-count">0</span></p>
      `;
    footer.appendChild(visitorCounter);

    // Simular contador creciente
    let count = Math.floor(Math.random() * 500) + 1500;
    document.getElementById("visitor-count").textContent = count;

    setInterval(() => {
      if (Math.random() > 0.7) {
        count++;
        document.getElementById("visitor-count").textContent = count;
      }
    }, 10000);
  }
});

// Testimonio
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("testimonialsTrack");
  const items = track.querySelectorAll(".testimonial-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.querySelectorAll(".indicator");

  let currentIndex = 0;
  const itemWidth = 100 / items.length;
  let startX, moveX;
  let isMobile = window.innerWidth < 768;
  let itemsPerView = isMobile ? 1 : window.innerWidth < 992 ? 2 : 3;

  // Configuración inicial
  updateCarousel();

  // Responsive listener
  window.addEventListener("resize", () => {
    isMobile = window.innerWidth < 768;
    itemsPerView = isMobile ? 1 : window.innerWidth < 992 ? 2 : 3;
    updateCarousel();
  });

  // Event listeners
  prevBtn.addEventListener("click", () => {
    currentIndex = Math.max(currentIndex - 1, 0);
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = Math.min(currentIndex + 1, items.length - itemsPerView);
    updateCarousel();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      currentIndex = Math.min(index, items.length - itemsPerView);
      updateCarousel();
    });
  });

  // Touch events para dispositivos móviles
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    if (startX - moveX > 50) {
      // Swipe izquierda
      currentIndex = Math.min(currentIndex + 1, items.length - itemsPerView);
      updateCarousel();
    } else if (moveX - startX > 50) {
      // Swipe derecha
      currentIndex = Math.max(currentIndex - 1, 0);
      updateCarousel();
    }
  });

  // Función para actualizar el carrusel
  function updateCarousel() {
    // Actualizar la posición del track
    const translateValue = -currentIndex * (100 / items.length);
    track.style.transform = `translateX(${translateValue}%)`;

    // Actualizar estados de los botones
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= items.length - itemsPerView;

    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });

    // Actualizar apariencia de los botones
    prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";

    // Añadir clase 'active' al elemento actual para efecto de escala
    items.forEach((item, index) => {
      if (index >= currentIndex && index < currentIndex + itemsPerView) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Efecto de desplazamiento automático (opcional)
  /*
      setInterval(() => {
        if (currentIndex < items.length - itemsPerView) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }, 6000);
      */
});
// Preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".loader").style.display = "none";
    }, 1000);
  }, 2000);
});
