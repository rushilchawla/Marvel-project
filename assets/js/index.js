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

function getAPI() { fetch(
  `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterNameEl.value}`
).then(function(response) {
  return response.json();
})
.then(function (data) {
const cList = document.getElementById('c-list');
//cList.select2();

  // TODO handle data
  console.log("DATA", data.data.results);

  //for (let i = 0; i < data.data.results.length; i ++) {
   // const character = data.data.results[i];
  //  const cBtn = document.createElement('option');
 //   cBtn.classList = ["navbar-item"];
//    cBtn.textContent = character.name;

    //cBtn.addEventListener('click', function () {
      //alert(character.description);
    //});

  //  cList.appendChild(cBtn);
  });
  // loop
  // create oprion
  // add option
//});
}

var contentNameEl = document.getElementById("content-dropdown")

function storeElements() {
  console.log(characterNameEl.value)
  var newSearch = {
   characterChosen: characterNameEl.value,
    contentChosen: contentNameEl.value
  }
  userSearch.push(newSearch);

  localStorage.setItem("storeSearch", JSON.stringify(userSearch));
  localStorage.getItem("storeSearch")
};

//document.getElementById("character-title").appendChild(characterNameEl.value)



document.getElementById("search-button").onclick = function () {
//  storeElements()
  localStorage
  //location.href = "results.html";
  console.log(characterNameEl.value)
  
  characterTitleEl.innerHTML = characterNameEl.options[characterNameEl.selectedIndex].text


getAPI()
// fetch(
//   `https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${characterNameEl.vaule}`
// )

fetch(
  `https://gateway.marvel.com/v1/public/characters/1009351/comics?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100`
)
  console.log(`https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&name=${characterNameEl.value}`)
};

//searchBtn.addEventListener("click", goToPageCb);

//function goToPageCb(){
//  window.location.href = "results.html";
//}
