async function leaveChat(wwclient, message) {
    let chat = message.getChat();

    if (!chat.isGroup) {
        return wwclient.sendMessage(message.from, "Not a group chat")
    }

    if (await chat.leave()) {
        return true
    }
    
    return false
}

export default leaveChat