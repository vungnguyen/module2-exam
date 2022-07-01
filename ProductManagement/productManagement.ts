import {IProductManagement} from "./i-product-management";
import {Product} from "../model/product";

export class ProductManagement implements IProductManagement<Product> {
    private static id: number = 0;
    static products: Product[] = [];
    creatNew(t: Product): void {
        ProductManagement.id ++ ;
        t.id = ProductManagement.id;
        ProductManagement.products.push(t);
    }

    findById(id: number): number {
        let index = -1;
        for (let i = 0; i < ProductManagement.products.length; i++){
            if (ProductManagement.products[i].id == id){
                index = i;
                break;
            }
        }
        return index;

    }

    getAll(): Product[] {
        return ProductManagement.products;
    }

    removeById(id: number): void {
        let index = this.findById(id);
        ProductManagement.products.splice(index,1)
    }

    updateById(id: number, t: Product): void {
        let index = this.findById(id);
        if (index != -1){
            ProductManagement.products[index] = t;
        }

    }
    findByName(name: string): Product | null {
        for(let i = 0; i < ProductManagement.products.length; i++){
            if(ProductManagement.products[i].name == name){
                return ProductManagement.products[i];
            }
        }
        return null;
    }

}