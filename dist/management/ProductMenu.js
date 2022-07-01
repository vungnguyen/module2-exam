"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMenu = void 0;
const productManagement_1 = require("./productManagement");
const product_1 = require("../model/product");
const rl = __importStar(require("readline-sync"));
var ProductChoice;
(function (ProductChoice) {
    ProductChoice[ProductChoice["SHOW_ALL_PRODUCT"] = 1] = "SHOW_ALL_PRODUCT";
    ProductChoice[ProductChoice["SEARCH_BY_NAME"] = 2] = "SEARCH_BY_NAME";
    ProductChoice[ProductChoice["ADD_PRODUCT"] = 3] = "ADD_PRODUCT";
    ProductChoice[ProductChoice["UPDATE_PRODUCT"] = 4] = "UPDATE_PRODUCT";
    ProductChoice[ProductChoice["REMOVE_PRODUCT"] = 5] = "REMOVE_PRODUCT";
})(ProductChoice || (ProductChoice = {}));
class ProductMenu {
    constructor() {
        this.productManagement = new productManagement_1.ProductManagement();
    }
    run() {
        let choice = -1;
        do {
            console.log("---Quản lý sản phẩm---");
            console.log('1. Hiển thị danh sách hàng hóa');
            console.log('2. Tìm kiếm hàng hóa theo tên');
            console.log('3. Thêm mặt hàng  mới');
            console.log('4. Chỉnh sửa thông tin mặt hàng  ');
            console.log('5. Xóa mặt hàng khỏi ứng dụng');
            choice = +rl.question('Nhập lựa chọn');
            switch (choice) {
                case ProductChoice.SHOW_ALL_PRODUCT: {
                    this.showAllProduct();
                    break;
                }
                case ProductChoice.SEARCH_BY_NAME: {
                    this.findByName();
                    break;
                }
                case ProductChoice.ADD_PRODUCT: {
                    this.creatProduct();
                    break;
                }
                case ProductChoice.UPDATE_PRODUCT: {
                    this.updateProduct();
                    break;
                }
                case ProductChoice.REMOVE_PRODUCT: {
                    this.removeProduct();
                }
            }
        } while (choice != 0);
    }
    removeProduct() {
        console.log('--Xóa mặt hàng khỏi ứng dụng--');
        let products = this.productManagement.getAll();
        for (let product of products) {
            console.log(`Id: ${product.id} | Tên: ${product.name} | Loại : ${product.type} | | Gia: ${product.price} | Số lượng: ${product.amount} | Ngày tạo: ${product.creationDate} | Mô tả: ${product.description} `);
        }
        let idRemove = +rl.question('Nhập mã mặt hàng muốn xóa: ');
        let lengthProduct = products.length;
        this.productManagement.removeById(idRemove);
        if (lengthProduct !== products.length) {
            console.log('Xóa thành công!');
        }
        else {
            console.log('Xóa thật bại!');
        }
    }
    updateProduct() {
        console.log('--Chỉnh sửa thông tin mặt hàng--');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`Id: ${products[i].id} | Tên: ${products[i].name}`);
        }
        let idProduct = +rl.question("Nhập id danh mục muốn sửa:");
        let indexUpdate = this.productManagement.findById(idProduct);
        if (indexUpdate !== -1) {
            let product = ProductMenu.inputProduct();
            product.id = idProduct;
            this.productManagement.updateById(idProduct, product);
            console.log('Sửa hàng hóa thành công!');
        }
        else {
            console.log('Nhập sai mã mặt hàng!');
        }
    }
    findByName() {
        console.log('--Tìm kiếm hàng hóa theo tên--');
        let products = this.productManagement.getAll();
        let arrLinearSearch = [];
        let nameProduct = rl.question('nhập tên hàng hóa: ');
        let flag = true;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(nameProduct)) {
                arrLinearSearch.push(products[i]);
            }
            else {
                flag = false;
            }
        }
        if (arrLinearSearch.length != 0) {
            flag = true;
        }
        if (flag) {
            for (let product of arrLinearSearch) {
                console.log(`Id: ${product.id} | Tên: ${product.name} | Loại : ${product.type} | | Gia: ${product.price} | Số lượng: ${product.amount} | Ngày tạo: ${product.creationDate} | Mô tả: ${product.description}  `);
                flag = true;
            }
        }
        else {
            console.log('Mặt hàng không tồn tại');
        }
    }
    creatProduct() {
        let product = ProductMenu.inputProduct();
        this.productManagement.creatNew(product);
        console.log('Thêm thành công!');
    }
    static inputProduct() {
        console.log('--Thêm mặt hàng mới--');
        let name = rl.question('Nhập tên mặt hàng: ');
        let type = rl.question('Nhập loại : ');
        let price = +rl.question('Nhập giá : ');
        let amount = +rl.question('Nhập số lượng: ');
        let creationDate = rl.question('Nhập ngày tạo: ');
        let description = rl.question('Nhập mô tả: ');
        return new product_1.Product(name, type, price, amount, creationDate, description);
    }
    showAllProduct() {
        console.log('--Hiển thị danh sách hàng hóa--');
        let products = this.productManagement.getAll();
        for (let i = 0; i < products.length; i++) {
            console.log(`ID: ${i + 1} | Tên: ${products[i].name} | Loại hàng: ${products[i].type} | Giá: ${products[i].price} | Số lượng: ${products[i].amount} | Ngày tạo: ${products[i].creationDate}  | Mô tả: ${products[i].description}`);
        }
    }
}
exports.ProductMenu = ProductMenu;
