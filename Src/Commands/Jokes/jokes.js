const {exec} = require('child_process');

let asd = exec("curl GET https://sv443.net/jokeapi/v2/joke/Any");
console.log(asd)