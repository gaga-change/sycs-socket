const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/find', (req, res) => {
    db.user.findGod()
})



// const apiRouter = express.Router()
// apiRouter.use('/api', router)

module.exports = router