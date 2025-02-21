function previewImages(event) {
  const files = event.target.files;
  const container = document.getElementById('preview-container');
  container.innerHTML = ''; // Limpiar cualquier imagen previa

  // Recorremos todos los archivos seleccionados
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Opcional: Validar que el archivo sea realmente una imagen
    if (!file.type.startsWith('image/')) {
      continue;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      // Crear un elemento <img> para cada archivo
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '150px';
      img.style.marginRight = '10px';
      img.style.marginBottom = '10px';

      // Agregar la imagen al contenedor
      container.appendChild(img);
    };
    // Leer el archivo como DataURL para la vista previa
    reader.readAsDataURL(file);
  }
}

function autoExpand(field) {
  // Reinicia la altura para recalcular correctamente
  field.style.height = 'inherit';
  // Obtiene los estilos computados (para tener en cuenta padding y bordes)
  var computed = window.getComputedStyle(field);
  // Suma las medidas (border-top, padding-top, scrollHeight, padding-bottom, border-bottom)
  var height = parseFloat(computed.getPropertyValue('border-top-width')) +
    parseFloat(computed.getPropertyValue('padding-top')) +
    field.scrollHeight +
    parseFloat(computed.getPropertyValue('padding-bottom')) +
    parseFloat(computed.getPropertyValue('border-bottom-width'));
  field.style.height = height + 'px';
}

// Ajusta el tamaño en cada entrada de texto
document.addEventListener('input', function (event) {
  if (event.target.tagName.toLowerCase() !== 'textarea') return;
  autoExpand(event.target);
});

// Si los textareas ya tienen contenido al cargar, ajusta su altura
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('textarea').forEach(function (textarea) {
    autoExpand(textarea);
  });
});