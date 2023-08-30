import { Bike } from "./bike";
import { User } from "./user";

export class Rent {

    constructor(
        public user: User,
        public bike: Bike,
        public dateFrom: Date,
        public dateTo: Date,
        public dateReturn?: Date
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, startDate: Date, endDate: Date) : Rent {
        const canCreate = Rent.canRent(rents, startDate, endDate) 
        if(canCreate){
            return new Rent(user, bike, startDate, endDate)
        }
         throw new Error("Nao pode")
    }


    static canRent(rents: Rent[], startDate: Date, endDate: Date): boolean {
        for (const rent of rents) {
            if (startDate <= rent.dateTo && endDate >= rent.dateFrom && !rent.dateReturn) {
                return false
            }
        }
        return true
    }

}

