const Service = require('../class/Service')

const data = {
    serviceList: [
        new Service('客服33', 33),
        new Service('客服66', 66)
    ]
}


/**
 * 查找客服
 * @param {String} serviceId 客服ID
 */
exports.findService = (serviceId) => {
    let service = data.serviceList.filter(item => item.id == serviceId)[0]
    if (service) service.leave = false
    return service
}

/**
 * 获取所有客服
 */
exports.getServices = () => {
    return data.serviceList.filter(item => !item.leave)
}

/**
 * 保存socketId
 * @param {String} socketId 
 * @param {String} serviceId 
 */
exports.saveSocketId = (socketId, serviceId) => {
    let service = data.serviceList.filter(item => item.id == serviceId)[0]
    service.socketId = socketId
}
/**
 * 离开
 */
exports.leave = (service) => {
    let s = data.serviceList.filter(item => item.id == service.id)[0]
    if (s) s.leave = true
}