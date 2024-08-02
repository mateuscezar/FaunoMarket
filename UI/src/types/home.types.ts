export type Category = {
    id: number;
    name: string;
    icon: string;
    selected: boolean;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    categoryName: string;
    categoryIcon: string;
};

export type ProductFilter = {
    name?: string;
    categoryId?: number;
};