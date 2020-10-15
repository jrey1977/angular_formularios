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
    email: 'jrey@jrey.es'
  }

  constructor( private paises: PaisService ) { }

  ngOnInit(): void {
    this.paises.getPaises().subscribe( datos => {
        console.log(datos);
    });
  }

  guardar(miForm: NgForm){
    console.log('Enviado');
    console.log(miForm.value);
    if(miForm.invalid){
      Object.values(miForm.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }
  }

}
