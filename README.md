# Projeto Car Shop

Esse projeto tem como objetivo testar meus conhecimentos em Node.js Express,Mongoose e MongoDB

Nesse projeto foi desenvolvido uma api para o gerenciamento de uma concessionária de veículos. Para isso foi necessário desenvolver um CRUD de carros e um de motos, utilizando o banco de dados NoSQL MongoDB para a persistência dos dados.

# Requisitos para rodar a aplicação

## Local
- node versão 16 lts
- mongoDB

## Docker
- docker
- docker compose

# Antes de usar
1. Clone o repositório
~~~
git clone git@github.com:Leandroswq/Car-Shop.git
~~~

2. Entre na pasta do projeto
Entre na pasta do repositório que você acabou de clonar:
~~~
cd Car-Shop
~~~

3. Se não estiver mude para a branch main
~~~
git checkout main
~~~

4. Se for rodar localmente instale as dependências
~~~
npm install
~~~

# Como rodar a aplicação

<br>

## Local
### 1 - Crie um arquivo .env na raiz do projeto e copie as variáveis de ambiente do arquivo .env.example para ele.  

Lembre-se de atualizar as variáveis de ambiente de acordo com acordo com a sua maquina

<br>

### 2 - Crie o arquivo .env

Adicione nele as variáveis de ambiente, basta colar o conteúdo do arquivo .env.example, e atualize os valores de acordo com as suas configurações
<br>

### 3- Inicie a aplicação

~~~
npm run dev
~~~
<br>

## Docker  

### Na raiz do projeto inicialize o compose

~~~
docker-compose up -d
~~~

Obs: Por padrão o docker inicializa o projeto na porta 3001

<br>

# Como acessar a documentação

### 1 - Inicie aplicação
<br>

### 2 - Acesse o endpoint host/docs
Exemplo
~~~
http://localhost:3001/docs
~~~

# Como testar a aplicação

Teste unitário
~~~
npm run test:unit
~~~

Teste de integração

~~~
npm run integration
~~~