import { Jimp } from "jimp";

async function Mask(ProfilePicUrl, name) {
    const user = await Jimp.read(ProfilePicUrl)
    const hitler = await Jimp.read("https://cdn.britannica.com/59/129959-050-565D90D4/Adolf-Hitler-1930s.jpg")
    hitler.autocrop(
        user.height,
        user.width
    )
    user.mask(hitler)
    await user.write(`Images/${name}.png`)
}

export default Mask