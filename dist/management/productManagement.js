"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductManagement = void 0;
class ProductManagement {
    creatNew(t) {
        ProductManagement.id++;
        t.id = ProductManagement.id;
        ProductManagement.products.push(t);
    }
    findById(id) {
        let index = -1;
        for (let i = 0; i < ProductManagement.products.length; i++) {
            if (ProductManagement.products[i].id == id) {
                index = i;
                break;
            }
        }
        return index;
    }
    getAll() {
        return ProductManagement.products;
    }
    removeById(id) {
        let index = this.findById(id);
        ProductManagement.products.splice(index, 1);
    }
    updateById(id, t) {
        let index = this.findById(id);
        if (index != -1) {
            ProductManagement.products[index] = t;
        }
    }
}
exports.ProductManagement = ProductManagement;
ProductManagement.id = 0;
ProductManagement.products = [];
