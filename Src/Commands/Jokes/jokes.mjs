// const {axios} = require("axios")
// import { Axios } from "axios"

// const response = await Axios.get("https://sv443.net/jokeapi/v2/joke/Any")
// // console.log((response.json().joke))
// // const fetch = require("node-fetch")
// const asd = await fetch("https://sv443.net/jokeapi/v2/joke/Any").then(Response =>  Response.json())
//     console.log(asd.joke)

// const response = await fetch("https://sv443.net/jokeapi/v2/joke/Any")
// const data = await response.json();
// console.log(data.joke)'

// const fetch = require("node-fetch")
import fetch from "node-fetch"
// const fetch = re

// array  = [cat, blacklist = [], type]
// try {
export async function getAJoke(cat = ["any"], blacklist = null, type = null) {
    // try {
        // if (cat.length == 1) {
        //     cat = cat.join("")
        // } else {
            for (let i = 0; i < cat.length; i++) {
                if (cat[i] == "a") {
                    cat = "any"
                    break
                } else if (cat[i] == "p") {
                    cat[i] = "programming"
                } else if (cat[i] == "m") {
                    cat[i] = "misc"
                } else if (cat[i] == "d") {
                    cat[i] = "dark"
                } else if (cat[i] == "pun") {
                    continue
                } else if (cat[i] == "s") {
                    cat[i] = "spooky"
                } else if (cat[i] == "c") {
                    cat[i] = "Christmas"
                }
            }
            if (typeof cat == 'object') {
                cat.join()
            }
            console.log(cat)
        
        let jokeApi = "https://v2.jokeapi.dev/joke/" + cat + "?format=txt"
        
        let response = await fetch(jokeApi)
        return response.text() 
        // let json = await response.json()
        // return json
    // } catch (error) {}
} 
// // } catch (error) {}
// console.log(await getAJoke().jokes)
// const jokes = await getAJoke()
// console.log(jokes)
// console.log(await jokes.json())
// console.log(jokes.joke)
// modules.exports = {
//     getAJoke
// }