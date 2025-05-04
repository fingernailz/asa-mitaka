import { Jimp } from "jimp";

async function GreyScale(url, name) {
    const Image = await Jimp.read(url)
    Image.greyscale()
    await Image.write(`Images/${name}.png`)
}

export default GreyScale