import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Javier',
    apellido: 'Rey',
    email: 'jrey@jrey.es',
    pais: '',
    genero: ''
  }

  arrayPaises: any[] = [];

  constructor( private paises: PaisService ) { }

  ngOnInit(): void {
    this.paises.getPaises().subscribe( datos => {
        this.arrayPaises = datos;
        this.arrayPaises.unshift({
          nombre: '[Seleccione País]',
          codigo: ''
        })
    });
  }

  guardar(miForm: NgForm){
    console.log(miForm.value);
    if(miForm.invalid){
      Object.values(miForm.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }
  }

}
