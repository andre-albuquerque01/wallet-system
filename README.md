# wallet-system

## Requisitos do Sistema

Para operar o sistema, são necessários os seguintes requisitos mínimos na sua máquina: PHP, Composer, Node.js e Docker. O PHP e o Composer são essenciais para executar o Laravel, que contém a API principal do sistema. O Node.js é necessário para executar o front-end, enquanto o Docker é utilizado para virtualizar o ambiente no qual a API é executada. Estes componentes garantem a funcionalidade e o desempenho ideais do nosso sistema de forma integrada e eficiente.

## Requisitos Funcionais

- Deve ser possível que o usuário se cadastre;
- Deve ser possível que o usuário se autentique;
- Deve ser possível que o usuário obtenha o perfil de um usuário logado;
- Deve ser possível que o usuário acesse o histórico de transação;
- Deve ser possível que o usuário deposite, credita e tranfira.

## Regras de Negócio

- O usuário não deve se cadastrar com um e-mail duplicado;

## Requisitos Não Funcionais

- A senha do usuário precisa estar criptografada;
- Os dados da aplicação precisam estar persistidos em um banco de dados;
- O usuário deve ser identificado por um JWT.

## Arquitetura do Sistema

O sistema utiliza as seguintes tecnologias:

- **Linguagens:** PHP, TypeScript
- **Banco de Dados:** MySQL
- **Frameworks:** Laravel, Next.js
- **Arquitetura da API:** MVC, RESTful
- **Outras Tecnologias:** React, Docker

### Observação

- O sistema utiliza filas (queues) no Laravel para enviar e-mails de forma assíncrona, funcionando em segundo plano.

