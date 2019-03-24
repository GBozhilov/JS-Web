var Box = /** @class */ (function () {
    function Box() {
        this.container = [];
        this.count = 0;
    }
    Box.prototype.add = function (item) {
        this.container.push(item);
        this.count++;
    };
    Box.prototype.remove = function () {
        if (this.container.length === 0) {
            return;
        }
        this.container.pop();
        this.count--;
    };
    return Box;
}());
var box = new Box();
box.add('a');
box.add('b');
box.add('c');
box.remove();
console.log(box.count);
console.log(box);
