// Script principal para la aplicación de Galería Fotográfica

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
    // Agregar clase active al enlace de navegación actual
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Si el href es '/', solo lo marca como activo en la página de inicio exacta
      if (href === '/' && currentPath === '/') {
        link.classList.add('active');
      }
      // Para otros enlaces, verifica si el path actual comienza con el href
      else if (href !== '/' && currentPath.startsWith(href)) {
        link.classList.add('active');
      }
    });
  
    // Mostrar preview de imagen en formularios de creación/edición
    const imgInput = document.getElementById('imgReferencia');
    if (imgInput) {
      imgInput.addEventListener('change', function() {
        const previewDiv = document.getElementById('imgPreview');
        if (!previewDiv) {
          // Si no existe el div de preview, lo creamos
          const newPreviewDiv = document.createElement('div');
          newPreviewDiv.id = 'imgPreview';
          newPreviewDiv.className = 'text-center mt-3';
          imgInput.parentNode.insertBefore(newPreviewDiv, imgInput.nextSibling);
          
          // Crear la imagen dentro del div
          const previewImg = document.createElement('img');
          previewImg.className = 'img-fluid img-thumbnail';
          previewImg.style.maxHeight = '200px';
          previewImg.alt = 'Vista previa';
          newPreviewDiv.appendChild(previewImg);
          
          // Mostrar la imagen seleccionada
          if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
              previewImg.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
          }
        } else {
          // Si ya existe el div de preview, actualizamos la imagen
          const previewImg = previewDiv.querySelector('img');
          if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
              previewImg.src = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
          }
        }
      });
    }
  
    // Auto-cierre de alertas tras 5 segundos
    const alertas = document.querySelectorAll('.alert');
    if (alertas.length > 0) {
      setTimeout(() => {
        alertas.forEach(alerta => {
          const bsAlert = new bootstrap.Alert(alerta);
          bsAlert.close();
        });
      }, 5000);
    }
  });