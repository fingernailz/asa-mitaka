// const {Client} = require("spotify-api.js");
import { Client } from "spotify-api.js"

const client = await Client.create({
    token : {
        clientID : '6e7ec0c0f1a942e08f0347028ab5602a',
        clientSecret : '0a1dcda608254118aa6fff47b1c4c43e'
    },
    onReady() {
        console.log("workds")
    }
})

// console.log((await client.trac.get()).name)
// console.log((await client.users).email)
console.log((await client.tracks.getCurrentTrack()).name)
// console.log(client.token)
