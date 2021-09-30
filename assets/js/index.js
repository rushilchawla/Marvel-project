return fetch(
  `https://gateway.marvel.com:443/v1/public/characters?apikey=`
).then(function(response) {
  return response.json();
});