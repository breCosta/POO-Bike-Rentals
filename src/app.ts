import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    /* 
    - listagem de usuários
    - listagem de reservas/aluguéis
    - listagem de bikes 
    */

    listUsers() {
        const list = this.users
        if(!list){
            return list
        }
        throw new Error ("No registered users")
    }
    
    listBikes() {
        const list = this.bikes
        if(!list){
            return list
        }
        throw new Error ("No registered bikes")
    }

    listRents() {
        const list = this.rents
        if(!list){
            return list
        }
        throw new Error ("No registered rents")
    }

    /**********USER***********/
    findUser(email:string) : User {
        return this.users.find(user => user.email === email)
    }

    findIndexUser(email:string) : number {
        return this.users.findIndex(user => user.email === email)
    }

    registerUser(user: User) : string {
        for(const rUser of this.users){
            if(rUser.email === user.email){
                throw new Error('E-mail already exists')
            }
        } 
        const idUser = crypto.randomUUID()
        user.id = idUser
        this.users.push(user)
        return idUser
    }

    removeUser(email: string) : void {
        const userIndex = this.findIndexUser(email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    /**********BIKE***********/

    findBike (id:string): Bike{
        return this.bikes.find(bike => bike.id === id)
    }

    registerBike(bike: Bike) : string {
        const idBike = crypto.randomUUID()
        bike.id = idBike
        this.bikes.push(bike)
        return idBike
    }

    rentBike(bikeId: string, userEmail:string, startDate:Date, endDate:Date) : void {
        const bike = this.findBike(bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const r = this.rents.filter(rent => rent.bike === bike && !rent.dateReturn)
        this.rents.push(Rent.create(r, bike, user, startDate, endDate))
    }

    returnBike(bikeId: string, userEmail:string):void{
        const today = new Date()
        const r = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail && !rent.dateReturn)
        if (r) {
            r.dateReturn = today
            return
        }
        throw new Error('Rent not found')
    }
}