const Discord = require('discord.js')
const { prefix: p } = require('./config.json')
const Canvas = require('canvas')
require('dotenv').config()

const client = new Discord.Client()

client.on('ready', () => {
  console.log('How may I serve you?')
})

const addPicture = async (attachmentPath, attachmentName, attachmentTitle, message, width, height) => {
    const canvas = Canvas.createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage(attachmentPath)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    const attachment = new Discord.Attachment(canvas.toBuffer(), attachmentName)
    message.channel.send(attachmentTitle, attachment)
}

client.on('message', message => {
    if (message.content === `${p}ismarkgay`) {
        message.channel.send('YES!');
    }
    else if (message.content === `${p}picture`) {
        addPicture('./wallpaper.jpg', 'welcome-image1.png', 'This is working!', message, 700, 400)
    }
    else if (message.content === `${p}zulrah-void`) {
        addPicture('./zulrah-void.png', './zulrah-void.png', "So, you think you're ready to take on Zulrah?", message, 1293, 753)
    }
})

client.login(process.env.TOKEN)