class Box<T> {
    public container: T[];
    public count: number;

    constructor() {
        this.container = [];
        this.count = 0;
    }

    add(item: T): void {
        this.container.push(item);
        this.count++;
    }

    remove(): void {
        if (this.container.length === 0) {
            return;
        }

        this.container.pop();
        this.count--;
    }
}

const box = new Box<string>();
box.add('a');
box.add('b');
box.add('c');
box.remove();
console.log(box.count);
console.log(box);

