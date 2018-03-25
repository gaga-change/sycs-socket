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
exports.clientConnect = (godId, oid, username, serviceId) => {
    // 获取用户
    return data.getGod(godId).then(rows => {
        /**
         * 用户存在 ？
         * 在：
         *   连接存在？
         *      在： 返回userId
         *      不在： 创建连接（客服&顾客）
         * 不在: 创建用户
         */
        // 用户存在
        if (rows.length) {
            return rows[0]
        } else {
            // 创建用户
            return data.createUser(username, null, godId).then(packet => {
                return {
                    id: packet.insertId,
                    username,
                    godId
                }
                // 创建连接
                // return data.createConnect(packet.insertId, oid).then((connect) => {
                //     return {id: packet.insertId, username, godId}
                // })
            })
        }
    }).then(user => {
        // 查询连接
        return data.findConnect(oid, user.id).then(rows => {
            if (rows.length) {
                return user
            } else {
                return Promise.all([
                    data.createConnect(user.id, oid),
                    data.createConnect(serviceId, oid)
                ]).then(() => {
                    return user
                })
            }
        })
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

/**
 * 获取未读消息数量
 * @param {String} userId 用户ID
 */
exports.noReadMessageNum = (userId) => {
    return data.findNoReadMessageNum(userId)
}