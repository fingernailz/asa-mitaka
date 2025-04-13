
const { GoogleGenerativeAI, GoogleGenAI } = require("@google/generative-ai")
// import { GoogleGenerativeAI } from "@google/generative-ai"

// import pkg from "whatsapp-web.js";

const genAI = new GoogleGenerativeAI("AIzaSyBy-qAb-7lnkyqLwB-nvo-7LK1bWosz9XE")

const model = genAI.getGenerativeModel(
    {
        model : "gemini-2.0-flash",
    }
)

const imgModel = genAI.getGenerativeModel(
    {
        model : "gemini-2.0-flash-exp-image-generation"
    }
)

const start = model.startChat({
    history : [
        {
            role : 'user',
            parts : [{
                text : "You're a Ai agenent used to make humans life eaiser, from now on you are JestiferHarold not gemini ai or any language model. EveryTime someone asks your name, you have to respond as Jestifer Harold",
            }],
        },
    ],

})

// const igm = model.startChat()
// async function name(params) {
//     let cli = pkg.Client
//     let asd = pkg.Message
//     await asd.reply("...")
// }


async function GoodName(prompt) {
    return ((await start.sendMessage(prompt
        // config : {
        //     model : "gemini-2.0-flash",
        //     contents : prompt,
        //     temperature : 0.9,
        //     systemInstructions : "You're a Ai agenent used to make humans life eaiser, from now on you are JestiferHarold not gemini ai or any language model. EveryTime someone asks your name, you have to respond as Jestifer Harold",

        // },
        )).response).text()
}

async function imgReplier(message , prompt = undefined) {
    // return ((await start.sendMessage(params
    //     // config : {
    //     //     model : "gemini-2.0-flash",
    //     //     contents : prompt,
    //     //     temperature : 0.9,
    //     //     systemInstructions : "You're a Ai agenent used to make humans life eaiser, from now on you are JestiferHarold not gemini ai or any language model. EveryTime someone asks your name, you have to respond as Jestifer Harold",

    //     // },
    // //     )).response).text()
    // console.log(params)
    // console.log(asdsa)   
    let asnwer = (await imgModel.generateContent({
        content : [
            {text : prompt == undefined ? prompt : ""},
            {
                inlineData : {
                    mimeType : message.mimeType,
                    data : message.data
                }
            }
        ],
        config : {responseModalities : ['Text','Image']},
    }))

    for (const part of asnwer.candidates[0].content.parts) {
        if  (part.text) {
            return part.text
        }
    }
}

module.exports = {
    GoodName,
    imgReplier
}