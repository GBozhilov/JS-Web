"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Melon = /** @class */ (function () {
    function Melon(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = weight * melonSort.length;
    }
    Melon.prototype.getElementIndex = function () {
        return this.elementIndex;
    };
    return Melon;
}());
var WaterMelon = /** @class */ (function (_super) {
    __extends(WaterMelon, _super);
    function WaterMelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaterMelon.prototype.toString = function () {
        var result = "Element: Water\n";
        result += "Sort: " + this.melonSort + "\n";
        result += "Element Index: " + this.elementIndex;
        return result;
    };
    return WaterMelon;
}(Melon));
exports.WaterMelon = WaterMelon;
var FireMelon = /** @class */ (function (_super) {
    __extends(FireMelon, _super);
    function FireMelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FireMelon.prototype.toString = function () {
        var result = "Element: Fire\n";
        result += "Sort: " + this.melonSort + "\n";
        result += "Element Index: " + this.elementIndex;
        return result;
    };
    return FireMelon;
}(Melon));
exports.FireMelon = FireMelon;
var EarthMelon = /** @class */ (function (_super) {
    __extends(EarthMelon, _super);
    function EarthMelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EarthMelon.prototype.toString = function () {
        var result = "Element: Earth\n";
        result += "Sort: " + this.melonSort + "\n";
        result += "Element Index: " + this.elementIndex;
        return result;
    };
    return EarthMelon;
}(Melon));
exports.EarthMelon = EarthMelon;
var AirMelon = /** @class */ (function (_super) {
    __extends(AirMelon, _super);
    function AirMelon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AirMelon.prototype.toString = function () {
        var result = "Element: Air\n";
        result += "Sort: " + this.melonSort + "\n";
        result += "Element Index: " + this.elementIndex;
        return result;
    };
    return AirMelon;
}(Melon));
exports.AirMelon = AirMelon;
var Morph = /** @class */ (function (_super) {
    __extends(Morph, _super);
    function Morph(weight, melonSort) {
        var _this = _super.call(this, weight, melonSort) || this;
        _this.elements = ['Water', 'Fire', 'Earth', 'Air'];
        return _this;
    }
    Morph.prototype.morph = function () {
        var element = this.elements.shift();
        this.elements.push(element);
    };
    Morph.prototype.toString = function () {
        var result = "Element: " + this.elements[0] + "\n";
        result += "Sort: " + this.melonSort + "\n";
        result += "Element Index: " + this.elementIndex;
        return result;
    };
    return Morph;
}(WaterMelon));
exports.Morph = Morph;
var obj = new Morph(5, 'hubav');
obj.morph();
obj.morph();
console.log(obj.toString());
