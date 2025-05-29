import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-labs',
  imports: [  CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  title = 'todoapp';
  tasks = signal([
    "Instalar angular CLI",
    "Crear proyecto",
    "Crear componentes"
  ]);

  name = signal("ALdo");
  age = "12"
  disabled = true;
  img = "https://gentleman.elperiodico.com/wp-content/uploads/2024/10/New_Ferrari_Supercar_media_-4.jpeg"

  person = signal({
    name : "Daniel",
    age : 20,
    aficion : "https://gentleman.elperiodico.com/wp-content/uploads/2024/10/New_Ferrari_Supercar_media_-4.jpeg"
});
  clickHandler(){
    alert("hola")

  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue)
    console.log(newValue);
  }
  keydownHandler(event : KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
  changeAge(event : Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        age :parseInt(newValue)
}
    });

  }

  changeName(event : Event){
const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name:newValue
}
    });

  }




  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,{
    nonNullable: true
  });
  nameCtrl = new FormControl(50,{
    nonNullable: true,
    validators:[
      Validators.required,
      Validators.minLength(3)
      
    ]
  });
  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(value);
    }) 
  }
}