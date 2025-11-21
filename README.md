# Projeto de Estudos – Clean Code e Clean Architecture

Este projeto foi desenvolvido como parte dos estudos realizados a partir do curso **Clean Code e Clean Architecture**, ministrado por **Rodrigo Branas** na plataforma **Branas.io**.

Para saber mais sobre o curso e seus conteúdos:  
https://branas.io

---
## 🧩 Descrição do Projeto

O projeto é composto por **3 Microservices independentes**, executando simultaneamente nas portas:

- **3000**
- **3001**
- **3002**

## Requisitos

- Node.js 
- npm / yarn / pnpm
- Docker & Docker Compose (opcional para execução completa)
- Postgresql (execução sem docker)

## Executando

### Rodar um serviço localmente (com nodemon)
```bash
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

Executar testes configurados no serviço:
```bash
npx jest
```

## Créditos

Curso: Clean Code e Clean Architecture — Rodrigo Branas (Branas.io)

## Licença

Uso acadêmico / estudo — sem finalidade comercial.