//nodemon --inspect index.js

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./auth.json');
const prefix = '!';
const botID = '845469439901696007';

//words that will ban people
let words = ["SAYINGTHISWILLBANSOMEONE"];
//characters that are similar
let similar = [["o", "0"]]

bot.login(token["token"]);

bot.on('ready', () => {
    bot.user.setActivity('Banning people');
    console.log('online');
})

bot.on('message', message => { 
    let args = message.content.substring(prefix.length).split(" ");
    const user = message.author.id;
    const content = message.content;
    const member = message.guild.member(user);
    const name = message.author.name;
    if (user != botID) {
        if (words.includes(cleanMessage(content.toLowerCase())) || searchMessage(cleanMessage(content.toLowerCase())) && user != "845469439901696007") {
            if (user) {
                if (member) {
                    member.ban('You were banned for saying something that is not allowed in this server.').then(() => {
                        message.reply(`Successfully banned ${name}`)
                    }).catch(err => {
                        message.reply('Error banning');
                    })
                }
            }
        }
    }
});

let searchMessage = (message) => {
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < message.length; j++) {
            if (message.substring(j, j+(words[i].length)) == words[i]) {
                return true;
            } 
        }
    }
    return false;
}

let cleanMessage = (message) => {
    let arr = message.split("");
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == " " || ! isCharacterALetter(arr[i])) {
            arr.splice(i, 1);
        }
    }
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < similar.length; j++) {
            if (arr[i] == similar[j][1]) {
                arr[i] = similar[j][0];
            }
        }
    }
    return arr.join("");
}
function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
}