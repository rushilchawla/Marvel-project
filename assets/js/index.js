var contentDropdownEl = document.getElementById("content-dropdown");
var characterNameEl = document.getElementById("character-name");
var characterTitleEl = document.getElementById("character-title");

//API key
const apiKey = "879eacf85a9c70745a7fb038ce0cca14";

// required details as per https://developer.marvel.com/documentation/authorization
const ts = +new Date();
//console.log("TIME", ts);
const privateKey = "48df6dafa89bd8c2666981b77990fe8216f6f14c";

const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
//console.log("HASH", hash);

var characterID = localStorage.getItem("characterID");
//console.log(characterID);

//set varabiles for use with JavaScript
var character;
var characterDesc;
var characterDescEl = document.getElementById("character-desc");
var characterImage;
var characterImageEl = document.getElementById("character-image");
var characterDescWebsite;
var characterDescWebsiteEl = document.getElementById("character-desc-website");
var characterEvents;
var comics;
var comicImage;
var comicImageEl = document.getElementById("comic-image");
var comicName;
var comicNameEl = document.getElementById("comic-name");

// add fetch to get character image and discription
async function getContent(characterName) {
  let response = await fetch(
    `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterName}`
  );
  if (response.ok) {

    let json = await response.json();
    //set vaules for variables as per the json response
    character = json.data.results[0];
    characterDesc = json.data.results[0].description;
    characterImage = json.data.results[0].thumbnail.path;
    characterDescWebsite = "To access "+json.data.results[0].name+"'s Marvel Profile Page click here";

    //add link to Marvels profile page for character selected
    $(characterDescWebsiteEl).empty()
    characterDescWebsiteEl.append(characterDescWebsite)
    characterDescWebsiteEl.onclick = function() {
      window.open(`${json.data.results[0].urls[1].url}.wiki`,'_blank');
      window.open(`${json.data.results[0].urls[1].url}.wiki`);
    };

    // make element for appending
    const liCharacterEl = document.createElement("li");
    const imgEl = document.createElement("img");
    
    //add image of character
    $(characterImageEl).empty()
    imgEl.src = `${characterImage}.jpg`;
    imgEl.height = 450;
    imgEl.width = 450;
    liCharacterEl.appendChild(imgEl);
    characterImageEl.appendChild(liCharacterEl);

    // add discription of character
    $(characterDescEl).empty()
    characterDescEl.append(characterDesc)

    // 2nd fetch to get comic API
    let response2 = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${character.id}/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=10`
    );
    if (response2.ok) {

      let json2 = await response2.json();
      //set vaules for variable as per the json response
      comics = json2.data.results;
      // add comic names, images and hyperlink
      $(comicNameEl).empty()
      $(comicImageEl).empty()

      for (let i = 0; i < 10; i++) {

        comicName = json2.data.results[i].series.name;
        comicImage = json2.data.results[i].thumbnail.path;

        //const liComicNameEl = document.createElement("li");
        const imgComicEl = document.createElement("img");
        // add comimc image and hyperlink them
        imgComicEl.src = `${comicImage}.jpg`;
        imgComicEl.height = 350;
        imgComicEl.width = 185;
        imgComicEl.onerror="this.src='https://www.unesale.com/ProductImages/Large/notfound.png'"
        imgComicEl.onclick = function() {
          window.open(`${json2.data.results[i].urls[0].url}`,'_blank');
          window.open(`${json2.data.results[i].urls[0].url}`);
        };

        comicImageEl.append(imgComicEl);
        //comicNameEl.append(liComicNameEl);
        //liComicNameEl.append(comicName);             

      }
      // // 3rd fetch to get event API
      // let response3 = await fetch(
      //   `https://gateway.marvel.com/v1/public/characters/${character.id}/events?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=50`
      // );
      // if (response3.ok) {

      //   let json3 = await response3.json();
      //   //set vaules for variables as per the json response
      //   characterEvents = json3.data.results;

      // } else {
      //   alert("HTTP-Error: " + response3.status);
      // }
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
//  console.log(savedCharacter);
  if (savedCharacter !== []) {
    localStorage.setItem("characterName", savedCharacter);
    characterNameEl.value = localStorage.getItem("characterName");

    getContent(savedCharacter);
//    console.log(savedCharacter);
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