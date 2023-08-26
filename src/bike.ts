export class Bike {
    id: number;
    
    rent: boolean = false; //esta alugada?
    /*outras infos como tipo, modelo, etc...*/

    constructor(id: number) {
        this.id = id;
    }

    isAvailable() : boolean {
        if (!this.rent){
            return true;
        } 
        return false;
    }


}