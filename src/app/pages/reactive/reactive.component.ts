import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;
  arrayProvincias: any[] = [];
  arrayMunicipios: any;
  provinciaSeleccionada: any;
 
  constructor( private fb: FormBuilder,
               private paisService: PaisService ) {
    this.creaFormulario();
    
  }

  ngOnInit(): void {
    this.provinciaSeleccionada = this.formulario.get('provincia');
    this.paisService.getProvincias().subscribe( (datos:any) => {
        this.arrayProvincias = datos;
        this.arrayProvincias.unshift({
          nombre: '[Seleccione Provincia]',
          codigo: ''
        });
        console.log(this.arrayProvincias);
    });
    
  }

  inputNoValido(input: string) {
    return this.formulario.get(input).invalid && this.formulario.get(input).touched;
  }
    
  creaFormulario(){
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required]
    });
  }

  guardar(){
    console.log(this.formulario);
    if(this.formulario.invalid){
      Object.values(this.formulario.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }
  }

  eligoProvincia(): any{
    // this.paisService.getMunicipios(this.provinciaSeleccionada.value).subscribe( (datos:any) => {
    //     this.arrayMunicipios = datos;
    //     this.arrayMunicipios.unshift({
    //       nombre: '[Seleccione Municipio]',
    //       codigo: ''
    //     })
    // });
    this.arrayMunicipios = this.paisService.getMunicipios(this.provinciaSeleccionada.value);
    // this.arrayMunicipios.unshift({
    //   nombre: '[Seleccione Municipio]',
    //   codigo: ''
    // })
  }

}
