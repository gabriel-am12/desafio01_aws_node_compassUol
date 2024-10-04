
## 💻 Como executar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [MySQL](https://www.mysql.com/) (Caso não vá utilizar o Docker)
- [Docker](https://www.docker.com/) 
- [Prisma](https://www.prisma.io/) (instalado globalmente)

1 - Clone o projeto

```bash
  git clone https://github.com/gabriel-am12/desafio01_aws_node_compassUol
```

2 - Vá até o diretório

```bash
  cd compasscar
```

3 - Instale as dependências 

```bash
  npm install
```

4 - Caso opte por usar o Docker

```bash
  docker-compose up --build
```

5 - Configure seu banco de dados no arquivo .env, por exemplo:

```bash
  DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DB_NAME"
```

6 - Crie o banco de dados e execute as migrações 

```bash
  npx prisma migrate dev
```

7 - Inicie o servidor 

```bash
  npm run dev
```