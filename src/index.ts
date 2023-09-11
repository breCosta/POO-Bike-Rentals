import { User } from "./user"
import { Bike } from "./bike"
import { Rent } from "./rent"
import { App } from "./app"

const app = new App()

const bike = new Bike('mountain bike', 'g', 50, 500, 99.5, 'grande', 5, [])
const bike2 = new Bike('outraBike', 'm', 23, 300, 95.5, 'pequena', 5, [])
const user = new User('brenda', 'i378127', 'brenda@email.com', '1234')
const user2 = new User('camila', '12314', 'camila@email.com', '1234')

const idUser = app.registerUser(user)
const idUser2 = app.registerUser(user2)
const idBike = app.registerBike(bike)
const idBike2 = app.registerBike(bike2)

console.log(app.listBikes())
console.log(app.listUsers())
console.log(app.listRents())


