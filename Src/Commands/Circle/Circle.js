import { Jimp } from "jimp";

async function MakeACircle(url, name) {
    const image = await Jimp.read(url)
    image.circle()
    await image.write(`Images/${name}.png`)
}

export default MakeACircle