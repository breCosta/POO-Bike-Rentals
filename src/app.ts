import { Bike } from "./bike"
import { Rent } from "./rent"
import { User } from "./user"
import crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    //register bike
    //remove user
    //rent bike
    //return bike

    /**********USER***********/
    findUser(email:string) : User {
        return this.users.find(user => user.email === email)
    }

    findIndexUser(email:string) : number {
        return this.users.findIndex(user => user.email === email)
    }

    registerUser(user: User) : void{
        for(const rUser of this.users){
            if(rUser.email === user.email){
                throw new Error('Same email')
            }
        } 
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    removeUser(email: string) : void {
        const userIndex = this.findIndexUser(email)
        this.users.splice(userIndex, 1)
    }

    /**********BIKE***********/

    findBike (id:string): Bike{
        return this.bikes.find(bike => bike.id === id)
    }

    registerBike(bike: Bike)  {
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
        return bike.id
    }

    rentBike(bikeId: string, userEmail:string, startDate:Date, endDate:Date) : void {
        const bike = this.findBike(bikeId)
        const user = this.findUser(userEmail)
        const r = this.rents.filter(rent => rent.bike === bike)
        this.rents.push(Rent.create(r, bike, user, startDate, endDate))
    }

    returnBike(bikeId: string, userEmail:string, date:Date):void{
        const bike = this.findBike(bikeId)
        const user = this.findUser(userEmail)
        const r = this.rents.findIndex(rent => rent.bike === bike && rent.user === user && !rent.dateReturn)
        this.rents[r].dateReturn = date
    }

}