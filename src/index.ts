import { User } from "./user";
import { Bike } from "./bike";
import { RentBikes } from "./rentBikes";

const brenda = new User('brenda', 'brenda@email.com');
const bike1 = new Bike(1);

let teste = bike1.isAvailable();
console.log(bike1.isAvailable());

if (teste) {
    const rent1 = new RentBikes(brenda, bike1, 5);
    rent1.rent();
}
const data = new Date();
console.log(data);