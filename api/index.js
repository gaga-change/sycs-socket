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
})

// const apiRouter = express.Router()
// apiRouter.use('/api', router)

module.exports = router