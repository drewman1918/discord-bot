const Discord = require('discord.js')
const Canvas = require('canvas')
require('dotenv').config()
const data = require('./data.js').data

const client = new Discord.Client()

client.on('ready', () => {
    console.log('How may I serve you?')
    client.user.setActivity('Try !setups')
})

const addPicture = async (attachmentPath, attachmentName, attachmentTitle, message, width, height) => {
    const canvas = Canvas.createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage(attachmentPath)
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    const attachment = new Discord.Attachment(canvas.toBuffer(), attachmentName)
    message.channel.send(attachmentTitle, attachment)
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.on('message', message => {
    let commandObject = data.find(command => command.command === message.content)
    if (commandObject) {
        addPicture(commandObject.path, commandObject.path, commandObject.title, message, commandObject.width, commandObject.height)
    }
    else if (message.content === '!setups') {
        let listOfCommands = data.map(command => command.command)
        message.channel.send(`My commands are:\n${listOfCommands.join('\n')}`)
    } else if (message.content.startsWith('!tanksplit')) {
        let command = message.content.replace(/\s/g, '');
        
        let numbers = command.split('!tanksplit')[1].trim().toLowerCase()

        let amount = numbers.split('/')[0]
        let n = numbers.split('/')[1]
        
        if (amount.includes('k')) {
            amount = Number(amount.split('').filter(letter => letter !== 'k').join('')) * 1000
        } else if (amount.includes('m')) {
            amount = Number(amount.split('').filter(letter => letter !== 'm').join('')) * 1000000
        } 

        amount = Number(amount)
        n = Number(n)

        let avg = (amount * 0.9) / n
        let tankSplit = Math.round(avg + (amount * 0.1))
        let normalSplit = Math.round(avg)

        message.channel.send(`Tank Split: ${numberWithCommas(tankSplit)}\nNormal Split: ${numberWithCommas(normalSplit)}`)
    }
})

client.login(process.env.TOKEN)