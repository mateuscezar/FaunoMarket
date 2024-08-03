# Projeto de Avaliação Técnica para Especialista em P&D

O projeto "Mercadinho do Fauno" foi desenvolvido para ser avaliado na vaga de Especialista de P&D da TOTVS. O mesmo é composto por um backend em .Net Core 8.0, frontend em Angular v17, e utiliza base de dados SQL Server.
A ideia é que seja um CRUD de produtos, onde para ter acesso deve-se criar um cadastro e realizar o login.
O layout foi pensado para ser de fácil manuseio e amigável com o usuário, inclusive sendo responsivo se ajustando de acordo com a resolução.

## Pré-requisitos

- [Node.js](https://nodejs.org/en/) v21.6.1
- [Angular CLI](https://angular.io/cli) v17.3.8
- [.NET Core SDK 8](https://dotnet.microsoft.com/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## Configuração do Backend (.NET Core 8)

1. **Instale o .NET Core 8 SDK:**
   - Baixe e instale o [SDK do .NET Core 8](https://dotnet.microsoft.com/download/dotnet/8.0).

2. **Configure o Banco de Dados:**
   - Certifique-se de ter uma instância do SQL Server em execução.
   - Caso prefira, estou deixando no arquivo **`docker-compose.yaml`** uma maneira facilitada de subir uma instância SQL Server. Caso prefira subir uma instância direto pelo docker, certifique-se de possuir o docker instalado e estar no diretório raiz do projeto, então execute o comando:
     ```bash
     docker-compose up -d
     
   OBS: Lembre de alterar a senha editando este arquivo com um editor de texto, o usuário padrão é o **`sa`**.
   - Execute o script SQL `database.sql` para configurar o banco de dados necessário para a aplicação.

3. **Configure a String de Conexão:**
   - Atualize a string de conexão com o banco de dados no arquivo `appsettings.json` na pasta `API`.

4. **Rode a API:**
   ```bash
   cd API
   dotnet restore
   dotnet build
   dotnet run

## Configuração do Frontend (Angular 17)

1. **Instale o Node.js e o Angular CLI:**
   - Baixe e instale o [Node.js](https://nodejs.org/en/) v21.6.1.
   - Instale o Angular CLI globalmente:
     ```bash
     npm install -g @angular/cli@17.3.8
     ```

2. **Instale as Dependências:**
   Navegue até a pasta do frontend e instale as dependências do projeto:
   ```bash
   cd UI
   npm install

3. Configure o Ambiente

Edite esses arquivos conforme necessário para garantir que a URL da API corresponda ao local onde sua API está sendo executada. Por exemplo:

**`src/config/environment.ts`**
```typescript
export const environment = {
  apiUrl: 'http://localhost:5000'
};
```

4. Rode o Frontend

- Instale as dependências do projeto:
  ```bash
  npm install
  ```

- Inicie o servidor de desenvolvimento Angular:
  ```bash
  ng serve
  ```

- O frontend estará disponível em [http://localhost:4200](http://localhost:4200).
