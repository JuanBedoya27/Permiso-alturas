function previewImages(event) {
  let files = event.target.files;
  let previewContainer = document.getElementById("preview-container");
  
  // Limpiar las vistas previas anteriores
  previewContainer.innerHTML = "";

  for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (file.type.startsWith("image/")) {
          let reader = new FileReader();
          reader.onload = function (e) {
              let img = document.createElement("img");
              img.src = e.target.result;
              img.style.width = "200px"; // Ajusta el tamaño de la vista previa
              img.style.height = "200px";
              img.style.margin = "5px";
              img.style.objectFit = "cover"; // Para mantener la proporción
              previewContainer.appendChild(img);
          };
          reader.readAsDataURL(file);
      }
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