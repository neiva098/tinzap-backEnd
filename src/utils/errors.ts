export class HttpError extends Error {
    statusCode: number
    errors?: any[]

    constructor(statusCode: number, message: string, errors?: any[]) {
        super(message)
        this.errors = errors
        this.statusCode = statusCode
    }
}
