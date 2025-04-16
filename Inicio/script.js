// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loader').style.display = 'none';
        }, 1000);
    }, 2000);
});

// Animación para el header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Filtro de galería
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al botón clickeado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filtrar elementos de la galería
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Animación para el scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Cursor personalizado
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
});

// Efecto hover para elementos interactivos
const links = document.querySelectorAll('a, button, .gallery-item, .service-card');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = 'rgba(255, 107, 0, 0.8)';
        cursor.style.width = '30px';
        cursor.style.height = '30px';
        cursorFollower.style.borderColor = 'rgba(255, 107, 0, 0.8)';
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = 'rgba(255, 107, 0, 0.5)';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorFollower.style.borderColor = 'rgba(255, 107, 0, 0.5)';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
});

// Animación para los elementos al hacer scroll
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Elementos a animar
const animElements = document.querySelectorAll('.service-card, .about-image, .about-text, .gallery-item, .testimonial-card, .contact-info, .contact-form');

animElements.forEach(element => {
    observer.observe(element);
});

// Efecto de animación para las secciones
document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos dinámicos para la animación
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card, .about-image, .about-text, .gallery-item, .testimonial-card, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Formulario de contacto con SweetAlert
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simular envío del formulario
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // SweetAlert - asegúrate de que la librería esté cargada
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: '¡Mensaje enviado!',
                    text: 'Nos pondremos en contacto contigo pronto.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#FF6B00'  // Color naranja para el botón
                });
            } else {
                // Fallback por si SweetAlert no está disponible
                alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
            }
            
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// JavaScript enhancements for the collage

// Set animation index for staggered animations
document.addEventListener('DOMContentLoaded', () => {
    const collageImages = document.querySelectorAll('.collage-image');
    
    collageImages.forEach((image, index) => {
        // Set custom animation delay using CSS variables
        image.style.setProperty('--index', index);
        
        // Add parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            // Different movement amount for each image creates depth
            const depthFactor = (index % 4 + 1) / 3;
            
            image.style.transform = `translate(${moveX * depthFactor}px, ${moveY * depthFactor}px)`;
        });
    });
    
    // Shapes movement on scroll
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = scrollY * speed;
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Add video background fallback if video can't be played
    const videoElement = document.querySelector('.background-video');
    if (videoElement) {
        videoElement.addEventListener('error', () => {
            // If video fails, replace with image background
            const collage = document.querySelector('.collage');
            collage.style.backgroundImage = 'url("./image/fallback-background.jpg")';
            collage.style.backgroundSize = 'cover';
            collage.style.backgroundPosition = 'center';
        });
    }
    
    // Add an intersection observer to start animations when the collage is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.collage-image').forEach(img => {
                    img.style.animationPlayState = 'running';
                });
            } else {
                document.querySelectorAll('.collage-image').forEach(img => {
                    img.style.animationPlayState = 'paused';
                });
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(document.querySelector('.collage'));
});

// Create dynamic hover effect for each image
const collageImages = document.querySelectorAll('.collage-image');
collageImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.zIndex = '10';
        image.style.transform = 'scale(1.1)';
        image.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.5)';
        image.style.filter = 'saturate(1.5) contrast(1.2)';
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.zIndex = '2';
        image.style.transform = '';
        image.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        image.style.filter = 'saturate(0.8) contrast(1.1)';
    });
});