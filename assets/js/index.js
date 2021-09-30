const apiKey = "879eacf85a9c70745a7fb038ce0cca14";

const ts = + new Date();
console.log("TIME", ts);
const privateKey = "48df6dafa89bd8c2666981b77990fe8216f6f14c";

const hash = CryptoJS.MD5(ts + privateKey + apiKey).toString();
console.log("HASH", hash);

const arrayForCharacter = ["Iron Man"]

// const selectEl = document.getElementById("my-select");

fetch(
  `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&hash=${hash}&ts=${ts}&limit=100&name=${arrayForCharacter}`
).then(function(response) {
  return response.json();
})
.then(function (data) {
  // TODO handle data
  console.log("DATA", data.data.results);

  // loop
  // create oprion
  // add option
});