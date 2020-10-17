import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  

  constructor( private http: HttpClient) { }

  getPaises(){
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').
    pipe( 
      map(
        (resultado:any[]) => {
          return resultado.map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code }) )
        }
      )
    );
  }

  getProvincias(){
      return this.http.get('https://apiv1.geoapi.es/provincias?type=JSON&key=a6d0ebdf5830ea26b4d543617719f45cc1bb2fe7655d9abdcc6cd5fb1e561efd&sandbox=0')
      .pipe( 
        map(
          (resultado:any[]) => {
            return resultado['data'].map( provincia => ({ nombre: provincia.PRO, codigo: provincia.CPRO }) )
          }
        )
      );
  }

  getMunicipios(cpro){
    return this.http.get('https://apiv1.geoapi.es/municipios?CPRO='+cpro+'&type=JSON&key=a6d0ebdf5830ea26b4d543617719f45cc1bb2fe7655d9abdcc6cd5fb1e561efd&sandbox=0')
    .pipe( 
      map(
        (resultado:any[]) => {
          return resultado['data'].map( municipio => ({ nombre: municipio.DMUN50, codigo: municipio.CNUM }) )
        }
      )
    );
}
  
}
