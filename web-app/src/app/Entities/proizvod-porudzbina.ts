import { Sastojak } from "./sastojak";

export class ProizvodPorudzbina {
    id : number;
    kolicina : number;
    ime : string;
    cena : number;
    sastojaks : Sastojak[]

    constructor(id : number,kolicina : number,ime : string,cena:number,sastojaks : Sastojak[])
    {
        this.ime = ime;
        this.cena = cena;
        this.sastojaks = sastojaks;
        this.id = id;
        this.kolicina = kolicina;
        this.sastojaks = sastojaks;
    }
}
