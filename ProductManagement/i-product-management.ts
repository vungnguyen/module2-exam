export interface IProductManagement <T>{
    getAll(): T[];
    creatNew(t: T) : void;
    updateById(id: number,t: T) :void;
    findById(id: number): number;
    removeById(id: number) : void;
}