import { Partido } from "./partido.interface";

export interface QuinigolInterface {
  fecha: Date;
  jornada: number;
  partidos: Partido[],
}
