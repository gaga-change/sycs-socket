/**
 * 用户&客服 交流
 */
const db = require('../db')


module.exports = (io) => {
    let numUsers = 0
    const chat = io.of('/chat')
    chat.on('connection', socket => {
        let addUser = false // 当前连接是否存在用户
        let door = false // 是否打开会话
        // 给当前socket 标识用户
        socket.on('user bind', (userId, cb) => {
            console.log('user bind')
            console.log(addUser, userId)
            if (!cb) return
            if (!addUser && userId) {
                socket.userId = userId
                socket.join('room ' + userId) // 加入自己的房间
                addUser = true
                cb({
                    success: true
                })
            } else {
                cb({
                    success: false
                })
            }
        })
        // 表示打开会话
        socket.on('open the door', (oid, cb) => {
            console.log('open the door')
            if (!cb) return
            // 已绑定用户 && 无打开会话
            if (addUser && !door && oid) {
                // 更新数据库状态
                db.user.clientJoinConnect(socket.userId, oid).then(() => {
                    door = true
                    socket.oid = oid
                    cb({
                        success: true
                    })
                }).catch(err => {
                    cb({
                        success: false,
                        err
                    })
                })
            } else {
                cb({
                    success: false
                })
            }
        })
        // 表示离开当前会话
        socket.on('close the door', (oid, cb) => {
            console.log('close the door')
            if (!cb) return
            // 已绑定用户 && 已打开会话
            if (addUser && door && oid) {
                // 更新数据库状态
                db.user.clientLeaveConnect(socket.userId, oid).then(() => {
                    door = false
                    socket.oid = null
                    cb({
                        success: true
                    })
                }).catch(err => {
                    cb({
                        success: false,
                        err
                    })
                })
                cb({
                    success
                })
            } else {
                cb({
                    success: false
                })
            }
        })
        // 消息发送
        socket.on('chat message', (msg, toUserId, cb) => {
            console.log('chat message')
            if (!cb) return
            if (addUser && door && msg && toUserId) {
                db.user.createMsg(socket.userId, msg, socket.oid).then(() => {
                    // 发送消息给指定的人
                    chat.to('room ' + toUserId).emit('chat message', {
                        msg,
                        userId: socket.userId,
                        oid: socket.oid
                    })
                    // 同用户消息同步
                    socket.broadcast.to('room ' + socket.userId).emit('chat message', {
                        msg,
                        userId: socket.userId,
                        oid: socket.oid
                    })
                    cb({
                        success: true
                    })
                }).catch(err => {
                    cb({
                        success: false,
                        err: err.toString()
                    })
                })
            } else {
                cb({
                    success: false
                })
            }
        })
        // 断开链接，通知离开
        socket.on('disconnect', () => {
            if (addUser) {
                if (socket.oid) { // 如果已打开会话，则关闭（状态更新）
                    db.user.clientLeaveConnect(socket.userId, socket.oid)
                }
            }
        })
    })
}