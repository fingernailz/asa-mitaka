import { Jimp } from "jimp";

async function FlipImage(url, name) {
    const image = await Jimp.read(url)
    let horizontal = true
    let vertical = true
    image.flip({horizontal, vertical})
    await image.write(`Images/${name}.png`)
}

export default FlipImage