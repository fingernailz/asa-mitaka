import { Jimp } from "jimp";

async function SetSipiaTone(url, name) {
    const Image = await Jimp.read(url)
    Image.sepia();
    await Image.write(`Images/${name}.png`)
}

export default SetSipiaTone