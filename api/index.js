const express = require('express')
const db = require('../db')
const router = express.Router()

/**
 * 顾客连接借口
 * 根据 query参数 godId oid username  返回 user
 */
router.get('/client/connect', (req, res, next) => {
    console.log(req.query)
    let godId = req.query.godId
    let oid = req.query.oid
    let username = req.query.username
    if (godId && oid && username) {
        db.user.clientConnect(godId, oid, username).then(user => {
            res.send({
                success: true,
                data: user
            })
        })
    } else {
        next()
    }
    // 根据 godId 获取用户（没有就创建用户以及创建连接）
    // 根据 serviceQQ 获取客服（没有是异常）
    // db.user.clientConnect(godId, serviceQQ, oid, username)
})



// const apiRouter = express.Router()
// apiRouter.use('/api', router)

module.exports = router