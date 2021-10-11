//var searchBtn = document.getElementById("search-button")
var contentDropdownEl = document.getElementById("content-dropdown");
var characterNameEl = document.getElementById("character-name");
var characterTitleEl = document.getElementById("character-title");
var characterDescEl = document.getElementById("character-desc");

console.log(characterNameEl.value);

const apiKey = "879eacf85a9c70745a7fb038ce0cca14";

const ts = +new Date();
console.log("TIME", ts);
const privateKey = "48df6dafa89bd8c2666981b77990fe8216f6f14c";

const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
console.log("HASH", hash);

var characterID = localStorage.getItem("characterID");
console.log(characterID);

var character;
var characterDesc;
var characterImage;
var comics;
var comicsImages;
var comicName
var characterImageEl = document.getElementById("character-image");
//var comicImageEl = document.getElementById("comic-image");
var comicNameEl = document.getElementById("comic-name");

async function getContent(characterName) {
  let response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterName}`
  );
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let json = await response.json();
    character = json.data.results[0];
    characterDesc = json.data.results[0].description;
    characterImage = json.data.results[0].thumbnail.path;

    $(characterDescEl).empty()
    characterDescEl.append(characterDesc)

    const liCharacterEl = document.createElement("li");
    const imgEl = document.createElement("img");

    $(characterImageEl).empty()
    imgEl.src = `${characterImage}.jpg`;
    liCharacterEl.appendChild(imgEl);
    characterImageEl.appendChild(liCharacterEl);

    let response2 = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=5`
    );
    if (response2.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json2 = await response2.json();
      comics = json2.data.results;
      // add comic names
 $(comicNameEl).empty()

      for (let i = 0; i < 4; i++) {
         comicName = json2.data.results[i].series.name;
      comicNameEl.append(comicName);
        }
     

      //const liComicNameEl = document.createElement("li");

     
      

      // add comic image
      //comicImage = json2.data.results[0].images[0].path;
      //comicImage = json2.data.results[1].images[0].path;

      //const liComicEl = document.createElement("li");
      //const imgComicEl = document.createElement("img");

      //$(comicImageEl).empty()
      //imgComicEl.src = `${comicImage}.jpg`;
      //liComicEl.appendChild(imgComicEl);
      //comicImageEl.appendChild(liComicEl);

    } else {
      alert("HTTP-Error: " + response2.status);
    }
  } else {
    alert("HTTP-Error: " + response.status);
  }

}

function init() {
  var savedCharacter = localStorage.getItem("characterName");
  console.log(savedCharacter);
  if (savedCharacter !== []) {
    localStorage.setItem("characterName", savedCharacter);
    characterNameEl.value = localStorage.getItem("characterName");
    //characterTitleEl.innerHTML = characterNameEl.options[characterNameEl.selectedIndex].text;

    getContent(savedCharacter);
    console.log(savedCharacter);
  } else {
    characterTitleEl.innerHTML = "";
  }
}

init();

var contentNameEl = document.getElementById("content-dropdown");

document.getElementById("search-button").onclick = function () {

  if (characterNameEl.value) {
    localStorage.setItem("characterName", characterNameEl.value);

    characterTitleEl.innerHTML =
      characterNameEl.options[characterNameEl.selectedIndex].text;

    getContent(characterNameEl.value);
  } else {
    characterTitleEl.innerHTML = "";
  }
};