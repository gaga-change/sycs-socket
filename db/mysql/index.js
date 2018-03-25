const query = require('./pool')


/**
 * 获取顾客
 * @param {String} godId 顾客id
 */
exports.getGod = (godId) => {
    let sql = 'SELECT user.id,user.username,user.qq,user.god FROM user where god = ?'
    return query(sql, [godId])
}

/**
 * 获取客服
 * @param {String} serviceQQ 客服QQ
 */
exports.getService = (serviceQQ) => {
    let sql = 'SELECT user.id,user.username,user.qq,user.god FROM user where user.qq = ?'
    return query(sql, [serviceQQ])
}

/**
 * 创建用户
 * @param {String} username 用户名
 * @param {String} qq 客服QQ
 * @param {String} god 顾客id
 */
exports.createUser = (username, qq, god) => {
    let sql = 'insert into user set ? '
    return query(sql, [{
        username,
        qq,
        god
    }])
}

/**
 * 创建连接
 * @param {String} user_id 用户ID
 * @param {String} order_id 订单ID
 */
exports.createConnect = (user_id, order_id) => {
    return query('insert into user_room set ?', [{
        leave_time: new Date(),
        socket_num: 0,
        user_id,
        order_id
    }])
}

/**
 * 查询连接
 * @param {String} oid 订单ID
 * @param {String} user_id 用户ID
 */
exports.findConnect = (oid, user_id) => {
    return query(`SELECT user_room.leave_time, user_room.socket_num, user_room.user_id,user_room.order_id FROM user_room WHERE user_room.user_id = ? AND user_room.order_id = ?`, [user_id, oid])
}
/**
 * 连接数加1
 * @param {String} user_id 用户ID
 * @param {String} order_id 订单ID
 */
exports.connectJoin = (user_id, order_id) => {
    return query('update user_room set socket_num = socket_num + 1 where user_id = ? and order_id = ?', [user_id, order_id])
}

/**
 * 连接数减1
 * @param {String} user_id 用户ID
 * @param {String} order_id 订单ID
 */
exports.connectLeave = (user_id, order_id) => {
    return query('update user_room set leave_time = ?, socket_num = socket_num - 1 where user_id = ? and order_id = ?', [new Date(), user_id, order_id])
}

/**
 * 创建信息
 * @param {String} msg 消息内容
 * @param {String} user_id 用户ID
 * @param {String} order_id 订单ID
 */
exports.createMsg = (msg, user_id, order_id) => {
    return query('insert into message set ?', [{
        msg,
        time: new Date(),
        user_id,
        order_id
    }])
}

/**
 * 获取每个订单会话未读消息数量
 * @param {String} user_id 用户ID
 */
exports.findNoReadMessageNum = (user_id) => {
    return query(`SELECT
            message.user_id AS from_user_id,
            user.username AS from_username,
            user_room.user_id,
            user_room.order_id,
            Count( * ) AS num FROM user_room INNER JOIN message ON message.order_id = user_room.order_id INNER JOIN user
            ON message.user_id = user.id WHERE user_room.user_id = ? AND user_room.socket_num = 0 AND user_room.leave_time < message.time GROUP BY user_room.order_id `, [user_id])
}

/**
 * 搜索消息列表
 * @param {String} order_id 订单ID
 * @param {Number} start 开始截取的位置
 * @param {Number} length 截取的长度
 */
exports.searchMessage = (order_id, start, length) => {
    return query(`SELECT
        message.msg,
        message.time,
        message.user_id,
        message.order_id,
        message.id
        FROM
        message
        WHERE
        message.order_id = ?
        ORDER BY
        message.time DESC
        LIMIT ?, ?`, [order_id, start, length])
}