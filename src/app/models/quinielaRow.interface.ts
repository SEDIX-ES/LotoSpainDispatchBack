import { Partido } from "./partido.interface";

export interface QuinielaRowInterface {
  fecha: Date;
  jornada: number;
  partidos: Partido;
  local: string;
}
