const User = require('../class/User')
const data = require('./mysql')

/**
 * 获取客服 用户ID
 * @param {String} serviceQQ
 */
exports.getService = (serviceQQ) => {
    return data.getService(serviceQQ).then(rows => {
        return rows[0] || null
    })
}

/**
 * 连接初始化操作，返回用户ID
 * @param {String} godId 用户ID
 * @param {String} oid 订单号
 * @param {String} username 用户名
 */
exports.clientConnect = (godId, oid, username) => {
    // 获取用户
    return data.getGod(godId).then(rows => {
        // 用户存在
        if (rows.length) {
            return rows[0]
        } else {
            // 创建用户
            return data.createUser(username, null, godId).then(packet => {
                // 创建连接
                return data.createConnect(packet.insertId, oid).then((connect) => {
                    return {id: packet.insertId, username, godId}
                })
            })
        }
    })
}

/**
 * 连接操作
 * @param {String} userId
 * @param {String} oid
 */
exports.clientJoinConnect = (userId, oid) => {
    return data.connectJoin(userId, oid)
}

/**
 * 断开连接操作
 * @param {String} userId
 * @param {String} oid
 */
 exports.clientLeaveConnect = (userId, oid) => {
    return data.connectLeave(userId, oid)
 }

 /**
  * 消息创建
  * @param {String} userId 用户ID
  * @param {String} msg 消息
  * @param {String} oid 订单ID
  */
 exports.createMsg = (userId, msg, oid) => {
     return data.createMsg(msg, userId, oid)
 }