const { Client, NoAuth, LocalAuth, Poll, Contact, ChatTypes, Chat, MessageAck, RemoteAuth, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// const {asd} = require("./hangman/hangman
const asding2 = require('./Src/Commands/Gemini/gemini')
const as = require("node:fs")
const jokess = require("./Src/Commands/Jokes/jokes.mjs")
const cmd = require("child_process")

const client = new Client({
    authStrategy : new LocalAuth({
        dataPath : 'session'
    })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

let arrayOfBadWords = ["fuck"];

let isGenModeOn = false;

function parseThroughBadWords(message) {
    let messageSplit = message.split(" ");
    arrayOfBadWords.forEach(function (element) {
            if (messageSplit.includes(element)) {
                return true;
            }
        });
}

// I'm Soooooo fucking dumb like WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF, I can't even implement this properly.

client.on("message", message => {
    if (message.body.slice(0,4) == ".run") {
        console.log('asdadsda')
        // console.error('asd asd asd ')
        try {
        cmd.exec(message.body.slice(5), (err, stdout, stderr) => {
            if (err) {
                message.reply("Ending all process")
                throw new Error("Ending the process")
            }
        }) }
        catch (e) {
            client.sendMessage(message.from, "Ending all process.")
            throw new Error("Ending all process")
        }
        console.log('asd')
    }
})

client.on('message', async message => {
    if (message.body[0] + message.body[1] == '.j') {
        
        if (message.body == '.j') {
            let hi = await message.reply("\t{fetching . . . 🫸🏼}\t")
            let joking = await jokess.getAJoke()
            console.log(joking)
            hi.edit(joking == undefined ? "Error fetching joke but no worries just look in the mirror 😉" : joking)
            return
        }
        
        // // client.s
        // // let json = 
        // console.log(jokess)
        // console.log(typeof joking)
        // console.log(joking.joke)
        // console.log(joking)
        // client.sendMessage(message.from, joking)
        // message.reply(JSON.parse(joking))
        // hi.edit(joking.text() == undefined ? "Error fetching joke but no worries just look in the mirror 😉" : joking.text())
    }
})

client.on('message',async message => {
    // if (message.body == "asd") {
    //     // message.reply("ashut")
    //     // message.hasQuotedMsg
      
    // }
    // if (message.hasMedia) {
    //     let mdia = await message.downloadMedia()
    //     // const image = mdia.data
    //     let decodeData =  Buffer.from(mdia.data, "base64");
        
    //     as.writeFileSync(mdia.filename + mdia.mimetype, decodeData);
    // }
})

let arrayOfChats = new Array();

client.on("message", async (message) => {
    
    let asding = message.body.split(" ")
    
    if (asding[0] == ".gen" || isGenModeOn) {
        
        if (!isGenModeOn && asding.length == 1 && asding[0] == ".gen") {
            isGenModeOn = true;
            client.sendMessage(message.from, "Gen mode has started")
        } else if (isGenModeOn && asding.length == 1 && asding[0] == ".gen") {
            isGenModeOn = false;
            client.sendMessage(message.from, "gen mode has stopped")
        } else if (asding.length > 1){
            asding = asding.slice(1)
            if (message.hasMedia) {
                let asd = await message.downloadMedia()
                await asding2.imgReplier(asd, message.body)
                return
            }
            let reply = await message.reply("Generating Reply ....")
            await reply.edit(await asding2.GoodName(asding))
            // await message.edit(await message.body.replace(message.body, "asdada"))
        } else {
            if (message.hasMedia) {
                let asd = await message.downloadMedia()
                await asding2.imgReplier(asd, message.body)
                return
            }
            let reply = await message.reply("Generating Reply ....")
            await reply.edit(await asding2.GoodName(asding.slice()))
            // await message.edit(await message.body.replace(message.body, await asding2.GoodName(asding.slice())))
        }
    }
})

client.on("ready", async () => {
    (await client.getChats()).forEach(element => {
        arrayOfChats.push(element.id)
    });
})

client.on("message", message => {
    if (message.body == "asd") {
        client.sendMessage(message.from, arrayOfChats )
        console.log(arrayOfChats)
    }
})

let arrayOfMessages = new Array();

client.on('message', async message => {
    arrayOfMessages.push(((await message.getChat()).lastMessage.body))
})

// client.on("message", async message => {
//     if 
// })

client.on('message', async message => {
    if (isGenModeOn) {
        return
    }
    // message.reply(message.body)
    if (message.body[0] == ".") {
        return
    }
    if (message.body === '!ping') {
		message.reply('pong');
	} else if (message.body.toLowerCase() === "hi") {
        message.reply("Hi")
    } 
    else if (message.body == "ily") {
        message.react("😘");
    } 
    // else if (() => {
    //     let messageSplit = message.split(" ");
    // arrayOfBadWords.forEach(function (element) {
    //         if (messageSplit.includes(element)) {
    //             return true;
    //         }
    //     });
    // }) {
    //     message.delete(message.getChat())
    //     // await message.reply("No bad words kanna")
    //     client.sendMessage(message.from,"No bad words kanna" )
     else if (message.body.toString().toLowerCase() == "good job") {
        message.react("😁")
    }
})

client.on("vote_update", vote => {
    client.sendMessage(vote.voter, "you've voted for this faggot")
})

client.on("message", async message => {
    if (message.body.charAt(0) !== ".") {
        return
    }

    if (message.body == ".aom") {
        await (await message.getChat()).setMessagesAdminOnly()
    }
    
    if (message.body.slice(1).toLowerCase() == "list") {
        client.sendMessage(message.from, "Working Commands\n" + '\n\`.gen => Gemini AI\`\n\`.mp => Making a Poll\`\n\`.n => name of the chat\`\n\`.dp => delete profile pic\`\n\`.cm => delete messages a\`\n\`.leave => Exit group\`\n\`.mute => mute notifications\`\n\`.sr => reference\`')
    }
    else if (message.body == ".gcl") {
        try {

            let arrayOfContacts = await (await message.getChat()).getContact();
            message.reply(arrayOfContacts)
            
                let m = new Array();
                arrayOfContacts.forEach(element => {
                    m.push(element.number)
                });
                m.forEach( element => {
                    message.reply(`@${element}`)
                })
         } catch (error) {
                message.reply("Error");
            }
    } else if (message.body[1] + message.body[2] + message.body[3] == "cdp") {try {

        // ((await message.getChat()).isGroup) ? ((await message.getChat()).setPicture(MessageMedia.fromUrl("https://static.wikia.nocookie.net/chainsaw-man/images/5/54/Makima_Reze_Arc_anime_design.png"))) : client.sendMessage(message.from, "not working");
    }   catch(error) {

    }   }
    
    else if (message.body.slice(1,3) == 'mp') {
        try {
        const poll = new Poll('should I need to shut up?', ['yes', 'no']);
        await message.reply(poll);
        } catch (error) {
            message.reply("Error occured mf")
        }
        return
    } else if (message.body == ".sr") {
        message.reply("https://docs.wwebjs.dev/")
        message.reply("https://wwebjs.dev/")
        message.reply("https://github.com/pedroslopez/whatsapp-web.js/blob/main/example.js")
    } else  if (message.body[1] == "p") {
        message.pin()
    } else if (message.body[1] == "u") {        try { 

        await message.unpin();
        await message.reply((await (message.getContact())).number);
        
        // client.sendMessage((await (message.getContact())).isBlocked)
        } catch (error) {
            client.sendMessage("Error occured");
        }
    } else if (message.body.toLowerCase() === ".hm") {
 message.reply(message.from)
    try {
     message.reply("HangMan will start with in sometime")
        // asd(client, message.from)
       await client.sendMessage(message.from, asd())
        message.reply("asdasd")
    
} catch(error) {
    console.log('asd asd')
} } else if (message.body[1] == "n" && (await message.getContact()).number == "919581805767") {
    await message.reply(((await message.getChat()).name))
} else if (message.body[1] + message.body[2] == "dp" && (await message.getContact()).number == "919581805767") { try {
    (await message.getChat()).deletePicture();
} catch (error) {
    client.sendMessage(message.from, "llmaoo")
}
} else if (message.body[1] + message.body[2] == "cm") {try{
    let message2 = message.from;
    // if (!(await message.getChat()).isGroup) {
    //     return
    // }
    (await message.getChat()).clearMessages();
    client.sendMessage(message2, "🫡 All the messages have been cleared from my account")
    // return
    // message.reply((await message.getContact()).getChat());
}
catch (error) {
    // message.reply("asd asd fr fr ")
    client.sendMessage(message.from, "Error while clearing messages from client, unable to clear contact 9581805767 for manual clearing")
}} else if (message.body === ".leave") {
    // (await message.getChat()).isGroup.leave()
    let a = await message.getChat()
    message.reply(a.isGroup.toString())
    if (a.isGroup) {
        await a.leave();
    }
} else if (message.body[1] + message.body[2] == "mp") {
let sliced = message.body.split("&")
// console.log(sliced)
if (sliced.length <= 3) {
    message.reply("Invalid number of arguments try again")
    return
}try {
    let another = sliced.slice(2);
    client.sendMessage(message.from, new Poll(sliced[1], sliced.slice(2)))
    } catch (error) {
        message.reply("Error baby")
    } 
}
    else  if (message.body = ".mute") {
        (await message.getChat()).mute(message.body.split(" ")[1]) 
    }
else if ((message.body[1] + message.body[2] + message.body[3] + message.body[4]).toLowerCase() == "list"){
    client.sendMessage(message.from, "These are all the avaiable options")
} 
    
})

client.on("message" , async message => {
    if (message.body == ".gd"){
        message.reply('asd asd asd ')
        let m = (await message.getChat()).fetchMessages();
        // await (await message.getChat()).sendMessage('ashuttt');
        if ((await m).length === arrayOfMessages.length) {
            arrayOfMessages = new Array();
            (await message.getChat()).clearMessages();
            return
        }
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

client.on("message", async message => {
    if (message.body === ".DELETE.GROUP.BY.FORCE" && (await message.getContact()).number === "9581805767") {
        (await message.getChat()).delete();
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