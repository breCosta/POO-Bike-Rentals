import { Bike } from "./bike"
import { BikeNotFoundError } from "./errors/bike-notfound-error"
import { Crypt } from "./crypt"
import { Rent } from "./rent"
import { User } from "./user"
import { Location } from "./location"
import crypto from "crypto"

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt()


    listUsers() : User[] {
        const list = this.users
        if(!list){
            return list
        }
        throw new Error ("No registered users")
    }
    
    listBikes() : Bike[] {
        const list = this.bikes
        if(!list){
            return list
        }
        throw new Error ("No registered bikes")
    }

    listRents() : Rent[] {
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

    async registerUser(user: User) :  Promise<string> {
        for(const rUser of this.users){
            if(rUser.email === user.email){
                throw new Error('E-mail already exists')
            }
        } 
        const idUser = crypto.randomUUID()
        user.id = idUser
        const encryptedPassword = await this.crypt.encrypt(user.password)
        user.password = encryptedPassword
        this.users.push(user)
        return idUser
    }

    async authenticate(userEmail: string, password: string) : Promise<boolean> {
        const user = this.findUser(userEmail)
        if(!user){
            throw new Error ("User not found.")
        }
        return await this.crypt.compare(user.password, password)
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
        const bike = this.bikes.find(bike => bike.id === id)
        if(!bike){
            throw new BikeNotFoundError()
        }
        return bike
    }

    registerBike(bike: Bike) : string {
        const idBike = crypto.randomUUID()
        bike.id = idBike
        this.bikes.push(bike)
        return idBike
    }

    rentBike(bikeId: string, userEmail:string) : void {
        const bike = this.findBike(bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        if (!bike.available){
            throw new Error("Unavailable bike.")
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const newRent = new Rent(user, bike, new Date())
        bike.available = false
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail:string):number{
        const today = new Date()
        const rent = this.rents.find(rent => rent.bike.id === bikeId && rent.user.email === userEmail && !rent.end)
        if (!rent) {
            throw new Error('Rent not found')
        }
        rent.end = today
        rent.bike.available = true
        const hours = diff_hours(rent.end, rent.start)
        return hours * rent.bike.rate
    }

    moveBikeTo(bikeId: string, location: Location){
        const bike = this.findBike(bikeId)
        bike.location.latitude = location.latitude
        bike.location.longitude = location.longitude
    }
}

function diff_hours(dt2: Date, dt1: Date){
    var diff = (dt2.getTime() - dt1.getTime()) / 1000
    diff /= (60*60)
    return Math.abs(diff)
}