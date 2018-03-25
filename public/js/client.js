(function () {
    var common = window.common
    var query = common.getQuery()
    var oid = query.oid // 订单号
    var serviceQQ = query.qq // 客服QQ
    var godId = query.godId // 用户id
    var username = query.username // 用户名
    var socket = io('/chat')
    var userId = null // 用户id
    var openDoor = false // 会话是否建立连接（是否可以发送消息）
    var serviceId = null // 客服ID
    $.get('/api/client/connect', {
        godId: godId,
        oid: oid,
        username: username
    }).then(res => {
        if (res.success) {
            userId = res.data.id
            // 用户绑定
            socket.emit('user bind', userId, function (userBindRes) {
                if (userBindRes.success) {
                    // 打开会话
                    socket.emit('open the door', oid, function (openTheDoorRes) {
                        if (openTheDoorRes.success) {
                            console.log('可以发送消息了')
                            openDoor = true
                        } else {
                            console.log('open the door error', openTheDoorRes.err)
                        }
                    })
                } else {
                    console.log('user bind error', userBindRes.err)
                }
            })
        } else {
            console.log('connect error')
        }
    })
    // 获取客服ID
    $.get('/api/service', {
        serviceQQ: serviceQQ
    }).then(res => {
        if (res.data) {
            serviceId = res.data.id
        }
    })
    // 发送消息事件
    $('#SendBtn').click(function (e) {
        let msg = $('#MessageInput').val()
        if (openDoor && serviceId && msg) {
            socket.emit('chat message', msg, serviceId, function (chatMessageRes) {
                if (chatMessageRes.success) {
                    console.log('发送消息成功')
                    appendMyMessage(msg)
                } else {
                    console.log('chat message error', chatMessageRes.err)
                }
            })
        }
    })
    // 接收消息
    socket.on('chat message', function (chatMessageRes) {
        // 接收到自己消息
        if (chatMessageRes.userId == userId) {
            if (chatMessageRes.oid == oid) {
                appendMyMessage(chatMessageRes.msg)
            } else {
                console.log('chat message 非当前会话')
            }
        } else { // 客服消息
            console.log('客服消息')
        }
    })
    // 追加消息
    function appendMyMessage(msg) {
        let msgEle = $(`<div>
            <div class="wrap-ip wrap_s">
                <div class="wrap_fid">
                    <div class="wmessage " style="word-wrap:break-word;word-break:break-all;max-width:100%">
                        <i class="arrow"></i>
                        <div class="hximg-tip">${msg}</div>
                    </div>
                </div>
            </div>
        </div>`)
        $('#MessageContainer').append(msgEle)
    }
})()