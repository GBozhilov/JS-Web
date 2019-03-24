class Melon {
    public weight: number;
    public melonSort: string;
    protected readonly elementIndex: number;

    constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = weight * melonSort.length;
    }

    getElementIndex(): number {
        return this.elementIndex;
    }
}

export class WaterMelon extends Melon {
    toString() {
        let result = `Element: Water\n`;
        result += `Sort: ${this.melonSort}\n`;
        result += `Element Index: ${this.elementIndex}`;

        return result;
    }
}

export class FireMelon extends Melon {
    toString() {
        let result = `Element: Fire\n`;
        result += `Sort: ${this.melonSort}\n`;
        result += `Element Index: ${this.elementIndex}`;

        return result;
    }
}

export class EarthMelon extends Melon {
    toString() {
        let result = `Element: Earth\n`;
        result += `Sort: ${this.melonSort}\n`;
        result += `Element Index: ${this.elementIndex}`;

        return result;
    }
}

export class AirMelon extends Melon {
    public toString() {
        let result = `Element: Air\n`;
        result += `Sort: ${this.melonSort}\n`;
        result += `Element Index: ${this.elementIndex}`;

        return result;
    }
}

export class Morph extends WaterMelon {
    public elements: Array<string>;

    constructor(weight: number, melonSort: string) {
        super(weight, melonSort);
        this.elements = ['Water', 'Fire', 'Earth', 'Air'];
    }

    public morph() {
        const element = this.elements.shift();
        this.elements.push(element);
    }

    public toString() {
        let result = `Element: ${this.elements[0]}\n`;
        result += `Sort: ${this.melonSort}\n`;
        result += `Element Index: ${this.elementIndex}`;

        return result;
    }
}

let obj = new Morph(5, 'hubav');
obj.morph();
obj.morph();
console.log(obj.toString());
