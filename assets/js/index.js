var contentDropdownEl = document.getElementById("content-dropdown");
var characterNameEl = document.getElementById("character-name");
var characterTitleEl = document.getElementById("character-title");
var characterDescEl = document.getElementById("character-desc");

//API key
const apiKey = "879eacf85a9c70745a7fb038ce0cca14";

// required details as per https://developer.marvel.com/documentation/authorization
const ts = +new Date();
console.log("TIME", ts);
const privateKey = "48df6dafa89bd8c2666981b77990fe8216f6f14c";

const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
console.log("HASH", hash);

var characterID = localStorage.getItem("characterID");
console.log(characterID);

//set varabiles for use with JavaScript
var character;
var characterDesc;
var characterImage;
var comics;
var comicsImages;
var comicName
var characterImageEl = document.getElementById("character-image");
var comicNameEl = document.getElementById("comic-name");

// add fetch to get character image and discription
async function getContent(characterName) {
  let response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterName}`
  );
  if (response.ok) {

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

    // 2nd fetch to get comic API
    let response2 = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=5`
    );
    if (response2.ok) {

      let json2 = await response2.json();
      comics = json2.data.results;
      // add comic names
      $(comicNameEl).empty()

      for (let i = 0; i < 4; i++) {

        comicName = json2.data.results[i].series.name;
        
        const liComicNameEl = document.createElement("li");
   
        comicNameEl.append(liComicNameEl);
        liComicNameEl.append(comicName);

      }
     
      // add comimc image and hyperlink them
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

// save selected character to local storage
function init() {
  var savedCharacter = localStorage.getItem("characterName");
  console.log(savedCharacter);
  if (savedCharacter !== []) {
    localStorage.setItem("characterName", savedCharacter);
    characterNameEl.value = localStorage.getItem("characterName");

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