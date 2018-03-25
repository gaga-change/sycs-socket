(function () {
    var common = window.common
    var query = common.getQuery()
    var socket = io('/chat')
    var userId = query.id // 客服ID
    var rooms = []
    var orderId = null // 私聊订单ID
    var toUserId = null // 私聊用户ID
    var toUsername = null // 私聊用户名
    var userBind = false // 绑定socket状态,绑定后才能打开会话
    var openDoor = false // 会话是否开启，只有开启后才能发送消息
    // 用户绑定
    socket.emit('user bind', userId, function (userBindRes) {
        if (userBindRes.success) {
            userBind = true
        } else {
            console.log('user bind error', userBindRes.err)
        }
    })

    // 获取未读消息
    $.get(common.API + '/noreadmessagenum', {
        userId: userId
    }).then(res => {
        if (res.success) {
            if (res.data) {
                // 推送进room列表
                let menus = res.data.map(item => {
                    return common.turnKey(item)
                })
                appendMenuLaft(menus)
            }
        } else {
            console.log(res.err)
        }
    })
    // 点击左侧菜单项（房间）
    $('#MenuLeft').click(e => {
        if (!userBind) return
        let menuEle = $(e.target).parents('li')
        if (!menuEle.hasClass('active')) {
            menuEle.addClass('active')
            menuEle.siblings().removeClass('active')
            orderId = menuEle.attr('data-oid')
            toUserId = menuEle.attr('data-user')
            toUsername = menuEle.attr('data-username')
            $('#MessageContainer').empty()
            $('#RoomContainer').show()
            if (openDoor) {
                // 关闭之前的会话
                socket.emit('close the door', function (closeTheDoorRes) {
                    if (closeTheDoorRes.success) {
                        console.log('关闭成功')
                        openDoor = false
                        _openDoor()
                    } else {
                        console.log('close the door error', closeTheDoorRes.err)
                    }
                })
            } else {
                _openDoor()
            }
            function _openDoor() {
                // 打开会话
                socket.emit('open the door', orderId, function (openTheDoorRes) {
                    if (openTheDoorRes.success) {
                        console.log('可以发送消息了')
                        openDoor = true
                    } else {
                        console.log('open the door error', openTheDoorRes.err)
                    }
                })
            }
        }
    })
    /**
     * 追加左侧菜单
     */
    function appendMenuLaft(items) {
        items.forEach(item => {
            console.log(item)
            let newMenu = $(`<li data-id='oid' data-oid='${item.orderId}' data-user='${item.fromUserId}' data-username='${item.fromUsername}'>
                    <a href="javascript:void(0)">
                        <div>订单号：<small> ${item.orderId} </small> </div>
                        <div data-id='num'>未读消息： <small>${item.num}</small></div>
                        <small data-id='msg'>消息消息消息</small>
                    </a>
                </li>`)
            $('#MenuLeft').append(newMenu)
        })
    }
}())