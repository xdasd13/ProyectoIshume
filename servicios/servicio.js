 // Menu móvil
 const menuToggle = document.getElementById("menuToggle");
 const navLinks = document.getElementById("navLinks");

 menuToggle.addEventListener("click", () => {
   navLinks.classList.toggle("show");
 });

 // Scroll suave
 document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
     e.preventDefault();
     navLinks.classList.remove("show");

     const target = document.querySelector(this.getAttribute("href"));
     if (target) {
       window.scrollTo({
         top: target.offsetTop - 70,
         behavior: "smooth",
       });
     }
   });
 });

 // Animación de elementos al hacer scroll
 const fadeElements = document.querySelectorAll(".fade-in");

 function checkFade() {
   fadeElements.forEach((element) => {
     const elementTop = element.getBoundingClientRect().top;
     const elementVisible = 150;

     if (elementTop < window.innerHeight - elementVisible) {
       element.classList.add("visible");
     }
   });
 }

 window.addEventListener("scroll", checkFade);
 window.addEventListener("load", checkFade);

 // Testimonios carousel
 const testimonials = document.querySelectorAll(".testimonial");
 const prevBtn = document.querySelector(".prev-btn");
 const nextBtn = document.querySelector(".next-btn");
 let currentTestimonial = 0;

 function showTestimonial(index) {
   testimonials.forEach((testimonial) =>
     testimonial.classList.remove("active")
   );

   if (index < 0) {
     currentTestimonial = testimonials.length - 1;
   } else if (index >= testimonials.length) {
     currentTestimonial = 0;
   } else {
     currentTestimonial = index;
   }

   testimonials[currentTestimonial].classList.add("active");
 }

 prevBtn.addEventListener("click", () => {
   showTestimonial(currentTestimonial - 1);
 });

 nextBtn.addEventListener("click", () => {
   showTestimonial(currentTestimonial + 1);
 });

 // Cambio automático de testimonios
 setInterval(() => {
   showTestimonial(currentTestimonial + 1);
 }, 5000);

 // Modal de galería
 const galleryItems = document.querySelectorAll(".gallery-item");
 const galleryModal = document.getElementById("galleryModal");
 const modalImg = document.getElementById("modalImg");
 const closeModal = document.querySelectorAll(".close-modal");

 galleryItems.forEach((item) => {
   item.addEventListener("click", () => {
     galleryModal.style.display = "flex";
     modalImg.src = item.querySelector("img").src;
   });
 });

 closeModal.forEach((btn) => {
   btn.addEventListener("click", () => {
     galleryModal.style.display = "none";
     document.getElementById("serviceModal").style.display = "none";
   });
 });

 window.addEventListener("click", (e) => {
   if (e.target === galleryModal) {
     galleryModal.style.display = "none";
   }
   if (e.target === document.getElementById("serviceModal")) {
     document.getElementById("serviceModal").style.display = "none";
   }
 });

 // Modal de servicios
 const serviceBtns = document.querySelectorAll(".service-btn");
 const serviceModal = document.getElementById("serviceModal");
 const serviceContent = document.getElementById("serviceContent");

 // Datos de servicios
 const serviceData = {
   quinceanera: {
     title: "Servicios para Quinceañeras",
     description:
       "Hacemos de la celebración de los quince años un momento inolvidable con nuestros servicios de:",
     items: [
       "Decoración temática personalizada",
       "Coreografías originales",
       "Fotografía y video profesional",
       "Vestidos y accesorios exclusivos",
       "Salones y jardines para eventos",
       "Catering y pastelería de lujo",
       "Maquillaje y peinado profesional",
       "Shows y sorpresas especiales",
     ],
     image: "../servicios/img/quinseañera.jpg",
   },
   boda: {
     title: "Servicios para Bodas",
     description:
       "Planificación integral de bodas con atención personalizada:",
     items: [
       "Decoración floral personalizada",
       "Mesas de postres y catering gourmet",
       "Fotografía y videografía profesional",
       "Música en vivo y DJ",
       "Coordinación del día del evento",
       "Iluminación arquitectónica",
       "Invitaciones y papelería de lujo",
       "Luna de miel y traslados",
     ],
     image: "../servicios/img/bodas.jpg",
   },
   bautizo: {
     title: "Servicios para Bautizos",
     description:
       "Celebra este sacramento con nuestros servicios especializados:",
     items: [
       "Decoración temática religiosa o infantil",
       "Recordatorios personalizados",
       "Fotografía y video profesional",
       "Catering y pastelería",
       "Organización de la ceremonia",
       "Animación infantil",
       "Souvenirs para invitados",
       "Coordinación de la recepción",
     ],
     image: "../servicios/img/bautizos.jpg",
   },
   cumpleanos: {
     title: "Servicios para Cumpleaños",
     description: "Organizamos fiestas temáticas para todas las edades:",
     items: [
       "Decoración temática personalizada",
       "Animación y entretenimiento",
       "Catering y mesa de dulces",
       "Fotografía y video del evento",
       "Juegos y actividades",
       "Pastel personalizado",
       "Invitaciones digitales o físicas",
       "Souvenirs para invitados",
     ],
     image: "../servicios/img/cumpleaños.jpg",
   },
   fotografia: {
     title: "Servicios Fotográficos",
     description:
       "Capturamos los momentos más especiales con nuestros servicios de:",
     items: [
       "Fotografía de eventos sociales",
       "Books personales y familiares",
       "Sesiones pre-evento (pre-boda, pre-XV)",
       "Fotografía de producto",
       "Sesiones en locaciones exteriores",
       "Edición profesional de imágenes",
       "Álbumes físicos y digitales",
       "Video y montajes multimedia",
     ],
     image: "../servicios/img/fotografica.jpg",
   },
   babyshower: {
     title: "Servicios para Baby Showers",
     description:
       "Celebra la llegada del bebé con nuestros servicios especiales:",
     items: [
       "Decoración temática para niño o niña",
       "Juegos y actividades interactivas",
       "Mesas de dulces personalizadas",
       "Fotografía y video del evento",
       "Souvenirs para invitados",
       "Catering especializado",
       "Invitaciones digitales o físicas",
       "Recuerdos personalizados",
     ],
     image: "./../servicios/img/babyshower.jpg",
   },
 };

 // Mostrar detalles del servicio
 serviceBtns.forEach((btn) => {
   btn.addEventListener("click", (e) => {
     e.preventDefault();
     const service = serviceData[btn.dataset.service];

     if (service) {
       // Crear contenido HTML
       let html = `
<div style="background: white; padding: 2rem; border-radius: 10px; max-width: 800px; margin: 0 auto;">
<h2 style="color: #ff5e84; margin-bottom: 1rem;">${service.title}</h2>
<img src="${service.image}" alt="${service.title}" style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 1rem;">
<p style="margin-bottom: 1rem;">${service.description}</p>
<ul style="list-style-type: none; padding: 0;">
`;

       service.items.forEach((item) => {
         html += `<li style="padding: 0.5rem 0; border-bottom: 1px solid #eee;"><i class="fas fa-check" style="color: #7d3cff; margin-right: 0.5rem;"></i>${item}</li>`;
       });

       html += `
</ul>
<button class="btn" style="margin-top: 1rem; background: #7d3cff;">¡Solicitar ahora!</button>
</div>
`;

       serviceContent.innerHTML = html;
       serviceModal.style.display = "flex";
     }
   });
 });

 // Formulario de contacto
 document
   .getElementById("contactForm")
   .addEventListener("submit", function (e) {
     e.preventDefault();
     alert(
       "¡Gracias por contactarnos! Nos pondremos en contacto contigo muy pronto."
     );
     this.reset();
   });

 document.addEventListener("DOMContentLoaded", function () {
   const menuToggle = document.getElementById("menuToggle");
   const navMenu = document.querySelector(".nav-menu");
   const hamburger = document.querySelector(".hamburger");
   const navLinks = document.querySelectorAll(".nav-link");
   const navbar = document.querySelector(".navbar");
   const socialIcons = document.querySelector(".social-icons");

   // Añadir clase active al link activo según la sección visible
   function setActiveLink() {
     let sections = document.querySelectorAll("section");
     let scrollPosition = window.scrollY + 100;

     sections.forEach((section) => {
       let sectionTop = section.offsetTop;
       let sectionHeight = section.offsetHeight;
       let sectionId = section.getAttribute("id");

       if (
         scrollPosition >= sectionTop &&
         scrollPosition < sectionTop + sectionHeight
       ) {
         navLinks.forEach((link) => {
           link.classList.remove("active");
           if (link.getAttribute("href") === "#" + sectionId) {
             link.classList.add("active");
           }
         });
       }
     });
   }

   // Toggle menú en móvil
   menuToggle.addEventListener("click", () => {
     navMenu.classList.toggle("active");
     hamburger.classList.toggle("open");

     // Mover los iconos sociales al menú en móvil
     if (window.innerWidth <= 768) {
       if (navMenu.classList.contains("active")) {
         navMenu.appendChild(socialIcons.cloneNode(true));
       } else {
         const menuSocialIcons = navMenu.querySelector(".social-icons");
         if (menuSocialIcons) {
           navMenu.removeChild(menuSocialIcons);
         }
       }
     }
   });

   // Cerrar menú al hacer click en un link
   navLinks.forEach((link) => {
     link.addEventListener("click", (event) => {
       navMenu.classList.remove("active");
       hamburger.classList.remove("open");

       // Scroll suave a la sección
       event.preventDefault();
       const targetId = link.getAttribute("href");
       const targetSection = document.querySelector(targetId);

       window.scrollTo({
         top: targetSection.offsetTop - 80,
         behavior: "smooth",
       });

       // Actualizar URL con hash sin scroll
       history.pushState(null, null, targetId);
     });
   });

   // Cambiar navbar al scroll
   window.addEventListener("scroll", () => {
     if (window.scrollY > 50) {
       navbar.classList.add("scrolled");
     } else {
       navbar.classList.remove("scrolled");
     }
     setActiveLink();
   });

   // Inicializar active link
   setActiveLink();
 });