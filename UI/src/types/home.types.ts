export type Category = {
    id: number;
    name: string;
    icon: string;
};

export type Product = {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    categoryName: string;
    categoryIcon: string;
};