/**
 * 用户&客服 交流
 */
const db = require('../db')

module.exports = (io) => {
    let numUsers = 0
    const chat = io.of('/chat')
    chat.on('connection', socket => {
        let addedUser = false // 标识当前连接是否已经绑定用户
        let roomId = null // 当前连接进入的roomId
        // 初始化链接
        chat.on('start connect', (oid, serviceQQ, godId) => {
            console.log(oid, serviceQQ, godId)
        })    
        // 客服登入
        socket.on('service login', (serviceId, orderId, cb) => {
            if (addedUser) return
            ++numUsers;
            addedUser = true
            socket.service = db.service.findService(serviceId)
            console.log(serviceId, socket.service)
            // 通知用户加入
            socket.broadcast.emit('user joined', {
                service: socket.service,
                numUsers: numUsers
            })
            // 加入房间
            roomId = 'room ' + orderId
            socket.join(roomId, () => {
                socket.emit('add romm', )
            })
        })
        // 用户登入
        socket.on('client login', (username, userId, orderId) => {
            if (addedUser) return
            ++numUsers;
            addedUser = true
            socket.user = db.user.findUserAndSave(username, userId)
            // 通知用户加入
            socket.broadcast.emit('user joined', {
                user: socket.user,
                numUsers: numUsers
            })
            // 加入房间
            roomId = 'room ' + orderId
            socket.join(roomId, () => {
                socket.emit('add romm', )
            })
        })
        // 发送信息
        socket.on('chat message', (msg) => {
            if (!roomId) return
            console.log('消息：' + msg, ' room: ' + roomId, socket.id)
            chat.to(roomId).clients((error, clients) => {
                if (error) throw error;
                console.log(clients)
            });
            socket.broadcast.to(roomId).broadcast.emit('chat message', msg)
        })
        // 断开链接，通知离开
        socket.on('disconnect', function () {
            if (addedUser) {
                --numUsers
                socket.broadcast.emit('user left', {
                    user: socket.user,
                    service: socket.service,
                    numUsers: numUsers
                })
                console.log(socket.user, socket.service)
                if (socket.user)
                    db.user.leave(socket.user)
                if (socket.service)
                    db.service.leave(socket.service)
            }
        })
    })
}