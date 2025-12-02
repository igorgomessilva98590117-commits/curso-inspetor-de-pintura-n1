<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Curso Inspetor de Pintura N1

Aplicação web para curso de inspetor de pintura desenvolvida com React, TypeScript e Vite.

## 🚀 Executar Localmente

**Pré-requisitos:** Node.js instalado

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Configurar a chave da API Gemini (opcional):
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione: `GEMINI_API_KEY=sua_chave_aqui`

3. Executar em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acessar: http://localhost:3000

## 📦 Build para Produção

```bash
npm run build
```

## 🌐 Deploy no GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages através de GitHub Actions.

### Configuração Inicial

1. Crie um repositório no GitHub
2. Faça push do código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/curso-inspetor-de-pintura-n1.git
   git push -u origin main
   ```

3. No GitHub, vá em **Settings > Pages**
4. Selecione **Source: GitHub Actions**
5. O deploy será feito automaticamente a cada push na branch `main`

### Deploy Manual

```bash
npm run deploy
```

## 📁 Estrutura do Projeto

- `src/` - Código fonte da aplicação
- `components/` - Componentes React
- `views/` - Páginas/Views da aplicação
- `vite.config.ts` - Configuração do Vite
- `package.json` - Dependências e scripts

## 🛠️ Tecnologias

- React 19
- TypeScript
- Vite
- Lucide React (ícones)
