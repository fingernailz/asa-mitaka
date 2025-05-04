// const { Jimp } = require("jimp")
import { Jimp } from "jimp"

async function Gaussianblur(url, name) {
    const image = await Jimp.read(url)
    image.gaussian(7)
    await image.write(`Images/${name}.png`)
}

export default Gaussianblur