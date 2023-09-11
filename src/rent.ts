import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public end: Date = undefined

    constructor(
        public user: User,
        public bike: Bike,
        public start: Date,
    ) {}


}

