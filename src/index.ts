import { User } from "./user"
import { Bike } from "./bike"
import { Rent } from "./rent"
import { App } from "./app"

const app = new App()

const bike = new Bike('mountain bike', 'g', 50, 500, 99.5, 'grande', 5, [])
const bike2 = new Bike('outraBike', 'm', 23, 300, 95.5, 'pequena', 5, [])
const user = new User('brenda', 'i378127', 'brenda@email.com', '1234')
const user2 = new User('camila', '12314', 'camila@email.com', '1234')
app.registerUser(user)
app.registerUser(user2)
const idbike = app.registerBike(bike)
const idbike2 = app.registerBike(bike2)
const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(today.getDate() + 2)


app.rentBike(idbike, user.email, today, twoDaysFromToday)
console.log(user)
console.log(bike)
console.log(app.rents)
const dateReturn = twoDaysFromToday
app.returnBike(idbike, user.email, dateReturn)
app.rentBike(idbike, user2.email, tomorrow, twoDaysFromToday)
app.rentBike(idbike2, user2.email, today, tomorrow)
console.log(app.rents)

