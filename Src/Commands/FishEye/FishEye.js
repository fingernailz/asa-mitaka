import { Jimp } from "jimp";

async function EyeFish(url, name) {
    const image = await Jimp.read(url)
    image.fisheye()
    await image.write(`Images/${name}.png`)
}

export default EyeFish