"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(name, type, price, amount, creationDate, description) {
        this._id = 0;
        this._name = name;
        this._type = type;
        this._price = price;
        this._amount = amount;
        this._creationDate = creationDate;
        this._description = description;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get amount() {
        return this._amount;
    }
    set amount(value) {
        this._amount = value;
    }
    get creationDate() {
        return this._creationDate;
    }
    set creationDate(value) {
        this._creationDate = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
exports.Product = Product;
