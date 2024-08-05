IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'fauno')
BEGIN
    CREATE DATABASE fauno;
END
GO

USE fauno;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[user]') AND type in (N'U'))
BEGIN
    CREATE TABLE [user] (
        Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL,
        PasswordHash VARCHAR(255) NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'product_category') AND type in (N'U'))
BEGIN
    CREATE TABLE product_category (
        Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Icon VARCHAR(100) NOT NULL,
        Name VARCHAR(255) NOT NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[product]') AND type in (N'U'))
BEGIN
    CREATE TABLE [product] (
        Id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Description VARCHAR(255) NULL,
        Price DECIMAL(18, 2) NOT NULL,
        StockQuantity INT NOT NULL,
        CategoryId INT NOT NULL,
        FOREIGN KEY (CategoryId) REFERENCES product_category(Id)
    );
END
GO

IF NOT EXISTS (SELECT * FROM product_category)
BEGIN
    INSERT INTO product_category (Icon, Name) VALUES ('local_drink', 'Bebidas');
    INSERT INTO product_category (Icon, Name) VALUES ('restaurant_menu', 'Carnes e Frios');
    INSERT INTO product_category (Icon, Name) VALUES ('grass', 'Hortifruti');
    INSERT INTO product_category (Icon, Name) VALUES ('bakery_dining', 'Padaria e Confeitaria');
    INSERT INTO product_category (Icon, Name) VALUES ('local_pizza', 'Laticínios');
    INSERT INTO product_category (Icon, Name) VALUES ('shopping_basket', 'Mercearia');
    INSERT INTO product_category (Icon, Name) VALUES ('cleaning_services', 'Limpeza');
    INSERT INTO product_category (Icon, Name) VALUES ('face', 'Higiene Pessoal');
    INSERT INTO product_category (Icon, Name) VALUES ('ac_unit', 'Congelados');
    INSERT INTO product_category (Icon, Name) VALUES ('pets', 'Pet Shop');
END
GO

IF NOT EXISTS (SELECT * FROM product)
BEGIN
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Coca-Cola 2L', 'Refrigerante de cola', 7.99, 100, 1);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Bife de Alcatra', 'Corte de carne bovina', 29.99, 50, 2);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Tomate', 'Tomate fresco', 4.99, 200, 3);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Pão Francês', 'Pão fresco', 0.50, 500, 4);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Leite Integral 1L', 'Leite integral pasteurizado', 3.49, 150, 5);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Arroz Branco 5kg', 'Arroz tipo 1', 19.99, 100, 6);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Detergente 500ml', 'Detergente líquido para louças', 2.49, 300, 7);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Shampoo 400ml', 'Shampoo para cabelos', 12.99, 75, 8);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Pizza Congelada', 'Pizza de queijo congelada', 14.99, 60, 9);
    INSERT INTO product (Name, Description, Price, StockQuantity, CategoryId) VALUES ('Ração para Cães 10kg', 'Ração seca para cães adultos', 79.99, 40, 10);
END
GO
