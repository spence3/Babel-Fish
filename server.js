const express = require('express')
const app = express()

//any url can access our backedn url
const io = require('socket.io')(http, {
    cors: {origin:"*"}
})

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('message', (message) => {
        console.log('message', `${socket.id.substr(0,2)} said ${message}`)
        io.emit('message', `${socket.id.substr(0,2)} said ${message}`)
    })
})


app.listen(8000, () => {
    'server running on http:/localhost:8000'
})