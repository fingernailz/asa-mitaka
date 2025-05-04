import { Jimp } from "jimp";

async function DitherEffect(url, name) {
    const Image = await Jimp.read(url)
    Image.dither()
    await Image.write(`Images/${name}.png`)
}

export default DitherEffect