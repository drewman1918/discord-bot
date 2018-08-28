const Discord = require('discord.js')
const Canvas = require('canvas')
require('dotenv').config()
const data = require('./data.js').data

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
    let commandObject = data.find(command => command.command === message.content)
    if (commandObject) {
        addPicture(commandObject.path, commandObject.path, commandObject.title, message, commandObject.width, commandObject.height)
    }
    else if (message.content === '!setups') {
        let listOfCommands = data.map(command => command.command)
        message.channel.send(`My commands are:\n${listOfCommands.join('\n')}`)
    }
})

client.login(process.env.TOKEN)