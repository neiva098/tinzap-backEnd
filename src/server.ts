import * as mongoose from 'mongoose'
import * as http from 'http'
import * as socket_io from 'socket.io'

import app from './app'

const port: number = Number(process.env.PORT) || 3333
const server = new http.Server(app)
export const io = socket_io(server)

export const connectedUsers: string [] = []
io.on('connection', socket => {
    const { user } = socket.handshake.query
    connectedUsers[user] = socket.id
})

const listen = () => {
    server.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`)
    })
}

const mongohost: string = process.env.mongohost || 'localhost'
const mongoport: number = Number(process.env.mongoport) || 27017
const mongodbname: string = process.env.mongodbname || 'tinzap'

const connect = () => {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen)
    return mongoose.connect(`mongodb://${mongohost}:${mongoport}/${mongodbname}`, {
        keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true,
    })
}

connect()
