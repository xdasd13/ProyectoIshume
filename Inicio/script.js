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




// Código para la funcionalidad de Text-to-Speech
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const ttsButton = document.getElementById('ttsButton');
    const ttsVolumeControl = document.getElementById('ttsVolume');
    const ttsRateControl = document.getElementById('ttsRate');
    const ttsVoiceSelect = document.getElementById('ttsVoice');
    const ttsProgressBar = document.getElementById('ttsProgressBar');
    
    // Variables de estado
    let isSpeaking = false;
    let speechUtterance = null;
    let currentParagraphIndex = 0;
    let paragraphs = [];
    let speechSynth = window.speechSynthesis;
    
    // Obtener los textos de la sección "Acerca de nosotros"
    function collectText() {
        const aboutSection = document.querySelector('.about-text');
        const textNodes = aboutSection.querySelectorAll('h2, h3, p');
        
        paragraphs = [];
        textNodes.forEach(node => {
            if (node.tagName === 'H2' || node.tagName === 'H3' || node.tagName === 'P') {
                paragraphs.push(node.textContent);
            }
        });
        
        return paragraphs.join(' ');
    }
    
    // Cargar voces disponibles
    function loadVoices() {
        // Limpiar opciones actuales
        ttsVoiceSelect.innerHTML = '<option value="">Seleccionar voz</option>';
        
        // Obtener voces
        const voices = speechSynth.getVoices();
        
        // Filtrar voces en español
        const spanishVoices = voices.filter(voice => 
            voice.lang.includes('es') || voice.lang.includes('spa'));
        
        // Si no hay voces en español, usar todas las voces
        const voicesToUse = spanishVoices.length > 0 ? spanishVoices : voices;
        
        // Añadir voces al selector
        voicesToUse.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = `${voice.name} (${voice.lang})`;
            ttsVoiceSelect.appendChild(option);
            
            // Seleccionar automáticamente una voz en español
            if (voice.lang.includes('es-') || voice.lang.includes('es_')) {
                ttsVoiceSelect.value = voice.name;
            }
        });
    }
    
    // Si las voces ya están cargadas, cargarlas inmediatamente
    if (speechSynth.getVoices().length > 0) {
        loadVoices();
    }
    
    // Este evento se dispara cuando las voces están disponibles
    speechSynth.onvoiceschanged = loadVoices;
    
    // Iniciar o pausar la lectura
    function toggleSpeech() {
        if (isSpeaking) {
            pauseSpeech();
        } else {
            playSpeech();
        }
    }
    
    // Iniciar la lectura
    function playSpeech() {
        // Si estaba pausado, reanudar
        if (speechUtterance && speechSynth.paused) {
            speechSynth.resume();
            isSpeaking = true;
            ttsButton.classList.add('speaking');
            return;
        }
        
        // Detener cualquier lectura previa
        speechSynth.cancel();
        
        // Crear nueva utterance
        const text = collectText();
        speechUtterance = new SpeechSynthesisUtterance(text);
        
        // Configurar parámetros
        speechUtterance.volume = parseFloat(ttsVolumeControl.value);
        speechUtterance.rate = parseFloat(ttsRateControl.value);
        
        // Seleccionar voz
        if (ttsVoiceSelect.value) {
            const voices = speechSynth.getVoices();
            const selectedVoice = voices.find(voice => voice.name === ttsVoiceSelect.value);
            if (selectedVoice) {
                speechUtterance.voice = selectedVoice;
            }
        }
        
        // Manejadores de eventos
        speechUtterance.onstart = () => {
            isSpeaking = true;
            ttsButton.classList.add('speaking');
        };
        
        speechUtterance.onend = () => {
            isSpeaking = false;
            ttsButton.classList.remove('speaking');
            ttsProgressBar.style.width = '0%';
        };
        
        speechUtterance.onpause = () => {
            isSpeaking = false;
            ttsButton.classList.remove('speaking');
        };
        
        speechUtterance.onresume = () => {
            isSpeaking = true;
            ttsButton.classList.add('speaking');
        };
        
        // Actualizar barra de progreso
        let lastCharIndex = 0;
        speechUtterance.onboundary = (event) => {
            if (event.name === 'word') {
                const progress = (event.charIndex / text.length) * 100;
                ttsProgressBar.style.width = `${progress}%`;
                lastCharIndex = event.charIndex;
            }
        };
        
        // Iniciar lectura
        speechSynth.speak(speechUtterance);
    }
    
    // Pausar la lectura
    function pauseSpeech() {
        if (speechSynth.speaking && !speechSynth.paused) {
            speechSynth.pause();
            isSpeaking = false;
            ttsButton.classList.remove('speaking');
        }
    }
    
    // Event listeners
    ttsButton.addEventListener('click', toggleSpeech);
    
    ttsVolumeControl.addEventListener('input', function() {
        if (speechUtterance) {
            speechUtterance.volume = parseFloat(this.value);
        }
    });
    
    ttsRateControl.addEventListener('input', function() {
        if (speechUtterance) {
            speechUtterance.rate = parseFloat(this.value);
        }
    });
    
    ttsVoiceSelect.addEventListener('change', function() {
        // Si está leyendo, reiniciar con la nueva voz
        if (isSpeaking) {
            pauseSpeech();
            playSpeech();
        }
    });
    
    // Limpiar cuando el usuario abandona la página
    window.addEventListener('beforeunload', function() {
        if (speechSynth.speaking) {
            speechSynth.cancel();
        }
    });
});

  // Script para el Chatbox
        document.addEventListener('DOMContentLoaded', function() {
            const chatButton = document.querySelector('.chat-button');
            const chatPopup = document.querySelector('.chat-popup');
            const closeChat = document.querySelector('.close-chat');
            const chatInput = document.querySelector('.chat-input');
            const sendButton = document.querySelector('.send-button');
            const chatBody = document.querySelector('.chat-body');
            const chatTyping = document.querySelector('.chat-typing');
            
            // Respuestas predefinidas
            const predefinedResponses = {
                'hola': '¡Hola! ¿Cómo puedo ayudarte con tus necesidades de fotografía o video?',
                'precio': 'Nuestros precios varían según el tipo de evento y los servicios requeridos. ¿Te gustaría cotizar un paquete personalizado? Podemos contactarte para discutir detalles.',
                'servicios': 'Ofrecemos servicios de fotografía y video para bodas, quinceañeras, graduaciones, cumpleaños y eventos corporativos. ¿Hay algún servicio específico que te interese?',
                'ubicación': 'Estamos ubicados en Av. Luis Massaro 791, Chincha Alta, Perú. Puedes encontrarnos fácilmente en el mapa o contactarnos para más indicaciones.',
                'horario': 'Nuestro horario de atención es de lunes a viernes de 9:00 AM a 6:00 PM y sábados de 10:00 AM a 2:00 PM.',
                'contacto': 'Puedes contactarnos al teléfono 991 157 028 o enviarnos un email a contacto@ishumeproductora.com',
                'boda': 'Para bodas ofrecemos paquetes que incluyen fotografía, video, álbum digital, sesión pre-boda y cobertura completa del evento. ¿Te gustaría solicitar una cotización?',
                'quinceañera': 'Nuestros paquetes para quinceañeras incluyen fotografía profesional, video, sesión temática y cobertura del evento. Podemos personalizar un paquete según tus necesidades.',
                'graduación': 'Tenemos opciones especiales para graduaciones que incluyen fotos individuales, grupales y cobertura del evento. ¿Es para una graduación escolar o universitaria?',
                'equipo': 'Contamos con un equipo de fotógrafos y videógrafos profesionales con amplia experiencia en eventos sociales y producción visual.',
                'portafolio': 'Puedes ver más de nuestro trabajo en la sección de Galería de nuestra página o en nuestras redes sociales. ¿Te gustaría que te comparta algún trabajo específico?',
                'reserva': 'Para reservar nuestros servicios solicitamos un anticipo del 30% del total del paquete elegido. ¿Te gustaría que te contactemos para realizar una reserva?'
            };
            
            // Función para abrir el chat
            chatButton.addEventListener('click', function() {
                chatPopup.classList.add('active');
                setTimeout(() => {
                    chatInput.focus();
                }, 300);
            });
            
            // Función para cerrar el chat
            closeChat.addEventListener('click', function() {
                chatPopup.classList.remove('active');
            });
            
            // Función para enviar mensaje
            function sendMessage() {
                const message = chatInput.value.trim();
                if (message !== '') {
                    // Agregar mensaje del usuario
                    addMessage(message, 'sent');
                    
                    // Limpiar input
                    chatInput.value = '';
                    
                    // Mostrar indicador de escritura
                    showTypingIndicator();
                    
                    // Simular respuesta después de un breve retraso
                    setTimeout(() => {
                        // Ocultar indicador de escritura
                        hideTypingIndicator();
                        
                        // Procesar respuesta
                        const response = getResponse(message);
                        addMessage(response, 'received');
                        
                        // Scroll al último mensaje
                        scrollToBottom();
                    }, 1500);
                }
            }
            
            // Enviar mensaje con botón
            sendButton.addEventListener('click', sendMessage);
            
            // Enviar mensaje con tecla Enter
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Habilitar/deshabilitar botón de envío según el contenido del input
            chatInput.addEventListener('input', function() {
                sendButton.disabled = chatInput.value.trim() === '';
            });
            
            // Función para agregar mensaje al chat
            function addMessage(text, type) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('chat-message', `message-${type}`);
                
                // Contenido del mensaje
                messageDiv.textContent = text;
                
                // Agregar marca de tiempo
                const timestamp = document.createElement('div');
                timestamp.classList.add('chat-timestamp');
                timestamp.textContent = getCurrentTime();
                messageDiv.appendChild(timestamp);
                
                // Agregar al chat
                chatBody.appendChild(messageDiv);
                
                // Scroll al último mensaje
                scrollToBottom();
            }
            
            // Función para obtener la hora actual formateada
            function getCurrentTime() {
                const now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                
                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                
                return `${hours}:${minutes} ${ampm}`;
            }
            
            // Función para mostrar indicador de escritura
            function showTypingIndicator() {
                chatTyping.style.display = 'block';
                scrollToBottom();
            }
            
            // Función para ocultar indicador de escritura
            function hideTypingIndicator() {
                chatTyping.style.display = 'none';
            }
            
            // Función para hacer scroll al último mensaje
            function scrollToBottom() {
                chatBody.scrollTop = chatBody.scrollHeight;
            }
            
            // Función para obtener respuesta según el mensaje
            function getResponse(message) {
                message = message.toLowerCase();
                
                // Buscar coincidencias en respuestas predefinidas
                for (const keyword in predefinedResponses) {
                    if (message.includes(keyword)) {
                        return predefinedResponses[keyword];
                    }
                }
                
                // Si no hay coincidencias específicas
                if (message.includes('gracias')) {
                    return '¡De nada! Estamos para ayudarte. ¿Hay algo más en lo que pueda asistirte?';
                } else if (message.includes('costo') || message.includes('valor') || message.includes('presupuesto')) {
                    return 'Los costos de nuestros servicios dependen del tipo de evento, duración y servicios específicos. ¿Te gustaría una cotización personalizada?';
                } else if (message.includes('descuento') || message.includes('promoción') || message.includes('oferta')) {
                    return 'Ocasionalmente ofrecemos promociones especiales. Te recomendaría suscribirte a nuestro boletín o seguirnos en redes sociales para estar al tanto de las mismas.';
                } else if (message.includes('cámara') || message.includes('equipo') || message.includes('tecnología')) {
                    return 'Utilizamos equipos profesionales de última generación que incluyen cámaras DSLR y sin espejo, drones, estabilizadores, iluminación profesional y software de edición avanzado.';
                } else if (message.includes('reserva') || message.includes('fecha') || message.includes('disponibilidad')) {
                    return 'Para verificar disponibilidad y realizar una reserva, necesitaríamos la fecha exacta de tu evento. ¿Te gustaría proporcionarnos más detalles?';
                }
                
                // Respuesta genérica si no se encuentra coincidencia
                return 'Gracias por tu mensaje. Para darte información más precisa, ¿podrías proporcionar más detalles sobre lo que estás buscando? También puedes contactarnos directamente al 991 157 028.';
            }
            
            // Inicializar estado del botón de envío
            sendButton.disabled = true;
            
            // Mostrar indicador de escritura inicial y luego ocultarlo
            showTypingIndicator();
            setTimeout(hideTypingIndicator, 1500);
            
            // Añadir notificación de nuevos mensajes
            let chatNotificationTimeout;
            
            function showChatNotification() {
                if (!chatPopup.classList.contains('active')) {
                    chatButton.classList.add('notification');
                    
                    // Eliminar la notificación después de un tiempo
                    clearTimeout(chatNotificationTimeout);
                    chatNotificationTimeout = setTimeout(() => {
                        chatButton.classList.remove('notification');
                    }, 3000);
                }
            }
            
            // Simular un mensaje de seguimiento después de un tiempo
            setTimeout(() => {
                if (!chatPopup.classList.contains('active')) {
                    showChatNotification();
                    
                    // Cuando se abra el chat después de la notificación
                    chatButton.addEventListener('click', function respondToNotification() {
                        // Eliminar este listener específico después de usarlo una vez
                        chatButton.removeEventListener('click', respondToNotification);
                        
                        // Mostrar mensaje de seguimiento después de abrir
                        setTimeout(() => {
                            showTypingIndicator();
                            setTimeout(() => {
                                hideTypingIndicator();
                                addMessage('¿Estás interesado en alguno de nuestros servicios para un evento próximo? Estaré encantado de ayudarte.', 'received');
                            }, 1500);
                        }, 1000);
                    }, { once: true });
                }
            }, 20000); // Mostrar después de 20 segundos de inactividad
        });