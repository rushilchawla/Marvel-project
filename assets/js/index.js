//var searchBtn = document.getElementById("search-button")
var contentDropdownEl = document.getElementById("content-dropdown")
var characterNameEl = document.getElementById("character-name")
var characterTitleEl = document.getElementById("character-title")

console.log(characterNameEl.value);

const apiKey = "879eacf85a9c70745a7fb038ce0cca14";

const ts = + new Date();
console.log("TIME", ts);
const privateKey = "48df6dafa89bd8c2666981b77990fe8216f6f14c";

const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
console.log("HASH", hash);

var characterID = localStorage.getItem("characterID");
console.log(characterID)

var character;
var comics;

async function getContent() {
  let response = await fetch (
    `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterNameEl.value}`
  )
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    character = json.data.results[0]
    let response2 = await fetch (
      `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100`
    )
    if (response2.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json2 = await response2.json();
      comics = json2.data.results
    } else {
      alert("HTTP-Error: " + response2.status);
    }
  } else {
    alert("HTTP-Error: " + response.status);
  }
}


var contentNameEl = document.getElementById("content-dropdown");

function storeElements() {
  console.log(characterNameEl.value)

  localStorage.setItem("characterID", data.results[0].id);

};

//document.getElementById("character-title").appendChild(characterNameEl.value)

document.getElementById("search-button").onclick = function () {
  //storeElements()
  localStorage
  //location.href = "results.html";
  console.log(characterNameEl.value)
  
  characterTitleEl.innerHTML = characterNameEl.options[characterNameEl.selectedIndex].text

  // fetch(
  //   `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterNameEl.value}`
  // ).then(function(response) {
  //   console.log(response)
  //   return response.json();
  // })
  //getComicsAPI()
  getContent()

  // console.log(`https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&name=${characterNameEl.value}`)
}