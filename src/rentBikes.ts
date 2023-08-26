import { Bike } from "./bike";
import { User } from "./user";

export class RentBikes {
    user: User;
    bike: Bike;
    /*daysRent: number;*/
    dateRent: Date;
    dateReturn: Date;

    constructor(user: User, bike: Bike, daysRent: number, dateRent: Date, dateReturn: Date) {
        this.user = user;
        this.bike = bike;
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
        let dataAtual = new Date();
        /*aqui faz a comparação se a data atual é igual a data de retorno. e seta a disponiblidade da bike*/
   }
    
}