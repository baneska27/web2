import { Sastojak } from "./sastojak";

export class Proizvod {
    ime : string;
    cena : number;
    id : number;
    sastojaks : Sastojak[]

    constructor(ime : string,cena:number,id:number,sastojaks : Sastojak[])
    {
        this.ime = ime;
        this.cena = cena;
        this.id = id;
        this.sastojaks = sastojaks;
    }
}
