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

## CI/CD

No arquivo localizado em **`.github/workflows/ci-cd.yml`** esta configurado um CI/CD básico onde é executado o build de ambos, e os testes do backend.

## Decisões de Arquitetura e Padrões Utilizados

### Backend

### Padrões Utilizados no Backend

O backend foi estruturado utilizando alguns dos padrões de projetos que mais atuei ao longo da minha carreira, vou mencionar os utilizados nesse projeto:

   #### 1. **Domain-Driven Design (DDD)**
   - O projeto está estruturado seguindo os princípios do DDD, dividindo a aplicação em camadas bem definidas, cada uma com suas responsabilidades.
   - **Exemplos:** `Fauno.API`, `Fauno.CrossCutting`, `Fauno.Domain`, `Fauno.Infrastructure`, `Fauno.Service`.
   
   #### 2. **Repository Pattern**
   - Utilização do padrão Repositório para abstrair a lógica de acesso a dados, proporcionando uma camada de abstração entre a aplicação e a fonte de dados.
   - **Exemplos:** Classes que terminam com 'Repository' no projeto `Fauno.Infrastructure`.
   
   #### 3. **Unit of Work Pattern**
   - Implementação do padrão Unidade de Trabalho para gerenciar transações e manter a integridade do banco de dados ao executar operações múltiplas.
   - **Exemplos:** Classe `UnitOfWork` no projeto `Fauno.Infrastructure`.
   
   #### 4. **Dependency Injection**
   - Uso de injeção de dependência para gerenciar as dependências entre diferentes partes da aplicação.
   - **Exemplos:** Injeção de serviços nos construtures.
   
   #### 5. **Entity Framework (EF)**
   - Utilização do Entity Framework como ORM para mapear classes de domínio para tabelas no banco de dados, facilitando operações CRUD.
   - **Exemplos:** Configurações de contexto e mapeamentos no projeto `Fauno.Infrastructure`.
   
   #### 6. **DTOs (Data Transfer Objects)**
   - Uso de DTOs para transferir dados entre as camadas da aplicação, garantindo que apenas os dados necessários sejam expostos.
   - **Exemplos:** Classes no projeto `Fauno.CrossCutting`.
   
   #### 7. **AutoMapper**
   - Utilização do AutoMapper para mapear automaticamente entre entidades e DTOs, simplificando a conversão de objetos.
   - **Exemplos:** Configurações de mapeamento no projeto `Fauno.Service`.
   
   #### 8. **JWT (JSON Web Token)**
   - Implementação de autenticação e autorização baseada em tokens JWT para proteger as APIs e garantir que apenas usuários autenticados possam acessar certos endpoints.
   - **Exemplos:** Middleware de autenticação e validação de tokens no projeto `Fauno.API`.
   
   #### 9. **Middleware**
   - Utilização de middleware para interceptar e processar requisições HTTP antes que elas alcancem os controladores.
   - **Exemplos:** Middleware para tratamento de exceções e autenticação encontrado em `Fauno.API`.
   
   #### 10. **SOLID Principles**
   - Adoção dos princípios SOLID para garantir que o código seja bem estruturado, modular e fácil de manter.

### Explicação das camadas do backend
   
   #### Fauno.API
   - É o projeto padrão de inicialização, sendo o primeiro a receber requisições RESTful. Os controllers são definidos aqui. Por ser responsável por receber as requisições, a validação de token JWT é executada aqui.
   
   #### Fauno.CrossCutting
   - Todos os demais projetos referenciam este. O objetivo é armazenar DTOs (Data Transfer Objects). Esses DTOs são usados para criar classes contendo apenas as propriedades necessárias para cada utilização (ex: um controller costuma devolver o resultado em um JSON contendo apenas o que será útil a quem o consumir).
   
   #### Fauno.Domain
   - O objetivo é armazenar classes que representam entidades do banco de dados. As tabelas do SQL Server são mapeadas em classes com propriedades e relacionamentos aqui.
   
   #### Fauno.Infrastructure
   - Esta camada realiza a comunicação com a base de dados. Utilizamos o ORM Entity Framework junto com UnitOfWork e Repository. Nosso Contexto, junto com UnitOfWork (Singleton que garante uma instância única com acesso aos repositórios do contexto) e o Repository (classe que centraliza métodos de acesso, filtragem e manutenção aplicados na base de dados).
   
   #### Fauno.Service
   - Aqui é onde a mágica do DDD acontece. A centralização de toda regra de negócio em uma camada exclusiva. Normalmente é chamada pela camada de API e tem a responsabilidade de processar a regra e devolver um resultado esperado, ou um erro caso a regra quebre. Para facilitar a conversão de tipos, foi adicionada a biblioteca AutoMapper, que simplifica tanto o entendimento do código quanto a conversão de tipos.
   
   #### Fauno.Tests
   - Responsável por realizar testes dos principais métodos, utilizando a biblioteca **xUnit**. Neste projeto, os testes se concentram no **Fauno.Service**, garantindo a integridade das regras de negócio.
   
### Padrões Utilizados no Frontend

A estrutura do frontend foi pensada de maneira que facilite a navegação e manutenção do código, assegurando que cada parte da aplicação tenha sua responsabilidade definida.
Foram utilizadas algumas das novidades com o uso do angular 17, assim como tratamento de lazyloading, rxjs, novos signals (@if, @else, @for, @empty, @defer).
Segue alguns dos padrões utilizados neste projeto:

   #### 1. **Component-Based Architecture**
   - Cada parte da interface do usuário é dividida em componentes independentes que podem ser reutilizados em diferentes partes da aplicação.
   - **Exemplos:** Componentes como `category.component.ts`, `product.component.ts`, e outros componentes na pasta `components`.
   
   #### 2. **Service Pattern**
   - Serviços são usados para encapsular lógica de negócios e lógica de comunicação com a API, tornando os componentes mais limpos e focados apenas na interface do usuário.
   - **Exemplos:** `login.service.ts`, `product.service.ts`.
   
   #### 3. **State Management**
   - Responsável pelo gerenciamento de estado global, possibilitando ter uma única fonte de informação de modo que seja confiável e acessível dentro dos componentes.
   - **Exemplos:** `category-state-service.ts`, `loading-state-service.ts`, `product-state-service.ts`.
   
   #### 4. **Dependency Injection**
   - A injeção de dependencia nesse projeto foram realizadas de 2 maneiras, a primeira injetando direto na propriedade **`imports`** na definição de cada componente, e também em alguns casos (principalmente com services e store), são injetados com o **`inject`** do @angular/core, onde basta apenas realizar a chamada do método inject, sem necessidade de declarar no construtor.
   - **Exemplos:** Injeção de serviços nos componentes e outros serviços.
   
   #### 5. **Reactive Programming**
   - Utilização de Observables do RxJS para lidar com operações assíncronas e eventos.
   - **Exemplos:** Métodos nos serviços que retornam `Observable` e utilizam operadores como `pipe`, `map`, `catchError`.
   
   #### 6. **Environment Configuration**
   - Separar a configuração do ambiente, como URLs de API, em arquivos específicos para facilitar a gestão de diferentes ambientes (desenvolvimento, produção, etc.).
   - **Exemplos:** `environment.ts` na pasta `config`.
   
   #### 7. **Guards**
   - Utilização de guards para proteger rotas e verificar permissões antes de permitir o acesso a determinadas partes da aplicação.
   - **Exemplos:** `auth.guard.ts`.
   
   #### 8. **Interceptors**
   - Utilização de interceptors para modificar ou inspecionar requisições HTTP antes que elas sejam enviadas e respostas HTTP antes que elas sejam processadas pelo restante da aplicação.
   - **Exemplos:** `http-base-url.interceptor.ts`.
   
   #### 9. **Styling Conventions**
   - Utilização de arquivos SASS para gerenciamento de estilos, incluindo variáveis globais para cores, tamanhos, etc.
   - **Exemplos:** `variables.scss`.
   
   #### 10. **Lazy Loading (Potencialmente)**
   - Foi criado uma demonstração da potência do lazyloading que veio com o angular17 através dos signals @defer.
   - **Exemplos:** `product.component.html`.
   
   #### 11. **Async Pipe**
   - Uso do pipe `async` em templates para assinar observáveis diretamente no HTML, simplificando o código e evitando a necessidade de subscrição manual.
   - **Exemplos:** `categories$ | async`.

Abaixo se encontra uma explicação de cada diretório:
   
   #### app
   - Contém os módulos principais e a configuração inicial da aplicação.
   
   #### assets
   - Contém arquivos estáticos, como imagens e outros recursos que não são processados pelo Angular.
   
   #### components
   - Agrupa todos os componentes reutilizáveis da aplicação.
   
   #### config
   - Contém arquivo de configuração para rodar a aplicação.
   
   #### pages
   - Contém os componentes das páginas da aplicação, cada página representando uma rota diferente.
   
   #### services
   - Agrupa todos os serviços da aplicação, responsáveis por fazer a comunicação com a API e gerenciar dados.
   
   #### store
   - Contém serviços que gerenciam o estado global da aplicação utilizando do rxjs com o BehaviorSubject.
   
   #### styles
   - Contém arquivos de estilos globais da aplicação.
   
   #### types
   - Contém as definições de types utilizadas na aplicação.
   
   #### utils
   - Contém arquivos com funcionalidades úteis a aplicação.



