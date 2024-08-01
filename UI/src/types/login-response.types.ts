export type LoginResponse = {
    name: string;
    email: string;
    token: string;
};

export type ActionResponse = {
    success: boolean;
    message: string;
    data: any;
};