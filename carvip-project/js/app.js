const selectAnios = document.querySelector("#selectAnios");

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
        const auto = data[i]; // Mover la declaración de 'auto' aquí
        const starIcons = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= auto.rating) {
            starIcons.push("<i class='bi bi-star-fill'></i>");
          } else {
            starIcons.push("<i class='bi bi-star'></i>");
          }
        }

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
                      <p class="pe-1">| ${auto.price_usd} |</p>
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
}

mostrarSinFiltrar();

//FILTRADOS

function filtrarDatos() {
  const modeloSelect = document.querySelector("#modeloSelect");
  const anioSelect = document.querySelector("#selectAnios");
  const estadoSelect = document.querySelector("#estadoSelect");

  const modeloSeleccionado = modeloSelect.value;
  const anioSeleccionado = anioSelect.value;
  const estadoSeleccionado = estadoSelect.value;

  let apiUrl = "https://ha-front-api-proyecto-final.vercel.app/cars";

  // Construir la URL con los parámetros de filtrado seleccionados
  if (modeloSeleccionado !== "Seleccionar") {
    apiUrl = `https://ha-front-api-proyecto-final.vercel.app/models?brand=${modeloSeleccionado}`;
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const autosFiltrados = data.filter((auto) => {
        // Resto del código de filtrado según año y estado (similar al ejemplo anterior)
      });

      mostrarAutosFiltrados(autosFiltrados);
    })
    .catch((error) => {
      console.error("Error al filtrar datos", error);
      cardContainer.innerHTML =
        "<h4>Error al filtrar los datos de los autos</h4>";
    });
}

/* <div class="card mb-3" style="max-width: 100%">
              <div class="row g-0">
                <div class="col-md-4 position-relative border p-1">
                  <span
                    class="position-absolute top-0 start-0 mt-2 ms-2 badge bg-secondary"
                    >Nuevo</span
                  >
                  <img
                    src="img/cars_sales/audi_a6_quattro_2016.jpg"
                    class="img-fluid"
                    alt="audi_a6_quattro_2016"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Audi A6</h5>
                    <p id="Datos">2016 | USD 92.000 | 5 estrellas</p>
                    <p class="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Dolorem nostrum molestiae exercitationem perferendis
                      provident reiciendis, dolore cum odit praesentium nemo
                      quasi ea iste commodi labore quis nobis excepturi error
                      libero.
                    </p>
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
            <hr /> */
