import { Partido } from "./partido.interface";

export interface QuinielaInterface {
  fecha: Date;
  jornada: number;
  partidos: Partido[],
}
