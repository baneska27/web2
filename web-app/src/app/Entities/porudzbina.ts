import { Proizvod } from "./proizvod"
import { ProizvodPorudzbina } from "./proizvod-porudzbina"

export class Porudzbina {
    proizvods : ProizvodPorudzbina[];
    adresa : string;
    komentar : string;
    cena : number;
    idKorisnika : string;
    idDostave : number;
    stanje : number;

    constructor(proizvods : ProizvodPorudzbina[])
    {
        this.proizvods = proizvods;
        this.adresa = 'invalid';
        this.komentar = 'invalid';
        this.cena = 0;
        this.idKorisnika = 'invalid';
        this.idDostave=0;
        this.stanje = 0;
    }

}
