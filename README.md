<h1 align="center"> :love_hotel: Helper API </h1>
<h3 align="center">
  :construction: Em construção :construction:
</h3>

---

## :construction_worker: Pré-requisitos

- [NodeJS(Preferencialmente a versão 12.18)](https://nodejs.org/en/)
- [Docker e Docker compose](https://www.docker.com/)
- **[Yarn (opcional)](https://classic.yarnpkg.com/en/docs/install/)**

## :clipboard: Executando o projeto

```bash
# Clone este repositório
$ git clone <https://github.com/pedrooV2/helper-api.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd helper-api

# Crie um arquivo .env seguindo como modelo o arquivo .env.example
# Preencha o arquivo de acordo com suas configurações locais
$ cp .env.example .env # Unix
$ copy .env.example .env # Windows

# Instalar as dependências
$ yarn # com yarn
$ npm install # com npm

# Iniciando os containers
$ docker-compose up -d

# Iniciando o servidor
$ yarn dev # com yarn
$ npm run dev # com npm

#Por padrão o servidor irá iniciar na porta:3333 - acesse <http://localhost:8000>
```

## :hammer_and_wrench: Tecnologias utilizadas

- [NodeJS](https://nodejs.org/en/)
- [Docker e Docker compose](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Sequelize](https://sequelize.org/)

---

### :construction_worker: Feito por:

<table>
  <tr>
    <td align="center"><a href="https://github.com/gaoliveira21"><img style="border-radius: 50%;" src="https://github.com/gaoliveira21/randpic/blob/master/.github/gabriel.jpg" width="100px;" alt=""/><br /><sub><b>Gabriel Oliveira</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/pedrooV2"><img style="border-radius: 50%;" src="https://github.com/gaoliveira21/randpic/blob/master/.github/pedro.jpg" width="100px;" alt=""/><br /><sub><b>Pedro Lucas</b></sub></a><br /></td>
  </tr>
</table>

### :memo: License
Esse projeto está sob MIT license. Veja [LICENSE](https://github.com/pedrooV2/helper-api/blob/master/LICENSE) para mais informações.

---
