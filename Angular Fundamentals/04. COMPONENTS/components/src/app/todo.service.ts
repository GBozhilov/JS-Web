import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    todos = [];

    constructor() {
    }

    addTodo(title: string) {
        if (!title) {
            return;
        }
        this.todos = this.todos.concat({title, completed: false});
    }

    toggleCompleted(idx: number) {
        const currentTodo = this.todos[idx];
        this.todos[idx] = {...currentTodo, completed: !currentTodo.completed};
    }
}
