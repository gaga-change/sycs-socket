const express = require('express')
const db = require('../db')
const router = express.Router()

/**
 * 顾客连接借口
 * 根据 query参数 godId oid username  返回 user
 */
router.get('/client/connect', (req, res, next) => {
    let godId = req.query.godId
    let oid = req.query.oid
    let username = req.query.username
    let serviceId = req.query.serviceId
    if (godId && oid && username && serviceId) {
        db.user.clientConnect(godId, oid, username, serviceId).then(user => {
            res.send({
                success: true,
                data: user
            })
        })
    } else {
        next()
    }
})

/**
 * 根据客服QQ 获取客服用户ID
 */
router.get('/service', (req, res, next) => {
    let serviceQQ = req.query.serviceQQ
    if (serviceQQ) {
        db.user.getService(serviceQQ).then(service => {
            res.send({
                success: true,
                data: service
            })
        })
    } else {
        next()
    }
})

/**
 * 获取未读消息结构
 */
router.get('/noreadmessagenum', (req, res, next) => {
    let userId = req.query.userId
    if (userId) {
        db.user.noReadMessageNum(userId).then(obj => {
            res.send({
                success: true,
                data: obj
            })
        }).catch(err => {
            res.send({
                success: false,
                err: err.toString()
            })
        })
    } else {
        next()
    }

})

module.exports = router