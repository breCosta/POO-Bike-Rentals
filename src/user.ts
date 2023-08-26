export class User {
    name: string;
    cpf: string;
    email: string;
    phone: number;

    constructor(name: string, cpf: string, email: string, phone: number) {
        this.name = name;
        this.cpf = cpf;
        this.email = email;    
        this.phone = phone;
    }

}