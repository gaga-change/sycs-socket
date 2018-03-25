(function () {
    var common = window.common
    var query = common.getQuery()
    var serviceId = query.id // 客服ID
    var rooms = []
    // 获取未读消息
    $.get(common.API + '/noreadmessagenum', {
        userId: serviceId
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