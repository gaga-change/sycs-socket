const express = require('express')
const http = require('http')
const io = require('./socket')
const router = require('./api')
const app = express()
const server = http.Server(app)
// const io = socketIo(server)
io.attach(server, { wsEngine: 'ws' })

app.use(express.static(__dirname + '/public'))
app.use('/api', router)
app.use('*', (req, res) => {
    res.send('404')
})
server.listen('3003', () => {
    console.log(3003)
})