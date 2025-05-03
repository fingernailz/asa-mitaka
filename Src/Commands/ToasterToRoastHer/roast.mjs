// const { Roastra } = require("roastra")
import Roastra from "roastra/index.mjs"

export async function generateARoast(contact = null) {
    if (contact == null) {
        let roast = (await (await fetch("https://evilinsult.com/generate_insult.php")).text()).toLowerCase()
        return roast
    }

    const roaster = new Roastra({
        name : (await contact.getContact()).pushNumber
    })

    return (roaster.get()).sentance
}