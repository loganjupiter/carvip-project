const selectAnios = document.querySelector("#selectAnios");
const estadoSelect = document.querySelector("#statusSelect");

function anios() {
  for (let year = 2023; year >= 1900; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectAnios.appendChild(option);
  }
}
anios();

const marcaSelect = document.querySelector("#marcaSelect");

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then((response) => response.json())
  .then((data) => {
    for (const marca of data) {
      const option = document.createElement("option");
      option.value = marca;
      option.text = marca;
      marcaSelect.appendChild(option);
    }
  })
  .then(() => {
    marcaSelect.addEventListener("change", function () {
      const marcaInput = marcaSelect.value;
      const cards = document.querySelector(".card-container");

      modeloSelect.innerHTML = "<option>Seleccionar</option>";
      fetch(
        `https://ha-front-api-proyecto-final.vercel.app/models?brand=${marcaInput}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) {
            cards.innerHTML = "<h3>No hay stock para este modelo </h3>";
          } else {
            for (const modelo of data) {
              const option = document.createElement("option");
              option.value = modelo;
              option.text = modelo;
              modeloSelect.appendChild(option);
            }
          }
        });
    });
  });

//Primero cargamos los articulos (sin filtro)

const cardContainer = document.querySelector(".card-container");

function mostrarSinFiltrar() {
  fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const auto = data[i];
        const starIcons = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= auto.rating) {
            starIcons.push("<i class='bi bi-star-fill'></i>");
          } else {
            starIcons.push("<i class='bi bi-star'></i>");
          }
        }
        const precioFormateado = auto.price_usd.toLocaleString();

        const badge =
          auto.status === 1
            ? "<div class='badge m-2 p-2 position-absolute'>Nuevo</div>"
            : "";

        cardContainer.innerHTML += `
          <div class="card mb-3" style="max width: 100%">
            <div class="row g-0">
              <div class="col-12 col-xl-5 position-relative">
               ${badge}
                <img src="${auto.image}" class="img-fluid autoImg" alt="${
          auto.model
        }" />
              </div>
              <div class="col-12 col-xl-7">
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <h5 class="card-title">${auto.brand} ${auto.model}</h5>
                    <div class="d-flex justify-content-between">
                      <p class="pe-1" id="Datos">${auto.year}</p>
                      <p class="pe-1">| U$S ${precioFormateado} |</p>
                      <form>
                        <p> ${starIcons.join("")} </p>
                      </form>
                    </div>
                  </div>
                  <p class="card-text" style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${
                    auto.description
                  }</p>
                  <div>
                    <button type="button" class="btn btn-success">
                      <i class="bi bi-cart2"></i> Shop
                    </button>
                    <button type="button" class="btn btn-outline-dark">
                      <i class="bi bi-plus-square"></i> More information
                    </button>
                    <button type="button" class="btn btn-outline-dark">
                      <i class="bi bi-share"></i> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      }
    })
    .catch((error) => {
      console.error("Error al obtener datos de la API", error);
      cardContainer.innerHTML =
        "<h4>Error al cargar los datos de los autos</h4>";
    });
}

mostrarSinFiltrar();

//FILTRADOS

const filtrar = document.querySelector("#filtrar");

filtrar.addEventListener("click", function () {
  const marcaInput = marcaSelect.value;
  const modeloInput = modeloSelect.value;
  const anioInput = selectAnios.value;
  const cardContainer = document.querySelector(".card-container");

  fetch(
    `https://ha-front-api-proyecto-final.vercel.app/cars?year=${anioInput}&brand=${marcaInput}&model=${modeloInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const auto = data[i];
        const starIcons = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= auto.rating) {
            starIcons.push("<i class='bi bi-star-fill'></i>");
          } else {
            starIcons.push("<i class='bi bi-star'></i>");
          }
        }
        const precioFormateado = auto.price_usd.toLocaleString();

        const badge =
          auto.status === 1
            ? "<div class='badge m-2 p-2 position-absolute'>Nuevo</div>"
            : "";
        cardContainer.innerHTML = `
        <div class="card mb-3" style="max width: 100%">
          <div class="row g-0">
            <div class="col-12 col-xl-5 position-relative">
             ${badge}
              <img src="${auto.image}" class="img-fluid autoImg" alt="${
          auto.model
        }" />
            </div>
            <div class="col-12 col-xl-7">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">${auto.brand} ${auto.model}</h5>
                  <div class="d-flex justify-content-between">
                    <p class="pe-1" id="Datos">${auto.year}</p>
                    <p class="pe-1">| U$S ${precioFormateado} |</p>
                    <form>
                      <p> ${starIcons.join("")} </p>
                    </form>
                  </div>
                </div>
                <p class="card-text" style="display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${
                  auto.description
                }</p>
                <div>
                  <button type="button" class="btn btn-success">
                    <i class="bi bi-cart2"></i> Shop
                  </button>
                  <button type="button" class="btn btn-outline-dark">
                    <i class="bi bi-plus-square"></i> Mas informacion
                  </button>
                  <button type="button" class="btn btn-outline-dark">
                    <i class="bi bi-share"></i> Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }
    })

    .catch((error) => {
      console.error("Error al obtener datos de la API", error);
      cardContainer.innerHTML =
        "<h4>Error al cargar los datos de los autos</h4>";
    });
});

function cambiarAMosaico() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.classList.add("mosaico");
}

// Función para cambiar a la vista normal
function cambiarANormal() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.classList.remove("mosaico");
}
