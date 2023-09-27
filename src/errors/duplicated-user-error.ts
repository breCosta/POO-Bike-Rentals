export class DuplicatedUserError extends Error {
    public readonly name = 'DuplicatedUserError'

    constructor() {
        super('User Duplicated')
    }
}