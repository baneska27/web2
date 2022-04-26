export class User {
    username: string;
    email: string;
    password: string;
    type: string;
    firstName : string;
    secondName : string;
    dateOfBirth : Date;
    address : string;
    verified : boolean;

    constructor(username: string, email: string, password: string, type: string, firstName : string, secondName : string, dateOfBirth : Date, address : string, verified : boolean){
        this.username=username;
        this.email=email;
        this.password=password;
        this.type=type;
        this.firstName = firstName;
        this.secondName = secondName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.verified = verified;

    }

    
}


export class UserWithoutPass {
    username: string;
    email: string;
    
    type: string;
    firstName : string;
    secondName : string;
    dateOfBirth : Date;
    address : string;
    verified : boolean;

    constructor(username: string, email: string, type: string, firstName : string, secondName : string, dateOfBirth : Date, address : string, verified : boolean){
        this.username=username;
        this.email=email;
        this.type=type;
        this.firstName = firstName;
        this.secondName = secondName;
      
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.verified = verified;

    }

    
}
