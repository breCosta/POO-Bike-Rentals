import { User } from "./user"
import { Bike } from "./bike"
import { Rent } from "./rent"
import { App } from "./app"
import sinon from 'sinon'

async function main(){
    const clock = sinon.useFakeTimers()
    const app = new App()
    const bike = new Bike('mountain bike', 'g', 50, 500, 100.0, 'grande', 5, [])
    //const bike2 = new Bike('outraBike', 'm', 23, 300, 95.5, 'pequena', 5, [])
    const user = new User('brenda', 'i378127', 'brenda@email.com', '1234')
    //const user2 = new User('camila', '12314', 'camila@email.com', '1234')
    //uahduaeahhaha
    const idUser = await app.registerUser(user)
    const idBike = app.registerBike(bike)

    app.rentBike(idBike, user.email)
    console.log('Bike is available: ', bike.available)
    clock.tick(1000 * 60 * 90)
    console.log('Bike is available: ', bike.available)
    console.log(app.returnBike(idBike, user.email))
    console.log('Bike is available: ', bike.available)
    //const idUser2 = app.registerUser(user2)
    //const idBike = app.registerBike(bike)
    //const idBike2 = app.registerBike(bike2)

    //console.log(app.listBikes())
    // console.log(app.listUsers())
    //console.log(app.listRents())
}

main()

