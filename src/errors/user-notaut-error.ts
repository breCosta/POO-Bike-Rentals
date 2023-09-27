export class UserNotAutError extends Error {
    public readonly name = 'UserNotAuthenticatedError'

    constructor() {
        super('User Not Authenticated')
    }
}