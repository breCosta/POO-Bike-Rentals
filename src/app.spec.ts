import sinon from "sinon"
import { describe, it, expect } from "@jest/globals";
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"
import { BikeNotFoundError } from "./errors/bike-notfound-error"
import { UnavailableBikeError } from "./errors/unavailable-bike-error"
import { UserNotFoundError } from "./errors/user-notfound-error"
import { UserNotRemoved } from "./errors/user-not-removed-error";
import { DuplicatedUserError } from "./errors/duplicated-user-error";
import { UserNotAutError } from "./errors/user-notaut-error";

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike', 'g', 1234, 100.0, 7 ,'bla', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.returnBike(bike.id, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('caloi mountainbike', 'mountain bike', 'g', 1234, 100.0, 7 ,'bla', 5, [])
        app.registerBike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.moveBikeTo(bike.id, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
        const app = new App()
        const newYork = new Location(40.753056, -73.983056)
        expect(() => {
            app.moveBikeTo('fake-id', newYork)
        }).toThrow(BikeNotFoundError)
    })

    it('should correctly handle a bike rent', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike', 'g', 1234, 100.0, 7 ,'bla', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(app.rents.length).toEqual(1)
        expect(app.rents[0].bike.id).toEqual(bike.id)
        expect(app.rents[0].user.email).toEqual(user.email)
        expect(bike.available).toBeFalsy()
    })

    it('should throw unavailable bike when trying to rent with an unavailable bike', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.registerUser(user)
        const bike = new Bike('caloi mountainbike', 'mountain bike', 'g', 1234, 100.0, 7 ,'bla', 5, [])
        app.registerBike(bike)
        app.rentBike(bike.id, user.email)
        expect(() => {
            app.rentBike(bike.id, user.email)
        }).toThrow(UnavailableBikeError)
    })

    it('should throw user not found error when user is not found', () => {
        const app = new App()
        expect(() => {
            app.findUser('fake@mail.com')
        }).toThrow(UserNotFoundError)
    })


    it('should correctly remove a user', async () => {
        const app = new App();
        const user = new User('Jose', 'jose@mail.com', '1234');
        await app.registerUser(user);

        expect(app.findUser(user.email)).toEqual(user);

        app.removeUser(user.email);

        expect(() => {
            app.findUser(user.email);
        }).toThrow(UserNotFoundError);
    });


    it('should throw UserNotRemoved when user removal fails', () => {
        const app = new App();

        expect(() => {
            app.removeUser('nonexistent@mail.com');
        }).toThrow(UserNotRemoved);
    });
    it('should throw DuplicateUserError when trying to register a duplicate user', async () => {
        const app = new App();
        const user = new User('Jose', 'jose@mail.com', '1234');

        await app.registerUser(user);

        expect(() => {
            app.registerUser(user);
            }).toThrow(DuplicatedUserError);
        });
    
        it('should throw UserNotAutentacateError when authentication fails', async () => {
            const app = new App();
            const userEmail = 'jose@mail.com';
            const password = '1234';
    
            expect(() => {
                app.authenticate(userEmail, password);
            }).toThrow(UserNotAutError);
    
            const user = new User('Jose', userEmail, password);
            await app.registerUser(user);
    
            expect(() => {
                app.authenticate(userEmail, 'senha_incorreta');
            }).toThrow(UserNotAutError);
    
            const authenticated = await app.authenticate(userEmail, password);
            expect(authenticated).toBeTruthy();
        });
    });