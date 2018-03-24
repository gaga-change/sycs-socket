const express = require('express')
const db = require('../db')
const router = express.Router()

/**
 * 顾客连接借口
 * 根据 query参数 godId oid  serviceQQ 返回 toUser&fromUser
 */
router.get('/client/connect', (req, res) => {
    // 根据 godId 获取用户（没有就创建用户以及创建连接）
    // 根据 serviceQQ 获取客服（没有是异常）
    db.user.clientConnect(godId, serviceQQ, oid)
})



// const apiRouter = express.Router()
// apiRouter.use('/api', router)

module.exports = router