(function () {
    var common = window.common
    var query = common.getQuery()
    var socket = io('/chat')
    var userId = query.id // 客服ID
    var orderId = null // 私聊订单ID
    var toUserId = null // 私聊用户ID
    var toUsername = null // 私聊用户名
    var userBind = false // 绑定socket状态,绑定后才能打开会话
    var openDoor = false // 会话是否开启，只有开启后才能发送消息
    var rooms = common.LS('SERVICE_ORDERS') || []

    // 接收消息
    socket.on('chat message', function (chatMessageRes) {
        // 接收到自己消息
        if (chatMessageRes.userId == userId) {
            
            // if (chatMessageRes.oid == oid) {
            //     appendMyMessage(chatMessageRes.msg)
            // } else {
            //     console.log('chat message 非当前会话')
            // }
        } else { // 顾客消息
            console.log(chatMessageRes.msg, chatMessageRes.oid)
            let target = $('#MenuLeft').find(`[data-oid=${chatMessageRes.oid}]`)
            target.find('[data-id=msg]').text(chatMessageRes.msg) // 最新消息
            console.log(target.find('[data-id=msg]'))
            let targetSonNum = target.find('[data-id=num]').find('small')
            targetSonNum.text(Number(targetSonNum.text()) + 1) // 未读消息数
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
                window.menus = menus
                window.rooms = rooms
                // 去重，且把最新的放上面
                rooms = rooms.filter(item => !menus.some(m => m.orderId == item.orderId))
                rooms.unshift(...menus)
                let len = menus.length > 200 ? menus.length : 200 // 配置左侧显示做多的条数
                if (rooms.length > len) { // 超过的条数切除
                    rooms.splice(len - rooms.length)
                }
                rooms.splice()
                common.LS('SERVICE_ORDERS', rooms)
                appendMenuLaft(rooms)
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
            let newMenu = $(`<li data-id='oid' data-oid='${item.orderId}' data-user='${item.fromUserId}' data-username='${item.fromUsername}'>
                    <a href="javascript:void(0)">
                        <div>订单号：<small> ${item.orderId} </small> </div>
                        <div data-id='num'>未读消息： <small>${item.num}</small></div>
                        <small class="msg" data-id='msg'></small>
                    </a>
                </li>`)
            $('#MenuLeft').append(newMenu)
        })
    }

}())