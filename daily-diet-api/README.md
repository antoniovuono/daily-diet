## Daily Diet

Back-end do daily-diet.

## Instruções

Para rodar esse aplicativo em ambiente local, clone ele na sua máquina e siga os passos abaixo.

_obs: Estou considerando que você usa o `yarn` como gerenciador de pacotes._

### Instalação das dependências

Rode o comando para instalar as depêndencias do projeto.

_obs: não se esqueça de criar as variáveis de ambiente conforme sugero os arquivos `.env.example` e `.env.example.test`._

```zh
yarn
```

## Criando banco de dados

Rode o comando para executar as migrations e criar o banco de dados.

```zh
yarn knex migrate:latest
```

### Rodando em ambiente local

Para iniciar o servidor.

```zh
yarn dev
```
