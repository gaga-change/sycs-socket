/**
 * 用户&客服 交流
 */
const db = require('../db')

module.exports = (io) => {
    let numUsers = 0
    const chat = io.of('/chat')
    chat.on('connection', socket => {
        
        // 断开链接，通知离开
        socket.on('disconnect', function () {
           
        })
    })
}