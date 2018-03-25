const data = require('./mysql')

/**
 * 消息搜索
 * @param {String} orderId 订单ID
 * @param {Number} page 页数
 * @param {Number} pageSize 每页条数
 */
exports.searchMessage = (orderId, page, pageSize) => {
    page = Number(page) || 1
    pageSize = Number(pageSize) || 1
    if (pageSize > 30) pageSize = 29
    return data.searchMessage(orderId, pageSize * (page - 1), pageSize)
}
