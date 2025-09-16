const participants = [
  { id: "alejandro", name: "Alejandro Aramburú", age: 21, country: "Perú", flag: "peru" },
  { id: "alex", name: "Alex Mandon Rey", age: 20, country: "España", flag: "espana" },
  { id: "diego", name: "Diego López", age: 23, country: "México/USA", flag: "mexico-usa" },
  { id: "drew", name: "Drew Venegas", age: 25, country: "USA/México", flag: "usa-mexico" },
  { id: "iannis", name: "Iannis Biblos", age: 21, country: "Argentina", flag: "argentina" },
  { id: "jesuale", name: "Jesuale", age: 16, country: "USA/Venezuela", flag: "usa-venezuela" },
  { id: "kaue", name: "Kauê", age: 18, country: "Brasil", flag: "brasil" },
  { id: "kenneth", name: "Kenneth Lavill", age: 15, country: "México", flag: "mexico" },
  { id: "leonardo", name: "Leonardo Lotina", age: 23, country: "México", flag: "mexico" },
  { id: "lucas", name: "Lucas Burgatti", age: 23, country: "Brasil", flag: "brasil" },
  { id: "luigi", name: "Luigi Cerrada", age: 19, country: "México/Venezuela", flag: "mexico-venezuela" },
  { id: "pablo", name: "Pablo Carns", age: 24, country: "México", flag: "mexico" },
  { id: "priano", name: "Priano", age: 24, country: "Colombia", flag: "colombia" },
  { id: "gabi", name: "Gabi Bermúdez", age: 20, country: "Puerto Rico", flag: "puerto-rico" }
];
const container = document.getElementById("participants");

// Renderizar cards
participants.forEach(p => {
  const slide = document.createElement("div");
  slide.classList.add("swiper-slide");

  slide.innerHTML = `
    <div class="card" data-id="${p.id}">
      <img src="assets/profiles/${p.id}.webp" alt="${p.name}" class="profile">
      <h3>${p.name}</h3>
      <p>${p.age} años</p>
      <small>${p.country}</small>
    </div>
  `;

  container.appendChild(slide);
});

const maxSelection = 5;
let selected = [];

container.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const id = card.dataset.id;

  if (card.classList.contains("selected")) {
    card.classList.remove("selected");
    selected = selected.filter(x => x !== id);
  } else {
    if (selected.length >= maxSelection) {
      alert("Solo puedes seleccionar hasta 5 participantes.");
      return;
    }
    card.classList.add("selected");
    selected.push(id);
  }

  updateLineup(); // 👉 actualizar automáticamente
});


const formGroupBtn = document.getElementById("form-group");

const groupPhotoDiv = document.getElementById("group-container");

// Función para actualizar automáticamente el lineup
function updateLineup() {
  const slots = document.querySelectorAll(".group-container .slot");
  slots.forEach(slot => {
    slot.innerHTML = "";       // Limpiar contenido
    slot.style.backgroundImage = "none"; // Limpiar fondo previo
  });

  selected.forEach((id, index) => {
    if (index < slots.length) {
      const participant = participants.find(p => p.id === id);
      const slot = slots[index];
      // Usamos background-image en lugar de <img>
      slot.style.backgroundImage = `url('assets/profiles/${id}.webp')`;
      slot.style.backgroundSize = "cover";       // recorta centrado
      slot.style.backgroundPosition = "center";  // centra la imagen
      slot.style.backgroundRepeat = "no-repeat"; // evita repeticiones
    }
  });
}


const swiper = new Swiper(".mySwiper", {
  slidesPerView: 5, // en escritorio
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    // pantallas <= 768px (tablet / celular)
    768: {
      slidesPerView: 5, 
      spaceBetween: 15,
    },
    // pantallas <= 480px (celular pequeño)
    400: {
      slidesPerView: 1,
      spaceBetween: 10,
    }
  }
});



document.getElementById("downloadLineup").addEventListener("click", () => {
  const lineup = document.querySelector(".group-container");

  html2canvas(lineup, {
    useCORS: true,         
    backgroundColor: null, 
    scale: 5               
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi-lineup.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
