const express = require('express')
const app = express()
const http = require('http')

const server = http.createServer(app)

//any url can access our backedn url
const io = require('socket.io')(server, {
    cors: {origin:"*"}
})

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('message', (message) => {
        console.log('message', `${socket.id.substr(0,2)} said ${message}`)
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
    })
})


server.listen(8000, () => {
    console.log('server running on http://localhost:8000')
})