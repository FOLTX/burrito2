/* Menú responsive */
function toggleMenu(btn){
  const links = document.querySelector('.nav-links');
  if(links.style.display === 'flex'){
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    // Nota: El color de fondo y padding ya están en tu CSS
    // para .nav-links en el media query, así que
    // podrías borrarlos de aquí si quieres.
    links.style.background = 'var(--color-background-nav)';
    links.style.padding = '12px';
  }
}

// --- NUEVO CÓDIGO AÑADIDO ---
// Objetivo: Cerrar el menú móvil después de hacer clic en un enlace.
function setupMobileMenuCloser() {
  const linksContainer = document.querySelector('.nav-links');
  
  // 1. Selecciona todos los enlaces dentro del menú
  document.querySelectorAll('.nav-links a').forEach(link => {
    
    // 2. Añade un "escuchador" de clics a cada uno
    link.addEventListener('click', () => {
      
      // 3. Comprueba si el menú está en modo móvil
      //    (usamos 'flexDirection' como señal, ya que solo se
      //     pone 'column' en el JS de toggleMenu)
      if (linksContainer.style.flexDirection === 'column') {
        
        // 4. Si es móvil, ciérralo.
        linksContainer.style.display = 'none';
      }
    });
  });
}

// Llama a la función para que se active
setupMobileMenuCloser();
// --- FIN DEL CÓDIGO AÑADIDO ---


/* Sistema de calificaciones */
let ratings = [];

function submitComment(){
  const user = document.getElementById("input-user").value.trim();
  const comment = document.getElementById("input-comment").value.trim();
  const rating = parseInt(document.getElementById("input-rating").value);

  if(!user || !comment){
    alert("Completa tu nombre y comentario.");
    return;
  }

  ratings.push(rating);
  updateAverage();

  const list = document.getElementById("comments-list");
  const div = document.createElement("div");
  div.className = "card";
  div.style.marginBottom = "12px";
  div.innerHTML = `
    <strong>${user}</strong> — <span style="color:var(--color-star)">★`.repeat(rating) +
    `<span style="color:var(--color-star-empty)">☆`.repeat(5-rating) +
    `</span><br>
    <p style="margin:6px 0 0">${comment}</p>
  `;
  list.prepend(div);

  document.getElementById("input-user").value = "";
  document.getElementById("input-comment").value = "";
  document.getElementById("input-rating").value = "5";
}

function updateAverage(){
  // Protección contra división por cero si ratings está vacío
  if (ratings.length === 0) {
    document.getElementById("avg-score").innerText = `(0.0)`;
    document.getElementById("stars-inner").style.width = "0%";
    return; 
  }

  const avg = ratings.reduce((a,b)=>a+b,0) / ratings.length;
  const percent = (avg/5)*100;

  document.getElementById("avg-score").innerText = `(${avg.toFixed(1)})`;
  document.getElementById("stars-inner").style.width = percent + "%";
}
