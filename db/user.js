const User = require('../class/User')
const data = require('./mysql')


/**
 * 连接操作，返回用户ID
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