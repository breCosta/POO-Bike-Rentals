import { Model } from "./model";

export class Bike {
   
    constructor( 
        public type: string,
        public size: string,
        public bodySize: number,
        public maxload: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public imageUrls: string[],
        public id?: string
    ){}
    

}