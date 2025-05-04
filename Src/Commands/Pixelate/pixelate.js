import { Jimp } from "jimp";

async function Pixelate(url, name) {
    const image = await Jimp.read(url)
    image.pixelate(10)
    await image.write(`Images/${name}.png`)
}

export default Pixelate