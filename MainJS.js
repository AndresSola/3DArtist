// =====================================================================
//  MainJS.js — lógica de la página principal (index.html)
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initInfoBox();
  initDownloadCV();
  initTagFilter();
  initCopyButtons();
  initLanguageSwitch();
  initDropdowns();
  initComments();
});


// ---------------------------------------------------------------------
// PANEL LATERAL (info box): botón + gesto de deslizar en móvil
// ---------------------------------------------------------------------
function initInfoBox() {
  const infoBox = document.getElementById('infoBox');
  const toggleButton = document.getElementById('toggleButton');
  if (!infoBox || !toggleButton) return;

  const arrow = toggleButton.querySelector('.arrow');
  let isVisible = false;

  function setVisible(visible) {
    isVisible = visible;
    infoBox.classList.toggle('visible', visible);
    toggleButton.classList.toggle('open', visible);
    if (arrow) arrow.innerHTML = visible ? '&larr;' : '&rarr;';
  }

  toggleButton.addEventListener('click', () => setVisible(!isVisible));

  // Gesto táctil: solo cuenta si el movimiento es claramente horizontal
  const MIN_SWIPE = 50;
  let startX = 0, startY = 0, endX = 0, endY = 0;

  document.addEventListener('touchstart', (e) => {
    startX = endX = e.touches[0].clientX;
    startY = endY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
    endY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', () => {
    const dx = endX - startX;
    const dy = endY - startY;
    if (Math.abs(dx) < MIN_SWIPE || Math.abs(dx) < Math.abs(dy)) return;
    setVisible(dx > 0); // derecha = abrir, izquierda = cerrar
  });
}


// ---------------------------------------------------------------------
// DESCARGAR CV (ruta local: mismo dominio, así el atributo download funciona)
// ---------------------------------------------------------------------
function initDownloadCV() {
  const btn = document.getElementById('downloadBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = encodeURI('CSS/CV ANDRES SOLA in.pdf');
    link.download = 'CURRICULUM_VITAE_ANDRES_SOLA_2024.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
}


// ---------------------------------------------------------------------
// FILTRO DE ETIQUETAS (3D ARTWORKS)
// Una tarjeta se resalta si coincide con CUALQUIERA de los filtros activos.
// ---------------------------------------------------------------------
function initTagFilter() {
  const SELECTED = 'EtiquetaVideogameSelected';
  const botones = Array.from(document.querySelectorAll('.boton'));
  const tags = Array.from(document.querySelectorAll('.tag'));

  // Pre-calcular la lista exacta de ids de cada tarjeta (evita que "boton1" coincida con "boton10")
  const tagIds = new Map(tags.map(tag => [tag, (tag.dataset.boton || '').trim().split(/\s+/)]));

  function actualizarTarjetas() {
    const activos = botones.filter(b => b.classList.contains(SELECTED)).map(b => b.id);
    tags.forEach(tag => {
      const ids = tagIds.get(tag);
      tag.classList.toggle(SELECTED, activos.some(id => ids.includes(id)));
    });
  }

  botones.forEach(boton => {
    boton.addEventListener('click', (event) => {
      event.preventDefault();
      boton.classList.toggle(SELECTED);
      actualizarTarjetas();
    });
  });

  // Clic fuera de los filtros = limpiar selección
  document.addEventListener('click', (event) => {
    if (event.target.closest('.boton')) return;
    botones.forEach(b => b.classList.remove(SELECTED));
    actualizarTarjetas();
  });
}


// ---------------------------------------------------------------------
// COPIAR AL PORTAPAPELES (botones de contacto con atributo data-copy)
// ---------------------------------------------------------------------
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(boton => {
    boton.addEventListener('click', () => copiarTexto(boton.dataset.copy));
  });
}

function copiarTexto(texto) {
  if (!navigator.clipboard) {
    alert('Tu navegador no permite copiar automáticamente:\n' + texto);
    return;
  }
  navigator.clipboard.writeText(texto)
    .then(() => alert('Texto copiado al portapapeles'))
    .catch((error) => {
      console.error('Error al copiar el texto:', error);
      alert('Error al copiar el texto');
    });
}


// ---------------------------------------------------------------------
// ABOUT ME: cambio de idioma ES -> EN -> EU -> ES
// El botón muestra el idioma al que se cambiará con el siguiente clic.
// ---------------------------------------------------------------------
const ABOUT_ME = [
  {
    siguiente: 'ING',
    texto:
      'Hola! 👋 Mi nombre es ANDRES SOLA ARRONIZ y soy 3D Environment Procedural Technical Artist.<br><br>' +
      'Soy un profesional especializado en la creación de entornos escalables y eficientes mediante técnicas procedurales, combinando arte y tecnología para resolver desafíos creativos. Mi experiencia incluye el diseño de sistemas automatizados para generación de entornos, creación de materiales procedurales con Copernicus (COPs), y optimización de flujos de trabajo usando herramientas como Houdini, Unreal Engine y Python.<br><br>' +
      'Mi objetivo es aportar soluciones técnicas creativas en la industria de videojuegos o cine/VFX, potenciando la creación de mundos virtuales dinámicos y eficaces. Combino mi pasión por el arte 3D con un enfoque metódico, buscando siempre aprender nuevas herramientas y mejorar procesos.'
  },
  {
    siguiente: 'EUS',
    texto:
      'Hi! 👋 My name is ANDRES SOLA ARRONIZ, and I am a 3D Environment Procedural Technical Artist.<br><br>' +
      'I am a professional specialized in creating scalable and efficient environments through procedural techniques, bridging art and technology to solve creative challenges. My experience includes designing automated systems for environment generation, developing procedural materials using Copernicus (COPs), and optimizing workflows with tools like Houdini, Unreal Engine, and Python.<br><br>' +
      'My goal is to deliver creative technical solutions in the video game or film/VFX industries, enhancing the creation of dynamic and impactful virtual worlds. I combine my passion for 3D art with a methodical approach, always seeking to learn new tools and refine processes.'
  },
  {
    siguiente: 'ESP',
    texto:
      'Kaixo! 👋 Nire izena ANDRES SOLA ARRONIZ da eta 3D Ingurune Prozeduraletako Artist Teknikoa naiz.<br><br>' +
      'Eskalagarriak eta eraginkorrak diren inguruneak sortzen espezializatutako profesionala naiz, prozedura-teknika erabiliz, artea eta teknologia uztartuz erronka sortzaileak ebazteko. Nire esperientziak inguruneen generaziorako sistema automatizatuak diseinatzea, Copernicus (COPs) erabiliz material prozeduralak sortzea, eta Houdini, Unreal Engine eta Python bezalako tresnak erabiliz lan-fluxuak optimizatzea barne hartzen ditu.<br><br>' +
      'Bideojokoetako edo zinemako/VFX industrietan ebazpen tekniko sortzaileak eskaintzea da nire helburua, mundu birtual dinamiko eta eraginkorrak indartzeko. 3D artearekiko duten grina ikuspegi metodiko batekin uztartzen dut, tresna berriak ikasi (adibidez, simulazio-tresnak) eta prozesuak hobetzeko etengabeko borondatea erakutsiz.'
  }
];

function initLanguageSwitch() {
  const textElement = document.getElementById('text');
  const button = document.getElementById('languageButton');
  if (!textElement || !button) return;

  let idioma = 0;

  function mostrar() {
    textElement.innerHTML = ABOUT_ME[idioma].texto;
    button.textContent = ABOUT_ME[idioma].siguiente;
  }

  button.addEventListener('click', () => {
    idioma = (idioma + 1) % ABOUT_ME.length;
    mostrar();
  });

  mostrar();
}


// ---------------------------------------------------------------------
// WORK EXPERIENCE: desplegables con flecha giratoria
// Cada .dropdown contiene su propio .dropbtn, .Flecha_2 y .dropdown-content,
// así que no hacen falta IDs.
// ---------------------------------------------------------------------
function initDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
  if (!dropdowns.length) return;

  function setOpen(dropdown, open) {
    const content = dropdown.querySelector('.dropdown-content');
    const flecha = dropdown.querySelector('.Flecha_2');
    if (content) content.classList.toggle('show', open);
    if (flecha) flecha.style.transform = open ? 'rotate(180deg)' : 'rotate(0deg)';
  }

  function closeAll(except) {
    dropdowns.forEach(d => { if (d !== except) setOpen(d, false); });
  }

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = dropdown.querySelector('.dropdown-content')?.classList.contains('show');
      closeAll(dropdown);
      setOpen(dropdown, !isOpen);
    });
  });

  // Clic fuera de cualquier desplegable = cerrar todos
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) closeAll();
  });
}


// ---------------------------------------------------------------------
// COMENTARIOS (sección oculta de momento)
// Nota: se guardan en localStorage, así que solo los ve el propio visitante.
// ---------------------------------------------------------------------
const COMMENTS_KEY = 'comments';

function getStoredComments() {
  try {
    const stored = JSON.parse(localStorage.getItem(COMMENTS_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
}

function initComments() {
  const section = document.getElementById('comment-section');
  const input = document.getElementById('comment-input');
  const sendButton = document.getElementById('send-button');
  if (!section || !input || !sendButton) return;

  function render() {
    section.innerHTML = '';
    getStoredComments().forEach((commentText, index) => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.textContent = commentText; // textContent: evita inyección de HTML

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', () => {
        const comments = getStoredComments();
        comments.splice(index, 1);
        saveComments(comments);
        render();
      });

      commentDiv.appendChild(deleteButton);
      section.appendChild(commentDiv);
    });
  }

  sendButton.addEventListener('click', () => {
    const comment = input.value.trim();
    if (!comment) {
      alert('Por favor escribe un comentario antes de enviar.');
      return;
    }
    const comments = getStoredComments();
    comments.push(comment);
    saveComments(comments);
    input.value = '';
    render();
  });

  render();
}
