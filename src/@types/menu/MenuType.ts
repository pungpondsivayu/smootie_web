export interface ISaveMenu {
    MenuId: number,
    Name : string,
    Price : number,
    CreatedBy : string,
    IsUsed : boolean,
    CategoryId : number,
    ImageFile: File | string
}

export interface IAllMenu {
    menuId: number,
    name: string,
    price: number,
    createdBy: string,
    createdDate: string,
    isUsed: boolean,
    image: string,
    categoryId: number
    category : Icategory
}

interface Icategory {
    categoryId: number;
    name: string;
}