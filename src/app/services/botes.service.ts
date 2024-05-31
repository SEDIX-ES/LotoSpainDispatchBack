import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { BoteInterface } from '../models/bote.interface';
import { BoteNacionalInterface } from '../models/boteNacional.interface';

@Injectable({
  providedIn: 'root'
})
export class BotesService {

  constructor(private http: HttpClient) { }

  boteURL: string=environment.URLServer+"Botes";

  getUltimos() {
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(this.boteURL + '/Ultimos');
  }

  getBotesSorteo(sorteo: string){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.get(this.boteURL + '/' + sorteo);
  }

  postBote(bote:BoteInterface){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(this.boteURL, bote);
  }

  postBoteNacional(bote:BoteNacionalInterface){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.post(this.boteURL + "/Nacional", bote);
  }

  putBote(bote:BoteInterface){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(this.boteURL, bote);
  }

  putBoteNacional(bote:BoteNacionalInterface){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.put(this.boteURL + "/Nacional", bote);
  }

  deleteBote(id: number){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.delete(this.boteURL + "/"+id);
  }

  deleteBoteNacional(id: number, id_nac: number){
    const opciones = {
      headers: new HttpHeaders({
        accept: 'text/plain',
      }),
    };
    return this.http.delete(this.boteURL + "/"+id+ "/"+id_nac);
  }
}
