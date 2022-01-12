window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  const $ = id => document.getElementById(id);


  if (!JSON.parse(localStorage.getItem('favorites')) || JSON.parse(localStorage.getItem('favorites')).length === 0) {
    let favorite = [];
    localStorage.setItem('favorites', JSON.stringify(favorite));
    $('favoritas').style.display = 'none';
  } else {
    $('favoritas').style.display = 'inline';
  } 

  // Aqui debemos agregar nuestro fetch
const apiCall = async () => {
  try{
    let response = await fetch("http://localhost:3031/api/movies") //hago el pedido
    let peliculas = await response.json();

    console.log(peliculas); // para ver que me responde

 
  // Codigo que debemos usar para mostrar los datos en el frontend
    let data = peliculas.data;


    data.forEach((movie) => {

      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;
      const verMas = document.createElement('a');
      verMas.setAttribute('class', 'botonAgregar')
      verMas.innerHTML = '<i class="far fa-eye"></i>'
      verMas.href = "formulario.html?id="+ movie.id;

      const action = document.createElement('div');
      action.setAttribute('class', 'action')
      const start = document.createElement('button');
      start.setAttribute('class', 'botonAgregar')
      start.innerHTML = '<i class="far fa-star"></i>';
      start.setAttribute('id', 'favoriteOff' + movie.id)
      start.onclick = () => {
        $('favoriteOff' + movie.id).setAttribute('hidden', true);
        $('favoriteOn' + movie.id).removeAttribute('hidden');
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        favorites.push(movie.id);
        localStorage.setItem("favorites", JSON.stringify(favorites))
        console.log(localStorage.getItem('favorites'))
      }

      const start2 = document.createElement('button');
      start2.setAttribute('class', 'botonAgregar')
      start2.innerHTML = '<i class="fas fa-star"></i>';
      start2.setAttribute('hidden', true);
      start2.setAttribute('id', 'favoriteOn' + movie.id);
      start2.onclick = () => {
        $('favoriteOn' + movie.id).setAttribute('hidden', true);
        $('favoriteOff' + movie.id).removeAttribute('hidden')
      }

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      action.appendChild(verMas)
      action.appendChild(start)
      action.appendChild(start2)

      card.appendChild(action)
    });
  } catch(error) {
    console.log(error);
  }
};
apiCall();



};