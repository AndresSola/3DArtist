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
    var boton4 = document.getElementById('boton6');
   

    // Agregar un evento de clic a cada botón
    boton1.addEventListener('click', function() {
        copiarTexto("andressola00@gmail.com");
    });

    boton2.addEventListener('click', function() {
        copiarTexto("https://www.artstation.com/andr3sol4");
    });

    boton3.addEventListener('click', function() {
        copiarTexto("https://youtu.be/qJggG6HTmvY");
    });

    boton4.addEventListener('click', function() {
        copiarTexto("https://www.infojobs.net/candidate/cv/view/index.xhtml?dgv=1730496209650055258");
    });

    boton5.addEventListener('click', function() {
        copiarTexto("niatirosmato");
    });

    boton6.addEventListener('click', function() {
        copiarTexto("616341720");
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
    textElement.innerHTML = "Hola!👋, mi nombre es ANDRES SOLA ARRONIZ y soy Artista 3D JUNIOR de Entornos y Props.<br><br>" +
        "Soy un apasionado del la creación 3D con habilidades en modelado 3D, texturizado, iluminación y renderizado, utilizando software como Maya y Substance Painter. He trabajado en varios proyectos colaborativos como generalista 3D destacándome en la creación de props.<br><br>" +
        "Mi objetivo es seguir creciendo en la industria de videojuegos y animación, aportando creatividad y técnica para crear entornos y props visualmente atractivos. Estoy siempre dispuesto a aprender y mejorar, buscando contribuir a proyectos innovadores y de alta calidad.";
    button.innerText = "ING";
});

document.getElementById('languageButton').addEventListener('click', function() { 
    var textElement = document.getElementById('text');
    var button = document.getElementById('languageButton');
    
    if (textElement.innerHTML === "Hola!👋, mi nombre es ANDRES SOLA ARRONIZ y soy Artista 3D JUNIOR de Entornos y Props.<br><br>" +
            "Soy un apasionado del la creación 3D con habilidades en modelado 3D, texturizado, iluminación y renderizado, utilizando software como Maya y Substance Painter. He trabajado en varios proyectos colaborativos como generalista 3D destacándome en la creación de props.<br><br>" +
            "Mi objetivo es seguir creciendo en la industria de videojuegos y animación, aportando creatividad y técnica para crear entornos y props visualmente atractivos. Estoy siempre dispuesto a aprender y mejorar, buscando contribuir a proyectos innovadores y de alta calidad.") {

        textElement.innerHTML = "Hi!👋 My name is ANDRES SOLA ARRONIZ, and I am a JUNIOR 3D Artist specializing in Environments and Props.<br><br>" +
            "I am passionate about 3D creation, with skills in 3D modeling, texturing, lighting, and rendering, using software such as Maya and Substance Painter. I have worked on several collaborative projects as a 3D generalist, excelling in prop creation.<br><br>" +
            "My goal is to continue growing in the video game and animation industry, bringing creativity and technique to create visually appealing environments and props. I am always willing to learn and improve, aiming to contribute to innovative and high-quality projects.";
        button.innerText = "EUS";


    } else if (textElement.innerHTML === "Hi!👋 My name is ANDRES SOLA ARRONIZ, and I am a JUNIOR 3D Artist specializing in Environments and Props.<br><br>" +
            "I am passionate about 3D creation, with skills in 3D modeling, texturing, lighting, and rendering, using software such as Maya and Substance Painter. I have worked on several collaborative projects as a 3D generalist, excelling in prop creation.<br><br>" +
            "My goal is to continue growing in the video game and animation industry, bringing creativity and technique to create visually appealing environments and props. I am always willing to learn and improve, aiming to contribute to innovative and high-quality projects." ) {

      textElement.innerHTML = "Kaixo!👋, nire izena ANDRES SOLA ARRONIZ da eta Entorno eta Props 3D ARTISTA JUNIOR naiz.<br><br>" +
            "3D sorkuntzan amorratua naiz, eta 3D modelatzean, testuratzean, argiztapenean eta errepresentazioan trebetasunak ditut, Maya eta Substance Painter bezalako softwareak erabiliz. Proiektu kolaboratibo batzuetan lan egin dut 3D Generalista bezala, propsen sorkuntzan nabarmenduz.<br><br>" +
            "Nire helburua bideo-jokoen eta animazioaren industrian sartzen jarraitzea da, sormen eta teknika ekarriz ingurune eta props bisualki erakargarriak sortzeko. Beti prest nago ikasteko eta hobetzeko, proiektu berrietan eta kalitate handikoetan laguntzeko prest.";
        button.innerText = "ESP";

      } else {
        textElement.innerHTML = "Hola!👋, mi nombre es ANDRES SOLA ARRONIZ y soy Artista 3D JUNIOR de Entornos y Props.<br><br>" +
            "Soy un apasionado del la creación 3D con habilidades en modelado 3D, texturizado, iluminación y renderizado, utilizando software como Maya y Substance Painter. He trabajado en varios proyectos colaborativos como generalista 3D destacándome en la creación de props.<br><br>" +
            "Mi objetivo es seguir creciendo en la industria de videojuegos y animación, aportando creatividad y técnica para crear entornos y props visualmente atractivos. Estoy siempre dispuesto a aprender y mejorar, buscando contribuir a proyectos innovadores y de alta calidad.";
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



// Inicializar contadores de likes
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

// Añadir evento de clic al botón
document.querySelectorAll('.tag button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault(); // Prevenir comportamiento por defecto
                window.location.href = this.parentElement.getAttribute('href');
            });
        });




// Dowload buton
document.getElementById('downloadBtn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'CURRICULUM_VITAE_ANDRES_SOLA_2024.pdf'; // Ruta al archivo PDF
    link.download = 'CURRICULUM_VITAE_ANDRES_SOLA_2024.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


