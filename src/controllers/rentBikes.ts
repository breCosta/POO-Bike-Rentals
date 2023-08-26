import { Bike } from "../bike";
import { User } from "../user";

export class RentBikes {
    user: User;
    bike: Bike;
    daysRent: number;
    dateRent: Date;
    dateReturn: Date;

    constructor(user: User, bike: Bike, daysRent: number, dateRent: Date, dateReturn: Date) {
        this.user = user;
        this.bike = bike;
        this.daysRent = daysRent;
        this.dateRent = dateRent;
        this.dateReturn = dateReturn;
    }

    rent() : boolean {
        if(this.user && this.bike.isAvailable()){
            this.bike.rent = true;
            return true;
        }
        return false;
    }

   rentTime() : void {
        const currentDate = new Date();
        if (currentDate >= this.dateReturn) {
            this.bike.rent = false;
        }
   }
    
}