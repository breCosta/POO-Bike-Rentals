import { User } from "./user";
import { Bike } from "./bike";
import { RentBikes } from "./controllers/rentBikes";

const brenda = new User('brenda','1234456-22','brenda@email.com', 123323499);
const bike1 = new Bike(1, 'TIPO-1', 'G');

const available = bike1.isAvailable();
console.log(bike1.isAvailable());

if (available) {
    const date = new Date();
    date.setDate(date.getDate() - 2)
    console.log(date)
    const days = 1;
    const dateReturn = new Date();
    dateReturn.setDate(date.getDate() + days);
    console.log(dateReturn)
    const rent1 = new RentBikes(brenda, bike1, days, date, dateReturn);
    rent1.rent();
    rent1.rentTime();
}

console.log(bike1.isAvailable());