# Gerenciamento de Empresas

Sistema de gerenciamento de empresas com funcionalidades CRUD e suporte a operações offline.

![image](https://github.com/user-attachments/assets/4f9bcef2-3cee-476e-a0ee-f06da92f048e)


## 📋 Sobre o Projeto
Sistema desenvolvido com Node.js e React que permite o gerenciamento completo de empresas, com suporte a operações offline e sincronização automática.

## 🚀 Funcionalidades

- Cadastro, edição, listagem e exclusão de empresas
- Validação de CNPJ
- Formatação automática de CNPJ e telefone
- Persistência local (funcionamento offline)
- Sincronização automática quando online
- Indicador de status online/offline

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- UUID

### Frontend
- React
- LocalStorage API
- CSS3

## 🔧 Instalação e Configuração

### Backend

1. Instalar dependências:
Dentro do cmd ou terminal, navegue até a pasta backend e execute o comando:
cd backend
npm install

2. Iniciar o servidor:
Dentro do cmd ou terminal, navegue até a pasta backend e execute o comando:
cd backend
npm install
npm run dev

O servidor estará rodando em `http://localhost:3333`

### Frontend

1. Instalar dependências:
Dentro do cmd ou terminal, navegue até a pasta frontend e execute o comando:
cd frontend
npm install

2. Iniciar o aplicativo:
Dentro do cmd ou terminal, navegue até a pasta frontend e execute o comando:
cd frontend
npm start

A aplicação estará disponível em `http://localhost:3000`

## 📡 API Endpoints

### Companies

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /companies | Lista todas as empresas |
| GET | /companies/:id | Retorna uma empresa específica |
| POST | /companies | Cria uma nova empresa |
| PUT | /companies/:id | Atualiza uma empresa |
| DELETE | /companies/:id | Remove uma empresa |

### Formato dos Dados

typescript
interface Company {
id: string;
name: string;
cnpj: string;
address: string;
phone: string;
createdAt: Date;
updatedAt: Date;
}

## 💾 Armazenamento Local

O sistema utiliza localStorage para:
- Persistir dados offline
- Manter estado de sincronização
- Gerenciar operações pendentes

## 🔄 Sincronização

O sistema automaticamente:
- Detecta estado online/offline
- Sincroniza operações pendentes quando online
- Mantém indicador de status de sincronização

## 🧪 Validações

- CNPJ: formato e dígitos verificadores
- Campos obrigatórios: nome, CNPJ, endereço e telefone
- Formatação automática de CNPJ e telefone

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.



