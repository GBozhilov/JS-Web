abstract class Employee {
    private readonly name: string;
    private age: number;
    protected salary: number;
    protected tasks: Array<string>;

    protected constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    public work(): void {
        const currentTask = this.tasks.shift();
        this.tasks.push(currentTask);

        console.log(this.name + currentTask);
    }

    public collectSalary(): void {
        console.log(`${this.name} received ${this.getSalary()} this month.`);
    }

    public getSalary(): number {
        return this.salary;
    }
}

class Junior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(' is working on a simple task.');
    }
}

class Senior extends Employee {
    constructor(name: string, age: number) {
        super(name, age);
        this.tasks.push(' is working on a complicated task.');
        this.tasks.push(' is taking time off work.');
        this.tasks.push(' is supervising junior workers.');
    }
}

class Manager extends Employee {
    private readonly dividend: number;

    constructor(name: string, age: number) {
        super(name, age);
        this.dividend = 0;
        this.tasks.push(' scheduled a meeting.');
        this.tasks.push('is preparing a quarterly meeting.');
    }

    public getSalary(): number {
        return super.getSalary() + this.dividend;
    }
}
