import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Task} from "./../../models/tasks.model"
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
tasks = signal<Task[]>([]);



injector = inject(Injector);
constructor(){
  
}

ngOnInit(){
  const storage = localStorage.getItem('tasks')
  if(storage){
    const tasks = JSON.parse(storage);
    this.tasks.set(tasks);
  }
  this.trackTasks();
}
trackTasks(){
  effect(() => {
    const currentTasks = this.tasks();   
    localStorage.setItem('tasks', JSON.stringify(currentTasks))
    
  },{injector: this.injector})

  }


filter = signal<'all' | 'pending' | 'completed'>("all");

tasksByFilter = computed(() => {
  const currentFilter = this.filter(); 
  const currentTasks = this.tasks();   

  if (currentFilter === 'pending') {
    return currentTasks.filter(task => !task.completed);
  }

  if (currentFilter === 'completed') {
    return currentTasks.filter(task => task.completed);
  }

  return currentTasks; 
});

  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if (value !== ""){
          this.addTask(value);
          this.newTaskCtrl.setValue("");}

    }

  }
  newTaskCtrl = new FormControl("",{
    nonNullable: true,
    validators: [
      Validators.required

    ]
  })


  addTask(title : string){
    const newTask = {
      id : Date.now(),
      title,
      completed : false
    };
    this.tasks.update ((tasks) => [...tasks, newTask]);
  }
  deleteTasks(index : number){
    this.tasks.update ((tasks) => tasks.filter ((task, position) => position !== index));
  
}
  updateTask(index:number){
    this.tasks.update ((tasks) => {
      return tasks.map ((task, position) => {
          if(position === index ) {
            return {
              ...task,
              completed: !task.completed
            }
          }
          return task;
      })

    })
  }

  updateTaskEditing(index:number){
    this.tasks.update ((tasks) => {
      return tasks.map ((task, position) => {
          if(position === index ) {
            return {
              ...task,
              editing: true
            }
          }
          return {
            ...task,
            editing: false
          };
      })

    })
  }


  updateTasktext(index:number, event: Event){
    const input = event.target as HTMLInputElement
    this.tasks.update ((tasks) => {
      return tasks.map ((task, position) => {
          if(position === index ) {
            return {
              ...task,
              title: input.value,
              editing: false
            }
          }
          return task;
      })

    })
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter)
  }

}