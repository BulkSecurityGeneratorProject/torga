import { IArmario } from 'app/shared/model//armario.model';

export interface INiveladores {
    id?: number;
    codigo?: string;
    precio?: number;
    armario?: IArmario;
}

export class Niveladores implements INiveladores {
    constructor(public id?: number, public codigo?: string, public precio?: number, public armario?: IArmario) {}
}