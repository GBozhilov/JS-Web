import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {TodoService} from './todo.service';
import {ITodo} from './interfaces';
import {fromEvent} from 'rxjs';

@Component({
    selector: 'softuni-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('filterInput') filterInput: ElementRef;
    todos: ITodo[];

    constructor(private todoService: TodoService) {
        this.todos = todoService.todos;
    }

    ngAfterViewInit(): void {
        fromEvent(this.filterInput.nativeElement, 'keyup').subscribe(e => {
            console.log(e);
        });
    }

    addTodo(title: string) {
        this.todoService.addTodo(title);
    }

    toggleCompleted(idx: number) {
        this.todoService.toggleCompleted(idx);
    }
}
