import { Bike } from "./bike"
import { BikeNotFoundError } from "./errors/bike-notfound-error"
import { Crypt } from "./crypt"
import { Rent } from "./rent"
import { User } from "./user"
import { Location } from "./location"
import crypto from "crypto"
import { UserRepo } from "./ports/user-repo"
import { BikeRepo } from "./ports/bike-repo"
import { RentRepo } from "./ports/rent-repo"
import { UserNotFoundError } from "./errors/user-notfound-error"
import { DuplicatedUserError } from "./errors/duplicated-user-error"
import { UserHasOpenRentError } from "./errors/user-has-open-rent-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"

export class App {

    crypt: Crypt = new Crypt()

    constructor(
        readonly userRepo: UserRepo,
        readonly bikeRepo: BikeRepo,
        readonly rentRepo: RentRepo
    ) {}


    /**********USER***********/

    async listUsers() : Promise<User[]> {
        return await this.userRepo.list()
    }

    async findUser(email:string) : Promise<User> {
        const user = await this.userRepo.find(email)
        if (!user) throw new UserNotFoundError()
        return user
    }

    async registerUser(user: User) :  Promise<string> {
        if (await this.userRepo.find(user.email)) {
            throw new DuplicatedUserError()
          }
          const encryptedPassword = await this.crypt.encrypt(user.password)
          user.password = encryptedPassword
          return await this.userRepo.add(user)
    }

    async authenticate(userEmail: string, password: string) : Promise<boolean> {
        const user = await this.findUser(userEmail)
        return await this.crypt.compare(password, user.password)
    }

    async removeUser(email: string) : Promise<void> {
        await this.findUser(email)
        if ((await this.rentRepo.findOpenFor(email)).length > 0) {
            throw new UserHasOpenRentError()
        }
        await this.userRepo.remove(email)
    }


    /**********BIKE***********/

    async listBikes() : Promise<Bike[]> {
        return await this.bikeRepo.list()
    }

    async findBike (bikeId:string): Promise<Bike>{
        const bike = await this.bikeRepo.find(bikeId)
        if (!bike) throw new BikeNotFoundError()
        return bike
    }

    async registerBike(bike: Bike) : Promise<string> {
        return await this.bikeRepo.add(bike)
    }

    async rentBike(bikeId: string, userEmail:string) : Promise<string> {
        const bike = await this.findBike(bikeId)
        if (!bike.available) {
            throw new UnavailableBikeError()
        }
        const user = await this.findUser(userEmail)
        bike.available = false
        await this.bikeRepo.update(bikeId, bike)
        const newRent = new Rent(bike, user, new Date())
        return await this.rentRepo.add(newRent)
    }

    async returnBike(bikeId: string, userEmail:string): Promise<number>{
        const now = new Date()
        const rent = await this.rentRepo.findOpen(bikeId, userEmail)
        if (!rent) throw new Error('Rent not found.')
        rent.end = now
        await this.rentRepo.update(rent.id, rent)
        rent.bike.available = true
        await this.bikeRepo.update(rent.bike.id, rent.bike)
        const hours = diff_hours(rent.end, rent.start)
        return hours * rent.bike.rate
    }

    async moveBikeTo(bikeId: string, location: Location){
        const bike = await this.findBike(bikeId)
        bike.location.latitude = location.latitude
        bike.location.longitude = location.longitude
        await this.bikeRepo.update(bikeId, bike)
    }
}

function diff_hours(dt2: Date, dt1: Date){
    var diff = (dt2.getTime() - dt1.getTime()) / 1000
    diff /= (60*60)
    return Math.abs(diff)
}