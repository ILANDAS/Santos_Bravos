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
  { id: "priano", name: "Priano", age: 24, country: "Colombia", flag: "colombia" }
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

// Selección de cards
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
});

const formGroupBtn = document.getElementById("form-group");
const groupPhotoDiv = document.getElementById("group-photo");

formGroupBtn.addEventListener("click", () => {
  groupPhotoDiv.innerHTML = "";
  if (selected.length === 0) {
    alert("Selecciona al menos 1 participante.");
    return;
  }
  selected.forEach(id => {
    const img = document.createElement("img");
    img.src = `assets/pngs/${id}.png`;
    groupPhotoDiv.appendChild(img);
  });
});

// Inicializar Swiper
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 5,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});