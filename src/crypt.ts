import bcrypt from 'bcrypt'

export class Crypt {
    private rounds = 10

    async encrypt(plain: string) : Promise<string> {
        return await bcrypt.hash(plain, this.rounds)
    }

    async compare(encrypted: string, plain:string) : Promise<boolean> {
        return await bcrypt.compare(plain, encrypted)
    }
}