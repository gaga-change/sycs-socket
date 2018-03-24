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