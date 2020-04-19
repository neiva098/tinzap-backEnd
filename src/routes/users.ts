import { NextFunction, Request, Response, Router } from 'express'
import { index, like, dislike, registry, logIn } from '../controllers/user'

const routes = Router()

routes.get('/getCrushs', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await index(req.get('user')!)

        res.json(users)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.post('/registry', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = await registry(req.body)

        res.json(user)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.get('logIn/:phone', async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const user = await logIn(req.params.phone)

        res.json(user)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.post('/likes/:userId', async (req: Request & any, res: Response, next: NextFunction) => {
    try {
        const loggedUser = await like(req.get('user')!, req.params.userId,<any> req.connectedUsers, <any> req.io)

        res.status(200).json(loggedUser)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

routes.post('/dislikes/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loggedUser = await dislike(req.params.userId, req.get('user')!)

        res.status(200).json(loggedUser)
    } catch (error) {
        next({ code: error.statusCode, message: error.message })
    }
})

export default routes