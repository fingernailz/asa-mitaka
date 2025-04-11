const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI("AIzaSyBy-qAb-7lnkyqLwB-nvo-7LK1bWosz9XE")

const model = genAI.getGenerativeModel(
    {
        model : "gemini-1.5-flash"
    }
)

async function GoodName(prompt) {
    return ((await model.generateContent(prompt)).response).text()
}

module.exports = {
    GoodName
}