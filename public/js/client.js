(function () {
    var common = window.common
    var query = common.getQuery()
    var oid = query.oid // 订单号
    var serviceQQ = query.qq // 客服QQ
    var godId = query.godId // 用户id
    var socket = io('/chat')
    var connect = false // 是否连接成功
    // 触发初始化链接
    // socket.emit('start connect', query.oid, serviceQQ, godId)
    // // 链接回调
    // socket.on('start connect', function(oid, to, from) {
    //     connect = true // 表示链接成功，可以进行发送消息操作
    //     console.log(oid, to, from)
    // })
    console.log(query)
    
})()