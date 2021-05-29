export class Users {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}