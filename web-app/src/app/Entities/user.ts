export class User {
    username: string;
    email: string;
    password: string;
    type: string;
    firstName : string;
    secondName : string;
    dateOfBirth : Date;
    slika : string;

    constructor(username: string, email: string, password: string, type: string, firstName : string, secondName : string, dateOfBirth : Date, slika : string){
        this.username=username;
        this.email=email;
        this.password=password;
        this.type=type;
        this.firstName = firstName;
        this.secondName = secondName;
        this.slika = slika;
        this.dateOfBirth = dateOfBirth;
    }
}
