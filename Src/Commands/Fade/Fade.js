import { Jimp } from "jimp";

async function FadeImage(url, name, orderOfMagitude = 0.8) {
    const image = await Jimp.read(url)
    image.fade(orderOfMagitude)
    await image.write(`Images/${name}.png`)
}

export default FadeImage