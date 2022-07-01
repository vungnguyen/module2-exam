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
            console.log('3. Thêm mặt hàng  mới ');
            console.log('4. Chỉnh sửa thông tin mặt hàng  ');
            console.log('5. Xóa mặt hàng khỏi ứng dụng');
            console.log('0. Quay lại');
            choice = +rl.question('Nhập lựa chọn của bạn : ');
            switch (choice) {
                case ProductChoice.SHOW_ALL_PRODUCT: {
                    this.showAllProduct();
                    break;
                }
                case ProductChoice.SEARCH_BY_NAME: {
                    this.searchByName();
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
        if (products.length == 0) {
            console.log('======== Hiện chưa  có hàng hóa! ========');
        }
        else {
            for (let product of products) {
                console.log(`Id: ${product.id} | Tên mặt hàng: ${product.name} | Loại : ${product.type} | | Giá: ${product.price} | Số lượng: ${product.amount} | Ngày tạo: ${product.creationDate} | Mô tả: ${product.description} `);
            }
            let idRemove = +rl.question('Nhập mã mặt hàng muốn xóa: ');
            let indexProduct = this.productManagement.findById(idRemove);
            if (indexProduct !== -1) {
                this.productManagement.removeById(idRemove);
                console.log('Xoá thành công!');
            }
            else {
                console.log('Không tồn tại mã hàng cần xóa!');
            }
        }
    }
    updateProduct() {
        console.log('--Chỉnh sửa thông tin mặt hàng--');
        let products = this.productManagement.getAll();
        if (products.length == 0) {
            console.log('======= không có hàng hóa để chỉnh sửa , cần thêm vào! ========');
        }
        else {
            for (let i = 0; i < products.length; i++) {
                console.log(`Id: ${products[i].id} | Tên mặt hàng: ${products[i].name} | Loại : ${products[i].type} | | Giá: ${products[i].price} | Số lượng: ${products[i].amount} | Ngày tạo: ${products[i].creationDate} | Mô tả: ${products[i].description}  `);
            }
            let idProduct = +rl.question("Nhập id hàng hóa muốn sửa:");
            console.log('Cập nhật hàng hóa');
            let indexUpdate = this.productManagement.findById(idProduct);
            if (indexUpdate !== -1) {
                let product = this.inputProduct();
                product.id = idProduct;
                this.productManagement.updateById(idProduct, product);
                console.log('Cập nhật lại hàng hóa thành công!');
            }
            else {
                console.log('Không tồn tại mã hàng cần update !');
            }
        }
    }
    searchByName() {
        console.log('--Tìm kiếm hàng hóa theo tên--');
        let products = this.productManagement.getAll();
        if (products.length == 0) {
            console.log('====== Hiện chưa có hàng hóa, cần thêm vào! ====== ');
        }
        else {
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
                    console.log(`Id: ${product.id} | Tên mặt hàng: ${product.name} | Loại : ${product.type} | | Giá: ${product.price} | Số lượng: ${product.amount} | Ngày tạo: ${product.creationDate} | Mô tả: ${product.description}  `);
                    flag = true;
                }
            }
            else {
                console.log('Không có dữ liệu phù hợp');
            }
        }
    }
    creatProduct() {
        console.log('--Thêm mặt hàng mới--');
        let product = this.inputProduct();
        this.productManagement.creatNew(product);
        console.log('Thêm thành công!');
    }
    inputProduct() {
        let name = this.inputName();
        let type = ProductMenu.inputType();
        let price = ProductMenu.inputPrice();
        let amount = ProductMenu.inputAmount();
        let creationDate = new Date();
        let description = ProductMenu.inputDescription();
        return new product_1.Product(name, type, price, amount, creationDate, description);
    }
    static inputDescription() {
        let description = '';
        let isValidDescription = true;
        do {
            description = rl.question('Nhập mô tả (ít nhất 10 ký tự): ');
            let regexForDescription = /^[a-zA-Z\d]{10,}$/g;
            if (!regexForDescription.test(description)) {
                isValidDescription = false;
                console.log('Mô tả không hợp lệ');
            }
            else {
                isValidDescription = true;
            }
        } while (!isValidDescription);
        return description;
    }
    static inputAmount() {
        let amount = -1;
        do {
            amount = +rl.question('Nhập số lượng: ');
            if (amount <= 0) {
                console.log("----Giá trị nhập vào phải là số dương---");
            }
        } while (amount <= 0);
        return amount;
    }
    static inputPrice() {
        let price = -1;
        do {
            price = +rl.question('Nhập giá sản phẩm: ');
            if (price <= 0) {
                console.log("----Giá trị nhập vào phải là số dương----");
            }
        } while (price <= 0);
        return price;
    }
    static inputType() {
        let type = '';
        let isValidChoice = true;
        let choice = -1;
        do {
            console.log('--Nhập loại hàng hóa--');
            console.log('1. laptop');
            console.log('2. điện thoại');
            choice = +rl.question('Nhập lựa chọn của bạn: ');
            if (choice == 1) {
                type = 'laptop';
                isValidChoice = true;
            }
            else if (choice == 2) {
                type = 'điện thoại';
                isValidChoice = true;
            }
            else {
                console.log(' Chọn 1 hoặc 2');
                isValidChoice = false;
            }
        } while (!isValidChoice);
        return type;
    }
    inputName() {
        let name = '';
        let isValidName = true;
        do {
            name = rl.question('Nhập tên (không được bỏ trống, nhiều nhất 9 ký tự): ');
            let regexForName = /^[a-zA-Z\d]{1,9}$/g;
            if (!regexForName.test(name)) {
                isValidName = false;
                console.log('Tên không hợp lệ');
            }
            else {
                isValidName = true;
                let currentName = this.productManagement.findByName(name);
                if (currentName) {
                    console.log('Tên đã tồn tại');
                    isValidName = false;
                }
                else {
                    isValidName = true;
                }
            }
        } while (!isValidName);
        return name;
    }
    showAllProduct() {
        console.log('--Hiển thị danh sách hàng hóa--');
        let products = this.productManagement.getAll();
        if (products.length == 0) {
            console.log('====== không có hàng hóa! =======');
        }
        else {
            for (let i = 0; i < products.length; i++) {
                console.log(`ID: ${i + 1} | Tên mặt hàng: ${products[i].name} | Loại hàng: ${products[i].type} | Giá: ${products[i].price} | Số lượng: ${products[i].amount} | Ngày tạo: ${products[i].creationDate}  | Mô tả: ${products[i].description}`);
            }
        }
    }
}
exports.ProductMenu = ProductMenu;
