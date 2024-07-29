# Ideas Tracker

![image](https://github.com/user-attachments/assets/350688a8-d924-4d7d-8eb9-2d9c199adc5d)


**Ideas Tracker** é um aplicativo web para gerenciamento de ideias, permitindo aos usuários registrar, visualizar e excluir suas ideias de forma intuitiva. O projeto é desenvolvido usando React e Appwrite, e adota o padrão MVVM (Model-View-ViewModel) para a estrutura do frontend.

## Estrutura do Projeto

A estrutura de pastas do projeto é organizada da seguinte forma:

src\
- lib\
  - context\
    - ideas.jsx       # Contexto para gerenciamento de ideias
    - user.jsx        # Contexto para gerenciamento de usuários
  - appWrite.jsx      # Configuração do cliente Appwrite
- pages\
  - Home.jsx          # Página inicial para exibição das ideias
  - login.jsx         # Página de login
- App.jsx             # Componente principal do aplicativo
- main.jsx            # Ponto de entrada do aplicativo
index.html            # Arquivo HTML principal

## Padrões e Design

### Padrão MVVM

O projeto segue o padrão **MVVM (Model-View-ViewModel)**:

- **Model**: Representa os dados e a lógica de negócios. No contexto deste projeto, os modelos são representados pelos documentos no banco de dados Appwrite.
- **View**: É a interface do usuário, composta pelos componentes React, como `Home.jsx` e `login.jsx`.
- **ViewModel**: Gerencia a comunicação entre a View e o Model, fornecendo dados e lógica para a View. No projeto, isso é gerenciado através dos contextos definidos em `lib/context/`.

### Arquitetura

1. **Componente `App.jsx`**: Componente principal que define a estrutura do aplicativo e a renderização condicional entre as páginas de login e a página inicial.
2. **Provedores de Contexto**:
   - `UserProvider`: Gerencia a autenticação e o estado do usuário.
   - `IdeasProvider`: Gerencia o estado das ideias e interage com o banco de dados.
3. **Configuração do Cliente Appwrite**:
   - `appWrite.jsx`: Configura o cliente Appwrite, incluindo a configuração do endpoint e ID do projeto, e cria instâncias dos serviços `Account` e `Databases`.

## APIs

### Appwrite

O projeto utiliza o **Appwrite** para gerenciamento de usuários e armazenamento de dados. As principais operações realizadas incluem:

- **Autenticação**:
  - `account.createEmailPasswordSession(email, password)`: Cria uma sessão para o usuário.
  - `account.deleteSession("current")`: Remove a sessão do usuário.
  - `account.create(ID.unique(), email, password)`: Registra um novo usuário.

- **Gerenciamento de Dados**:
  - `databases.createDocument()`: Cria um novo documento na coleção de ideias.
  - `databases.deleteDocument()`: Remove um documento da coleção de ideias.
  - `databases.listDocuments()`: Lista documentos da coleção de ideias, com suporte para ordenação e limitação.

## Banco de Dados

O **Appwrite** é utilizado como banco de dados para armazenar e gerenciar ideias dos usuários. A estrutura do banco de dados é configurada com os seguintes IDs:

- **ID do Banco de Dados**: `66a76ca10011f42fd6e8`
- **ID da Coleção de Ideias**: `66a76cc60014ee3981fe`

### Endpoints

- **Endpoint do Appwrite**: `https://cloud.appwrite.io/v1`

## Benefícios de Usar o Appwrite

### 1. **Backend Completo como Serviço**
Appwrite oferece uma solução completa de backend, incluindo autenticação, banco de dados, armazenamento de arquivos, funções em nuvem e muito mais, tudo em um único pacote.

### 2. **Autenticação Segura**
Com suporte para múltiplos métodos de autenticação, incluindo e-mail/senha, OAuth e autenticação anônima, o Appwrite facilita a implementação de segurança robusta em seu aplicativo.

### 3. **APIs Simples e Poderosas**
As APIs do Appwrite são fáceis de usar e bem documentadas, permitindo que você se concentre mais na lógica do seu aplicativo e menos na infraestrutura.

### 4. **Gerenciamento de Dados Eficiente**
Com o Appwrite, você pode criar, ler, atualizar e excluir documentos de forma eficiente, além de realizar consultas complexas com suporte a filtros, ordenação e paginação.

### 5. **Escalabilidade**
Appwrite é projetado para escalar com seu aplicativo, suportando desde pequenos projetos até grandes aplicações com milhões de usuários.

### 6. **Open Source**
Sendo um projeto de código aberto, você tem a liberdade de personalizar e contribuir para o Appwrite, além de se beneficiar de uma comunidade ativa e colaborativa.

## Como Executar o Projeto

1. **Instalar Dependências**: Execute `npm install` para instalar todas as dependências do projeto.
2. **Iniciar o Servidor de Desenvolvimento**: Execute `npm start` para iniciar o servidor de desenvolvimento e abrir o aplicativo em seu navegador.
---
