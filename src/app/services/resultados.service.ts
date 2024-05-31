import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { BonolotoInterface } from '../models/bonoloto.interface';
import { EurodreamsInterface } from '../models/eurodreams.interface';
import { EuromillonesInterface } from '../models/euromillones.interface';
import { GordoInterface } from '../models/gordo.interface';
import { LototurfInterface } from '../models/lototurf.interface';
import { NacionalInterface } from '../models/nacional.inerface';
import { PrimitivaInterface } from '../models/primitiva.interface';
import { QuinielaInterface } from '../models/quiniela.interface';
import { QuinigolInterface } from '../models/quinigol.interface';
import { QuintupleInterface } from '../models/quintuple.interface';
import { QuinielaRowInterface } from '../models/quinielaRow.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private http: HttpClient) { }

  getGanadores(sorteo: string) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(environment.URLServer + sorteo);
  }

  postBonoloto(bono:BonolotoInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Bonoloto", bono);
  }
  postEurodreams(bono:EurodreamsInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Eurodreams", bono);
  }
  postEuromillones(bono:EuromillonesInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Euromillones", bono);
  }
  postGordo(bono:GordoInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Gordo", bono);
  }
  postLototurf(bono:LototurfInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Lototurf", bono);
  }
  postNacional(bono:NacionalInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Nacional", bono);
  }
  postPrimitiva(bono:PrimitivaInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Primitiva", bono);
  }
  postQuiniela(bono:QuinielaInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Quiniela", bono);
  }
  postQuinigol(bono:QuinigolInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Quinigol", bono);
  }
  postQuintuple(bono:QuintupleInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(environment.URLServer +"Quintuple", bono);
  }

  putBonoloto(fecha:string,bono:BonolotoInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Bonoloto/"+fecha, bono);
  }
  putEurodreams(fecha:string,bono:EurodreamsInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Eurodreams/"+fecha, bono);
  }

  putEuromillones(fecha:string,bono:EuromillonesInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Euromillones/"+fecha, bono);
  }
  putGordo(fecha:string,bono:GordoInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Gordo/"+fecha, bono);
  }
  putLototurf(fecha:string,bono:LototurfInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Lototurf/"+fecha, bono);
  }
  putNacional(fecha:string,bono:NacionalInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Nacional/"+fecha, bono);
  }
  putPrimitiva(fecha:string,bono:PrimitivaInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Primitiva/"+fecha, bono);
  }
  putQuiniela(fecha:string,bono:QuinielaInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Quiniela/"+fecha, bono);
  }
  putQuinigol(fecha:string,bono:QuinigolInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Quinigol/"+fecha, bono);
  }
  putQuintuple(fecha:string,bono:QuintupleInterface) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Quintuple/"+fecha, bono);
  }

  deleteResultado(fecha:string, sorteo:string) {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.delete(environment.URLServer+sorteo+"/"+fecha);
  }

  putQuinielaPartido(partido:QuinielaRowInterface){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Quiniela/partido", partido);
  }

  putQuinigolPartido(partido:QuinielaRowInterface){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(environment.URLServer +"Quinigol/partido", partido);
  }

  deleteQuinigolPartido(fecha:string, local:string){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.delete(environment.URLServer +"Quinigol/partido/"+ fecha + "/"+local);
  }

  deleteQuinielaPartido(fecha:string, local:string){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.delete(environment.URLServer +"Quiniela/partido/"+ fecha + "/"+local);
  }
}
