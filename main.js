
const { Client, NoAuth, LocalAuth, Poll, Contact, ChatTypes, Chat, MessageAck, RemoteAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const {asd} = require("./hangman/hangman")

const client = new Client({
    authStrategy : new LocalAuth({
        dataPath : 'session'
    })
});
// 7908591717   
client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

client.on('message_create', message => {
	if (message.body === '!ping') {
		// reply back "pong" directly to the message
		message.reply('pong');
	}
});

client.on('message', async message => { 
    try {

    let arrayOfContacts = await (await message.getChat()).getContact();
    message.reply(arrayOfContacts)
    if (message.body == ".gcl") {
        let m = new Array();
        arrayOfContacts.forEach(element => {
            m.push(element.number)
        });
        m.forEach( element => {
            message.reply(`@${element}`)
        })
    } } catch (error) {
        message.reply("Error");
    }
}) 

client.on('message_create', message => {
    if (message.body.toLowerCase() === "hi") {
        message.reply("hi this is sanjay, do you need any help????? if yes I'd love to help you")
    }
})  


client.on('message', async message => {
    
    if (message.body == '.mp') {
        try {
        const poll = new Poll('should I need to shut up?', ['yes', 'no']);
        await message.reply(poll);
        } catch (error) {
            message.reply("Error occured mf")
        }
        return
    }
})

client.on('message', message => {
    if (message.body == ".sr") {
        message.reply("https://docs.wwebjs.dev/")
        message.reply("https://wwebjs.dev/")
        message.reply("https://github.com/pedroslopez/whatsapp-web.js/blob/main/example.js")
    }
})

client.on('message', message => {
    if (message.body == "ily") {
        message.react("😘");
    }
})

client.on('message', message => {
    if (message.body[0] + message.body[1] == ".p") {
        message.pin()
    }
})

client.on('message',async message => {
    if (message.body[0] + message.body[1] == ".u") {        try { 

        await message.unpin();
        await message.reply((await (message.getContact())).number);
        
        // client.sendMessage((await (message.getContact())).isBlocked)
        } catch (error) {
            client.sendMessage("Error occured");
        }
    }
})

client.on("message", async message => {
    message.reply(message.from)
    try {
     message.reply("HangMan will start with in sometime")
        // asd(client, message.from)
       await client.sendMessage(message.from, asd())
        message.reply("asdasd")
    
} catch(error) {
    console.log('asd asd')
}
 })

client.on('message', async message => {
    if (message.body[0] + message.body[1] == ".n" && (await message.getContact()).number == "919581805767") {
        await message.reply(((await message.getChat()).name))
    }
})

client.on('message', async message => {
    if (message.body[0] + message.body[1] + message.body[2] == ".dp" && (await message.getContact()).number == "919581805767") {
        (await message.getChat()).deletePicture();
    }
})  

client.on('message', async message => {
    if (message.body[0] + message.body[1] + message.body[2] == ".cm") {try{
        (await message.getChat()).clearMessages();
        message.reply("🫡 All the messages have been cleared from my account")
        return
        // message.reply((await message.getContact()).getChat());
    }
    catch (error) {
        message.reply("asd asd fr fr ")
    }}
})

client.on('message', async message => {
    if (message.body === ".leave") {
        // (await message.getChat()).isGroup.leave()
        let a = await message.getChat()
        message.reply(a.isGroup.toString())
        if (a.isGroup) {
            await a.leave();
        }
    } 
})   

client.on('message', async message => {
    if (message.body == "fuck") {
        message.delete(message.getChat())
        await message.reply("No bad words kanna")
    }
})

client.on("message", async message => {
    if (message.body.toString().toLowerCase() == "good job") {
        message.react("😁")
    }
})  

client.on("message", async message => {
    if (message.body[0] != "." && message.body[1] != 'm') {
        return
    }
    let sliced = message.body.split("&")
    // console.log(sliced)
    if (sliced.length <= 3) {
        message.reply("Invalid number of arguments try again")
        return
    }
    if (sliced[0].toLowerCase() === ".mp"){ 
        try {
        let another = sliced.slice(2);
        message.reply(new Poll(sliced[1], sliced.slice(2)))
        } catch (error) {
            message.reply("Error baby")
        } 
    }
})

let arrayOfMessages = new Array();

client.on('message', async message => {
    if (message.body[0] == ".")
    arrayOfMessages.push(message.body)
})


client.on('message', async message => {
    if (message.body = ".mute") {
        (await message.getChat()).mute(message.body.split(" ")[1]) 
    }
})

client.on('message',async message => {
    if (message.body == ".gd") {
        let m = await(await message.getChat()).fetchMessages();
        await (await message.getChat()).sendMessage('ashuttt');
        message.reply(`${m} \n ${arrayOfMessages}`)
        try {
        for (let i = 0; i < arrayOfMessages.length; i ++) {
            if (arrayOfMessages[i] == (await m[i].getChat())) {
                continue;
            }
            if (arrayOfMessages[i] != m[i].body) {
                message.reply(arrayOfMessages[i])
            }
        }
        } catch (error) {
            message.reply(error)
        }
        arrayOfMessages = new Array();
    }
})

client.on("call",async call => {
    console.log(call.from)
    if (call.isVideo) {
        try {
        await call.reject();
        await client.sendMessage(call.from, "No videos call from me");
        } catch (error) {
            console.log("error")
        }
}   
})

