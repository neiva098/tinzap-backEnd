import * as bodyParser from 'body-parser'
import * as express from 'express'
import routes from './routes/index'
import * as cors from 'cors'
import { io, connectedUsers } from './server'

require('dotenv').config()

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(this.connectedUsersIo.bind(this))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(routes)
        this.app.use(this.errorHandling.bind(this))
        this.app.disable('x-powered-by')
    }
    private errorHandling(error: any, req: any, res: any, next: any) {
        if (!error.code || error.code > 599) {
            error.code = 500
        }

        res.status(error.code).send(error)
        next()
    }

    private connectedUsersIo(req: any, res: any, next: any) {
        req.io = io
        req.connectedUsers = connectedUsers

        return next()
    }

}

export default new App().app
