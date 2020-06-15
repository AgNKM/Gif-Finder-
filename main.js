//variables
const apiKey = "eEkL3V2mH5xRE63NnTWgt1bHUjCRY25G",
  form = document.getElementById("form"),
  search = document.getElementById("input"),
  gifArea = document.getElementById("gif-area"),
  trendArea = document.getElementById("trends");

//eventListeners
function eventListeners() {
  form.addEventListener("submit", formSubmitted);

  document.addEventListener("DOMContentLoaded", trend);
}
eventListeners();

//functions
//function to display gifs on page load
function trend() {
  const url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => {
      let display = "";
      json.data.forEach((element) => {
        display += `
        <img src = '${element.images.fixed_width.url}' alt = ''/>
        `;
        trendArea.innerHTML = display;
      });
    })
    .catch((err) => {
      trendArea.innerHTML = `please check your connection: ${err.message}`;
    });
}

function formSubmitted() {
  const input = search.value;
  const url = `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}&limit=25`;

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      let output = "";
      json.data.forEach((element) => {
        output += `
        <div class = 'gif'>
        <p> ${element.title}</p>
        <img src='${element.images.fixed_width.url}' alt='${element.title}'/>
        </div>
        `;
      });
      const gif = document.createElement("div");
      gifArea.innerHTML = output;
    })
    .catch((err) => {
      console.log(err.message);
    });

  trendArea.style.display = "none";
}
