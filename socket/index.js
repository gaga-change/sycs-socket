const socketIo = require('socket.io')
const chat = require('./chat')

const io = socketIo()
chat(io)


module.exports = io