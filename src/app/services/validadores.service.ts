import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHerrera( control: FormControl ): ErrorValidate {
      if( control.value.toLowerCase() === 'herrera' ){
        // SI EL APELLIDO ES HERRERA, DEVUELVE TRUE
        return {
          noHerrera: true
        }
      }

      // SI EL APELLIDO NO ES HERRERA, DEVUELVE NULL
      return null;
  }

  passwordsIguales( pass1:string, pass2:string){
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

  usuarioRepetido( control: FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate> {

      if( !control.value ){
        return Promise.resolve(null);
      }

      return new Promise( (resolve,reject) => {
          setTimeout( ()=> {
              if( control.value === "jrey" ){
                  resolve({ existe: true });
              } else {
                  resolve(null);
              }
          }, 2500 ); 
      });
  }

}
