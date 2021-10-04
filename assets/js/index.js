//var searchBtn = document.getElementById("search-button")
var contentDropdownEl = document.getElementById("content-dropdown")


const apiKey = "879eacf85a9c70745a7fb038ce0cca14";

const ts = + new Date();
console.log("TIME", ts);
const privateKey = "48df6dafa89bd8c2666981b77990fe8216f6f14c";

const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
console.log("HASH", hash);


var arrayForCharacter = ["Iron Man"]

// //adding event listener to select the characters
// var navbarEl = document.getElementsByClassName("navbar-item")

// navbarEl.addEventListener("click", function(){})

// const selectEl = document.getElementById("my-select");

fetch(
  `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&name=${arrayForCharacter}`
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

document.getElementById("search-button").onclick = function () {
  localStorage
  location.href = "results.html";
};

//searchBtn.addEventListener("click", goToPageCb);

//function goToPageCb(){
//  window.location.href = "results.html";
//}
