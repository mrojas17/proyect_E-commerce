export interface IProducts {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

export interface ICategory {
    id: number;
    name: string;
    products: IProducts[];
}

export interface IOrder {
    id: number;
    status: string;
    date: Date;
    user: IUser;
    products: IProducts[];
}

enum eRol {
    ADMIN = "admin",
    USER = "user",
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    role: eRol;
    orders: IOrder[];
}

