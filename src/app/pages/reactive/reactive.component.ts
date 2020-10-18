import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';
import { ValidadoresService } from 'src/app/services/validadores.service';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  formulario: FormGroup;
  arrayProvincias: any[] = [];
  arrayMunicipios: any[] = [];
  provinciaSeleccionada: any;
 
  constructor( private fb: FormBuilder,
               private paisService: PaisService,
               private validadores: ValidadoresService ) {
    this.creaFormulario();
    this.cargarDatosFormulario();
    //this.crearListeners();
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
    this.arrayMunicipios.unshift({
      nombre: '[Seleccione Municipio]',
      codigo: ''
    })
    
  }

  get pasatiempos(){
    return this.formulario.get('pasatiempos') as FormArray;
  }

  get pass2Invalid(){
    const pass1 = this.formulario.get('pass1').value;
    const pass2 = this.formulario.get('pass2').value;

    return ( pass1 === pass2 )? false : true;
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('Nuevo elemento', Validators.required) )
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  inputNoValido(input: string) {
    return this.formulario.get(input).invalid && this.formulario.get(input).touched;
  }
    
  creaFormulario(){
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3), this.validadores.noHerrera] ],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      usuario: ['', '', this.validadores.usuarioRepetido],
      provincia: ['', Validators.required],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      municipio: ['', Validators.required],
      pasatiempos:  this.fb.array([])
    },
    {
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  crearListeners(){
    this.formulario.get('provincia').valueChanges.subscribe( valor => {
        console.log(valor);
    });
  }

  cargarDatosFormulario(){
    this.formulario.setValue({
      nombre: 'Javier',
      apellido: 'Rey',
      correo: 'jrey@jrey.es',
      usuario: 'jrey',
      provincia: '',
      municipio: '',
      pasatiempos: [],
      pass1: '',
      pass2: ''
    });

    // En el caso de array, meteríamos así ,los valores:
    // ['Comer','Fumar','Hacerme pajas'].forEach(
    //     valorRetornado => {
    //       this.pasatiempos.push( this.fb.control(valorRetornado) );
    //     }
    // );

  }

  eligoProvincia(){
    this.paisService.getMunicipios(this.provinciaSeleccionada.value).subscribe( (datos:any) => {
        this.arrayMunicipios = datos;
        this.arrayMunicipios.unshift({
          nombre: '[Seleccione Municipio]',
          codigo: ''
        })
    });
  }

  
  guardar(){
    console.log(this.formulario);
    if(this.formulario.invalid){
      Object.values(this.formulario.controls).forEach( control => {
        control.markAllAsTouched();
      });
    }else{
      this.formulario.reset();
    }
    
  }



}
