import{ProductManagement} from "./productManagement";
import {Product} from "../model/product";
import * as rl from 'readline-sync'
enum ProductChoice {
    SHOW_ALL_PRODUCT = 1,
    SEARCH_BY_NAME = 2,
    ADD_PRODUCT = 3,
    UPDATE_PRODUCT = 4,
    REMOVE_PRODUCT = 5
}
export class ProductMenu {
    private productManagement = new ProductManagement();
    run() {
        let choice = -1;
        do {
            console.log("---Quản lý sản phẩm---");
            console.log('1. Hiển thị danh sách hàng hóa');
            console.log('2. Tìm kiếm hàng hóa theo tên');
            console.log('3. Thêm mặt hàng  mới ');
            console.log('4. Chỉnh sửa thông tin mặt hàng  ');
            console.log('5. Xóa mặt hàng khỏi ứng dụng');
            console.log('0. Quay lại')
            choice = +rl.question('Nhập lựa chọn của bạn : ');
            switch (choice){
                case ProductChoice.SHOW_ALL_PRODUCT: {
                    this.showAllProduct();
                    break;
                }
                case ProductChoice.SEARCH_BY_NAME: {
                    this.findByName();
                    break
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
        }while (choice != 0)
    }

     removeProduct() {
        console.log('--Xóa mặt hàng khỏi ứng dụng--');
        let products = this.productManagement.getAll();
        if (products.length == 0) {
            console.log('không có hàng hóa!')
        }else {
            for (let product of products) {
                console.log(`Id: ${product.id} | Tên: ${product.name} | Loại : ${product.type} | | Gia: ${product.price} | Số lượng: ${product.amount} | Ngày tạo: ${product.creationDate} | Mô tả: ${product.description} `)
            }
        }

        let idRemove = +rl.question('Nhập mã mặt hàng muốn xóa: ');
        let lengthProduct = products.length;
        this.productManagement.removeById(idRemove);
        if (lengthProduct !== products.length) {
            console.log('Xóa thành công!');
        } else {
            console.log('Xóa thật bại!');
        }
    }

     updateProduct() {
        console.log('--Chỉnh sửa thông tin mặt hàng--');
        let products = this.productManagement.getAll();
        if (products.length == 0) {
            console.log('không có hàng hóa!')
        }
        else {
            for (let i = 0; i < products.length; i++) {
                console.log(`Id: ${products[i].id} | Tên: ${products[i].name}`)
            }
        }
        let idProduct = +rl.question("Nhập id danh mục muốn sửa:")
        let indexUpdate = this.productManagement.findById(idProduct);
        if (indexUpdate !== -1) {
            let product = this.inputProduct();
            product.id = idProduct;
            this.productManagement.updateById(idProduct, product);
            console.log('Sửa hàng hóa thành công!');
        } else {
            console.log('Nhập sai mã mặt hàng!')
        }
    }

     findByName() {
        console.log('--Tìm kiếm hàng hóa theo tên--')
        let products = this.productManagement.getAll();
        let arrLinearSearch = [];
        let nameProduct = rl.question('nhập tên hàng hóa: ');
        let flag = true;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(nameProduct)) {
                arrLinearSearch.push(products[i]);
            } else {
                flag = false;
            }
        }
        if (arrLinearSearch.length != 0) {
            flag = true;
        }
        if (flag) {
            for (let product of arrLinearSearch) {
                console.log(`Id: ${product.id} | Tên: ${product.name} | Loại : ${product.type} | | Gia: ${product.price} | Số lượng: ${product.amount} | Ngày tạo: ${product.creationDate} | Mô tả: ${product.description}  `)
                flag = true;
            }
        } else {
            console.log('Mặt hàng không tồn tại')
        }
    }

     creatProduct() {
        let product = this.inputProduct();
        this.productManagement.creatNew(product);
        console.log('Thêm thành công!')
    }

     inputProduct() {
        console.log('--Thêm mặt hàng mới--');
         let name = this.inputName();
         let type = ProductMenu.inputType();
         let price = ProductMenu.inputPrice();
         let amount = ProductMenu.inputAmount();
         let creationDate = new Date();
         let description = ProductMenu.inputDescription();
         return new Product(name,type,price,amount,creationDate,description);
    }

    private static inputDescription() {
        let description = '';
        let isValidDescription = true;
        do {
            description = rl.question('Nhập mô tả (ít nhất 10 ký tự): ');
            let regexForDescription: RegExp = /^[a-zA-Z\d]{10,}$/g
            if (!regexForDescription.test(description)) {
                isValidDescription = false;
                console.log('Mô tả không hợp lệ')
            } else if (description == '') {
                isValidDescription = false;
                console.log('không được để trống')
            } else {
                isValidDescription = true;
            }
        } while (!isValidDescription)
        return description;
    }

    private static inputAmount() {
        let amount = -1
        do {
            amount = +rl.question('Nhập số lượng: ');
            if (amount <= 0) {
                console.log("----Giá trị nhập vào không đúng---")
            }
        } while (amount <= 0)
        return amount;
    }

    private static inputPrice() {
        let price = -1;
        do {
            price = +rl.question('Nhập giá sản phẩm: ')
            if (price <= 0) {
                console.log("----Giá trị nhập vào không đúng----")
            }
        } while (price <= 0)
        return price;
    }

    private static inputType() {
        let type = '';
        let isValidChoice = true;
        let choice = -1;
        do {
            console.log('--Nhập loại hàng hóa--');
            console.log('1. laptop');
            console.log('2. điện thoại');
            choice = +rl.question('Nhap lua chon cua ban: ');
            if (choice == 1) {
                type = 'laptop';
                isValidChoice = true;
            } else if (choice == 2) {
                type = 'điện thoại';
                isValidChoice = true;
            } else {
                console.log(' 1, hoặc 2');
                isValidChoice = false;
            }
        } while (!isValidChoice)
        return type;
    }

    private inputName() {
        let name = '';
        let isValidName = true;
        do {
            name = rl.question('Nhập tên(nhiều nhất 9 ký tự): ');
            let regexForName: RegExp = /^[a-zA-Z\d]{2,9}$/g
            if (!regexForName.test(name)) {
                isValidName = false;
                console.log('Tên không hợp lệ')
            } else {
                isValidName = true;
                let currentName = this.productManagement.findByName(name);
                if (currentName) {
                    console.log('Tên đã tồn tại');
                    isValidName = false;
                } else if (name == '') {
                    console.log('không được để trống')
                    isValidName = false;
                } else {
                    isValidName = true;
                }
            }
        } while (!isValidName);
        return name;
    }

    private showAllProduct() {
        console.log('--Hiển thị danh sách hàng hóa--');
        let products = this.productManagement.getAll();
        if (products.length == 0){
            console.log('không có hàng hóa')
        }else {
            for (let i = 0; i < products.length; i++) {
                console.log(`ID: ${i + 1} | Tên: ${products[i].name} | Loại hàng: ${products[i].type} | Giá: ${products[i].price} | Số lượng: ${products[i].amount} | Ngày tạo: ${products[i].creationDate}  | Mô tả: ${products[i].description}`)
            }
        }

    }
}