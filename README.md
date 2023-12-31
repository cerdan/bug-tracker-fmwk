# bug-tracker-fmwk
A simple bug tracking software.

Este projeto tem como objetivo implementar progressivamente e de forma didática uma aplicação web inspirada em operações para monitoramento de bugs e suas resoluções (ex.: criação de casos, atualização, atribuição).

O frontend da aplicação foi desenvolvido com Angular e o backend foi simulado pela implementação de uma API Fake, usando o JSON Server.

## Endereço de Deploy - GitHub Pages

https://cerdan.github.io/bug-tracker-fmwk/

## Protótipo

https://www.figma.com/file/nbK2FjAkicUd4ijxTWy3tA

## Vídeo do projeto

https://drive.google.com/file/d/1Z4TdkLJKuEVQJUYW7jQrVbpuhel9x6lx/edit

## Checklist

- [x] Criar o repositório no GitHub com a estrutura do Gitflow, ou seja, branches main e develop.
- [x] Usar componentes de algum framework CSS (Bootstrap, Materialize ou outro)
- [x] Apresentar as telas com layout responsivo usando ou não algum framework CSS.
- [x] Construir páginas web com o conceito de componentes.
- [x] Criar o layout da aplicação com componentes, ou seja, o cabeçalho e rodapé precisam ser componentes.
- [x] Usar pelo menos dois tipos de data-binding (Interpolation, Property Binding, Event Binding e Two Way Data Binding).
- [x] Passar dados via hierarquia de componentes, ou seja, usando @Input ou @Output.
- [x] Mapear componentes à rotas no módulo de rotas.
- [x] Criar navegação entre páginas por meio de rotas.
- [x] Passar dados entre componentes que representam diferentes telas via parâmetros de rotas.
- [x] Validar campos do formulário com REGEX e apresentar os erros.
- [x] Desabilitar o botão de submit enquanto o formulário está inválido.
- [x] Fazer requisições a API com tratamento da resposta com Promises ou Observables.
- [x] Cadastrar uma entidade no JSON Server.
- [x] Apresentar uma lista de dados com a diretiva estrutural ngFor.
- [x] Usar a diretiva ngIf
- [x] Formatar a apresentação de dados com Pipes.
- [x] Build e deploy da aplicação.

# Atividades
## Atividade 08
- [x] Instalar e usar pelo menos um componente de algum framework CSS (Bootstrap, Materialize ou outro).
- [x] Criar o layout da aplicação com componentes, ou seja, o cabeçalho e rodapé precisam ser componentes.
- [x] Usar pelo menos dois tipos de data-binding (Interpolation, Property Binding, Event Binding e Two Way Data Binding).
- [x] Implementar máscaras em campos de formulário, quando necessário, para melhorar a experiência do usuário ao inserir dados.

## Atividade 09
- [x] Mapear componentes à rotas no módulo de rotas.
- [x] Criar navegação entre páginas por meio de link ou botões.
- [x] Passar dados via hierarquia de componentes, ou seja, usando @Input ou @Output.
- [x] Passar dados entre componentes que representam diferentes telas via parâmetros de rotas. 
- [x] Empregar variáveis de template e a anotação ViewChild.

## Atividade 11
- [x] Validar campos do formulário com Expressões Regulares e apresentar os erros.
- [x] Desabilitar o botão de submit enquanto o formulário está inválido.
- [x] Cadastrar uma entidade no Web Storage.

## Atividade 12
- [x] Fazer requisições a API com tratamento da resposta com Promises (pode usar Fetch API, async/await ou lastValueFrom do RXJS).
- [x] Transferir dados, por meio de serviços, entre componentes que não estão diretamente relacionados.
- [x] Cadastrar uma entidade no JSON Server.
- [x] Utilizar o armazenamento local (LocalStorage ou SessionStorage) para armazenar dados temporários.

## Atividade 14
- [x] Build e deploy da aplicação em um servidor remoto

## Atividade 13
- [x] Apresentar uma lista de dados com a diretiva estrutural ngFor.
- [x] Usar a diretiva estrutural ngIf para mostrar ou esconder elementos.
- [x] Formatar a apresentação de dados com Pipes.
- [x] Fazer requisições a API com tratamento da resposta com Observables.

## Projeto Final
- [x] Disponibilização do vídeo mostrando o funcionamento da aplicação.

## Manual de execução
- Clonar o repositório com `git clone`
- Fazer checkout no branch `develop` que contém as modificações mais recentes
- Abrir o projeto no editor Visual Studio Code (VS Code)
- Abrir um terminal pelo VSCode ou qualquer terminal do seu Sistema Operacional apontando para o diretório raiz do projeto 
- Instalar as dependências contidas no `package.json`
  - Comando: `npm i`
- (Opcional) Instalar o JSON Server globalmente disponível em `https://www.npmjs.com/package/json-server`
  - Comando: `npm i -g json-server` 
  - É opcional porque a dependência já vem cadastrada no arquivo `package.json` para instalação local na pasta `node_modules`
- Executar a API Fake (JSON Server) via um dos seguintes comandos: 
  - Execução via script registrado no `package.json`: `npm run json:server:routes` 
  - Ou via Execução explícita: `json-server --watch db.json --routes routes.json`
- O comando para execução do JSON Server deve ser aplicado no diretório raiz do projeto, ou seja, que contém o arquivo `db.json` e `routes.json`.
  - Por padrão, a aplicação JSON Server executa no endereço `localhost:3000`    
- Abrir um novo terminal pelo VSCode e então executar o projeto Angular
  - Comando: `ng s -o`

  
# BugTrackerFmwk

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
