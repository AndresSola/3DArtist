// Añadir evento de clic al botón ventana desplegable
document.addEventListener('DOMContentLoaded', () => {
  const infoBox = document.getElementById('infoBox');
  const toggleButton = document.getElementById('toggleButton');
  let isInfoBoxVisible = false;

  function toggleInfoBox() {
      isInfoBoxVisible = !isInfoBoxVisible;
      infoBox.classList.toggle('visible', isInfoBoxVisible);
      toggleButton.classList.toggle('open', isInfoBoxVisible);
      // Cambiar la dirección de la flecha en el botón
      toggleButton.querySelector('.arrow').innerHTML = isInfoBoxVisible ? '&larr;' : '&rarr;';
  }

  toggleButton.addEventListener('click', toggleInfoBox);

  let startX = 0;
  let endX = 0;

  document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
  });

  document.addEventListener('touchmove', (e) => {
      endX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', () => {
      if (startX < endX - 50) { // Deslizar a la derecha
          isInfoBoxVisible = true;
          infoBox.classList.add('visible');
          toggleButton.classList.add('open');
          toggleButton.querySelector('.arrow').innerHTML = '&larr;'; // Cambiar la flecha a la izquierda
      } else if (startX > endX + 50) { // Deslizar a la izquierda
          isInfoBoxVisible = false;
          infoBox.classList.remove('visible');
          toggleButton.classList.remove('open');
          toggleButton.querySelector('.arrow').innerHTML = '&rarr;'; // Cambiar la flecha a la derecha
      }
  });
});


// Download button
document.getElementById('downloadBtn').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = 'https://raw.githubusercontent.com/AndresSola/3DArtist/main/CSS/CV ANDRES SOLA in.pdf'; // Enlace corregido
  link.download = 'CURRICULUM_VITAE_ANDRES_SOLA_2024.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
// ETIQUETAS
document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.boton');
    const tags = document.querySelectorAll('.tag');

    botones.forEach(boton => {
        boton.addEventListener('click', function(event) {
            event.preventDefault();

            const botonActual = this;
            const idBotonActual = botonActual.id;

            if (botonActual.classList.contains('EtiquetaVideogameSelected')) {
                botonActual.classList.remove('EtiquetaVideogameSelected');
                tags.forEach(tag => {
                    if (tag.getAttribute('data-boton').includes(idBotonActual)) {
                        tag.classList.remove('EtiquetaVideogameSelected');
                    }
                });
            } else {
                botonActual.classList.add('EtiquetaVideogameSelected');
                tags.forEach(tag => {
                    const dataBoton = tag.getAttribute('data-boton').split(' ');
                    if (dataBoton.includes(idBotonActual)) {
                        tag.classList.add('EtiquetaVideogameSelected');
                    }
                });
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.boton')) {
            botones.forEach(boton => {
                boton.classList.remove('EtiquetaVideogameSelected');
            });
            tags.forEach(tag => {
                tag.classList.remove('EtiquetaVideogameSelected');
            });
        }
    });
});


// COPIAR AL PORTAPAPELES EL TEXTO
document.addEventListener('DOMContentLoaded', function() {
  // Obtener los botones con ID específico
  var boton1 = document.getElementById('boton1');
  var boton2 = document.getElementById('boton2');
  var boton3 = document.getElementById('boton3');
  var boton4 = document.getElementById('boton4');
  var boton5 = document.getElementById('boton5');
  var boton6 = document.getElementById('boton6');
  var boton7 = document.getElementById('boton7');
  var boton8 = document.getElementById('boton8');
  var boton9 = document.getElementById('boton9');

  // Agregar un evento de clic a cada botón
  boton1.addEventListener('click', function() {
      copiarTexto("andressola00@gmail.com");
  });

  boton2.addEventListener('click', function() {
      copiarTexto("https://www.artstation.com/andr3sol4");
  });

  boton3.addEventListener('click', function() {
      copiarTexto("https://www.instagram.com/andres_sola_a/");
  });

  boton4.addEventListener('click', function() {
      copiarTexto("https://www.linkedin.com/in/andres-sola-arr%C3%B3niz-1000a9251/");
  });

  boton5.addEventListener('click', function() {
      copiarTexto("https://youtu.be/qJggG6HTmvY");
  });

  boton6.addEventListener('click', function() {
      copiarTexto("https://www.infojobs.net/candidate/cv/view/index.xhtml?dgv=1730496209650055258");
  });

  boton7.addEventListener('click', function() {
      copiarTexto("niatirosmato");
  });

  boton8.addEventListener('click', function() {
      copiarTexto("616341720");
  });

  boton9.addEventListener('click', function() {
      copiarTexto("https://sketchfab.com/Andres_sola");
  });

  // Función para copiar texto al portapapeles
  function copiarTexto(texto) {
      navigator.clipboard.writeText(texto)
          .then(function() {
              console.log('Texto copiado al portapapeles:', texto);
              alert('Texto copiado al portapapeles');
          })
          .catch(function(error) {
              console.error('Error al copiar el texto:', error);
              alert('Error al copiar el texto');
          });
  }
});


// Comentarios
// Función para obtener los comentarios almacenados en el localStorage
function getStoredComments() {
  var storedComments = localStorage.getItem('comments');
  return storedComments ? JSON.parse(storedComments) : [];
}

// Función para mostrar los comentarios en la página
function displayComments() {
  var comments = getStoredComments();
  var commentSection = document.getElementById('comment-section');
  commentSection.innerHTML = ''; // Limpiar el contenido anterior

  comments.forEach(function(commentText, index) {
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.textContent = commentText;

    // Crear botón de eliminar comentario
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', function() {
      // Eliminar el comentario del array y del almacenamiento local
      comments.splice(index, 1);
      localStorage.setItem('comments', JSON.stringify(comments));
      // Actualizar la visualización de los comentarios
      displayComments();
    });

    commentDiv.appendChild(deleteButton);
    commentSection.appendChild(commentDiv);
  });
}

// Función para guardar un comentario en el localStorage
function storeComment(comment) {
  var comments = getStoredComments();
  comments.push(comment);
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Mostrar los comentarios existentes al cargar la página
displayComments();

// Agregar evento al botón de enviar
document.getElementById('send-button').addEventListener('click', function() {
  var comment = document.getElementById('comment-input').value;
  if(comment.trim() !== '') {
    // Guardar el comentario
    storeComment(comment);
    // Mostrar el comentario en la página
    displayComments();
    // Limpiar el área de comentarios después de enviar
    document.getElementById('comment-input').value = '';
  } else {
    alert('Por favor escribe un comentario antes de enviar.');
  }
});


// ABOUT METEXTO
document.addEventListener('DOMContentLoaded', function() {
    var textElement = document.getElementById('text');
    var button = document.getElementById('languageButton');

    // Configurar el contenido inicial en español
    textElement.innerHTML = "Hola! 👋 Mi nombre es ANDRES SOLA ARRONIZ y soy 3D Environment Procedural Technical Artist.<br><br>" +
            "Soy un profesional especializado en la creación de entornos escalables y eficientes mediante técnicas procedurales, combinando arte y tecnología para resolver desafíos creativos. Mi experiencia incluye el diseño de sistemas automatizados para generación de entornos, creación de materiales procedurales con Copernicus (COPs), y optimización de flujos de trabajo usando herramientas como Houdini, Unreal Engine y Python.<br><br>" +
            "Mi objetivo es aportar soluciones técnicas creativas en la industria de videojuegos o cine/VFX, potenciando la creación de mundos virtuales dinámicos y eficaces. Combino mi pasión por el arte 3D con un enfoque metódico, buscando siempre aprender nuevas herramientas y mejorar procesos.";
    button.innerText = "ING";
});

document.getElementById('languageButton').addEventListener('click', function() { 
    var textElement = document.getElementById('text');
    var button = document.getElementById('languageButton');
    
    if (textElement.innerHTML === "Hola! 👋 Mi nombre es ANDRES SOLA ARRONIZ y soy 3D Environment Procedural Technical Artist.<br><br>" +
            "Soy un profesional especializado en la creación de entornos escalables y eficientes mediante técnicas procedurales, combinando arte y tecnología para resolver desafíos creativos. Mi experiencia incluye el diseño de sistemas automatizados para generación de entornos, creación de materiales procedurales con Copernicus (COPs), y optimización de flujos de trabajo usando herramientas como Houdini, Unreal Engine y Python.<br><br>" +
            "Mi objetivo es aportar soluciones técnicas creativas en la industria de videojuegos o cine/VFX, potenciando la creación de mundos virtuales dinámicos y eficaces. Combino mi pasión por el arte 3D con un enfoque metódico, buscando siempre aprender nuevas herramientas y mejorar procesos.") {

        textElement.innerHTML = "Hi! 👋 My name is ANDRES SOLA ARRONIZ, and I am a 3D Environment Procedural Technical Artist.<br><br>" +
            "I am a professional specialized in creating scalable and efficient environments through procedural techniques, bridging art and technology to solve creative challenges. My experience includes designing automated systems for environment generation, developing procedural materials using Copernicus (COPs), and optimizing workflows with tools like Houdini, Unreal Engine, and Python.<br><br>" +
            "My goal is to deliver creative technical solutions in the video game or film/VFX industries, enhancing the creation of dynamic and impactful virtual worlds. I combine my passion for 3D art with a methodical approach, always seeking to learn new tools and refine processes.";
        button.innerText = "EUS";


    } else if (textElement.innerHTML === "Hi! 👋 My name is ANDRES SOLA ARRONIZ, and I am a 3D Environment Procedural Technical Artist.<br><br>" +
            "I am a professional specialized in creating scalable and efficient environments through procedural techniques, bridging art and technology to solve creative challenges. My experience includes designing automated systems for environment generation, developing procedural materials using Copernicus (COPs), and optimizing workflows with tools like Houdini, Unreal Engine, and Python.<br><br>" +
            "My goal is to deliver creative technical solutions in the video game or film/VFX industries, enhancing the creation of dynamic and impactful virtual worlds. I combine my passion for 3D art with a methodical approach, always seeking to learn new tools and refine processes." ) {

      textElement.innerHTML = "Kaixo! 👋 Nire izena ANDRES SOLA ARRONIZ da eta 3D Ingurune Prozeduraletako Artist Teknikoa naiz.<br><br>" +
            "Eskalagarriak eta eraginkorrak diren inguruneak sortzen espezializatutako profesionala naiz, prozedura-teknika erabiliz, artea eta teknologia uztartuz erronka sortzaileak ebazteko. Nire esperientziak inguruneen generaziorako sistema automatizatuak diseinatzea, Copernicus (COPs) erabiliz material prozeduralak sortzea, eta Houdini, Unreal Engine eta Python bezalako tresnak erabiliz lan-fluxuak optimizatzea barne hartzen ditu.<br><br>" +
            "Bideojokoetako edo zinemako/VFX industrietan ebazpen tekniko sortzaileak eskaintzea da nire helburua, mundu birtual dinamiko eta eraginkorrak indartzeko. 3D artearekiko duten grina ikuspegi metodiko batekin uztartzen dut, tresna berriak ikasi (adibidez, simulazio-tresnak) eta prozesuak hobetzeko etengabeko borondatea erakutsiz.";
        button.innerText = "ESP";

      } else {
        textElement.innerHTML = "Hola! 👋 Mi nombre es ANDRES SOLA ARRONIZ y soy 3D Environment Procedural Technical Artist.<br><br>" +
            "Soy un profesional especializado en la creación de entornos escalables y eficientes mediante técnicas procedurales, combinando arte y tecnología para resolver desafíos creativos. Mi experiencia incluye el diseño de sistemas automatizados para generación de entornos, creación de materiales procedurales con Copernicus (COPs), y optimización de flujos de trabajo usando herramientas como Houdini, Unreal Engine y Python.<br><br>" +
            "Mi objetivo es aportar soluciones técnicas creativas en la industria de videojuegos o cine/VFX, potenciando la creación de mundos virtuales dinámicos y eficaces. Combino mi pasión por el arte 3D con un enfoque metódico, buscando siempre aprender nuevas herramientas y mejorar procesos.";
        button.innerHTML = "ING";
    }
});


// WORK EXPERIENCE DESPLEGABLES
// Flecha rotacion 
function toggleDropdown(idDropdown, idFlecha) {
  var dropdown = document.getElementById(idDropdown);
  var flecha = document.getElementById(idFlecha);

  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    rotateArrow(flecha, false);
  } else {
    // Oculta todos los menús desplegables antes de mostrar el nuevo
    hideAllDropdowns();
    dropdown.classList.add('show');
    rotateArrow(flecha, true);
  }
}

// Función para ocultar todos los menús desplegables
function hideAllDropdowns() {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.remove('show');
  }
}

// Cerrar el menú desplegable si se hace clic fuera de él
window.onclick = function(event) {
  if (!event.target.matches('button')) {
    hideAllDropdowns();
    // Restablecer la rotación de todas las flechas
    resetAllArrows();
  }
}

// Función para rotar la flecha
function rotateArrow(arrow, showDropdown) {
  if (showDropdown) {
    arrow.style.transform = 'rotate(180deg)';
  } else {
    arrow.style.transform = 'rotate(0deg)';
  }
}

// Función para restablecer la rotación de todas las flechas
function resetAllArrows() {
  var arrows = document.getElementsByClassName("Flecha_2");
  for (var i = 0; i < arrows.length; i++) {
    arrows[i].style.transform = 'rotate(0deg)';
  }
}


// COPIAR TEXTO
function myFunction() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
  
}


/* Inicializar contadores de likes
var likeCounts = [0, 0, 0];
        var likedStatus = [false, false, false];

        // Cargar datos de localStorage
        window.onload = function() {
            for (let i = 0; i < likeCounts.length; i++) {
                let count = localStorage.getItem('likeCount' + i);
                let liked = localStorage.getItem('likedStatus' + i);

                if (count) likeCounts[i] = parseInt(count);
                if (liked === 'true') likedStatus[i] = true;

                document.getElementById('count' + (i + 1)).textContent = likeCounts[i];

                if (likedStatus[i]) {
                    document.getElementById('likeButton' + (i + 1)).disabled = true;
                }
            }
        };

        // Función para incrementar el contador de likes
        function addLike(index) {
            if (!likedStatus[index]) {
                likeCounts[index]++;
                likedStatus[index] = true;
                document.getElementById('count' + (index + 1)).textContent = likeCounts[index];
                localStorage.setItem('likeCount' + index, likeCounts[index]);
                localStorage.setItem('likedStatus' + index, true);
                document.getElementById('likeButton' + (index + 1)).disabled = true;
            }
        }

        // Asignar eventos a cada botón
        document.getElementById('likeButton1').addEventListener('click', function() {
            addLike(0);
        });
        document.getElementById('likeButton2').addEventListener('click', function() {
            addLike(1);
        });
        document.getElementById('likeButton3').addEventListener('click', function() {
            addLike(2);
        });
*/        











