export class Bike {
    id: number;
    model: string;
    size: string;
    rent: boolean = false; //esta alugada?
    // returnDate: Date;
    /*outras infos como tipo, modelo, etc...*/

    constructor(id: number, model: string, size: string) {
        this.id = id;
        this.model = model;
        this.size = size;
    }

    isAvailable() : boolean {
        if (!this.rent){
            return true;
        } 
        else {
            return false;
        }
    }


}