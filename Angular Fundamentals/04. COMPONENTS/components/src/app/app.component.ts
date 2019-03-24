import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
    selector: 'softuni-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('nameInput') nameInput;

    name = 'Enter Your Name';
    todos = [];

    constructor() {

    }

    ngAfterViewInit(): void {
        this.nameInput.nativeElement.value = 'Initial value';
    }

    onKeyUpHandler(value: string) {
        console.log(value);
    }

    addTodo(title: string) {
        this.todos = this.todos.concat({title, completed: false});
    }

    toggleCompleted(idx: number) {
        const currentTodo = this.todos[idx];
        this.todos[idx] = {...currentTodo, completed: !currentTodo.completed};
    }
}
