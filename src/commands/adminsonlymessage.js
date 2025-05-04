async function changeMessageSettings(wwclient, message) {
    let readonly = (await message.getChat()).isReadOnly
    if (readonly) {
        if (await (await message.getChat()).setMessagesAdminsOnly(true)) {

            client.sendMessage(message.from, "Messages set to read only")
            return true
        } else {

            client.sendMessage(message.from, "Not enough permissions to change settings")
            return false
        }

    } 

    if (await (await message.getChat()).setMessagesAdminsOnly(false)) {

        client.sendMessage(message.from, "Messages set to write for all")
        return true
    } else {
        client.sendMessage(message.from, "Not enough permissions to change settings")
    }
    return false

}

export default changeMessageSettings