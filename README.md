# Projeto de Estudos – Clean Code e Clean Architecture

Este projeto foi desenvolvido como parte dos estudos realizados a partir do curso **Clean Code e Clean Architecture**, ministrado por **Rodrigo Branas** na plataforma **Branas.io**.

Para saber mais sobre o curso e seus conteúdos:  
https://branas.io

---
## 🧩 Descrição do Projeto

O projeto é composto por **3 Microservices independentes** e um **Frontend Next.js**, executando simultaneamente nas portas:

- **3000** - Account Service
- **3001** - Payment Service
- **3002** - Ride Service
- **3004** - Frontend Next.js

## Requisitos

- Node.js 
- npm / yarn / pnpm
- Docker & Docker Compose (opcional para execução completa)
- Postgresql (execução sem docker)

## Executando

### Scripts Disponíveis na Raiz do Projeto

O projeto possui scripts centralizados na raiz para facilitar o gerenciamento de todos os serviços:

#### Instalar dependências de todos os serviços
```bash
npm run install:all
```
Instala as dependências dos três microserviços (account, payment, ride) e do frontend em paralelo.

#### Executar todos os serviços em modo desenvolvimento
```bash
npm run dev
# ou
npm start
```
Inicia os três microserviços com `nodemon` e o frontend Next.js na porta **3004** simultaneamente.

#### Executar todos os testes
```bash
npm test
```
Executa os testes de todos os microserviços e do frontend em paralelo.

### Rodar um serviço individualmente

Para executar um microserviço específico, entre na pasta do serviço e execute:
```bash
cd backend/account  # ou payment, ou ride
npx nodemon src/main.ts
```

### Rodar toda a stack com Docker Compose
```bash
docker compose up
```

### Banco de dados
PostgreSQL é usado pelo projeto. Para executar scripts SQL manualmente:
```bash
psql -U <usuario> -d <banco> -f <arquivo.sql>
```

## Testes

### Executar testes de todos os serviços
```bash
npm test
```
Executa os testes de todos os microserviços e do frontend em paralelo.

### Executar testes de um serviço específico
Para executar testes de um microserviço específico, entre na pasta do serviço e execute:
```bash
cd backend/account  # ou payment, ou ride
npx jest
```

## Créditos

Curso: Clean Code e Clean Architecture — Rodrigo Branas (Branas.io)

## Licença

Uso acadêmico / estudo — sem finalidade comercial.