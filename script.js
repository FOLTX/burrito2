/* Menú responsive */
function toggleMenu(btn){
  const links = document.querySelector('.nav-links');
  if(links.style.display === 'flex'){
    links.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.background = 'var(--color-background-nav)';
    links.style.padding = '12px';
  }
}

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
  const avg = ratings.reduce((a,b)=>a+b,0) / ratings.length;
  const percent = (avg/5)*100;

  document.getElementById("avg-score").innerText = `(${avg.toFixed(1)})`;
  document.getElementById("stars-inner").style.width = percent + "%";
}