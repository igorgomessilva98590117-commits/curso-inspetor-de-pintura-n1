# 🚀 Guia de Deploy no GitHub Pages

## ✅ O que já foi configurado:

- ✅ Repositório Git inicializado
- ✅ Workflow do GitHub Actions criado (`.github/workflows/deploy.yml`)
- ✅ Configuração do Vite para GitHub Pages
- ✅ README atualizado
- ✅ .gitignore configurado

## 📝 Próximos Passos:

### 1. Configurar sua identidade no Git

Execute os comandos abaixo substituindo com suas informações:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

**OU** configure apenas para este repositório:

```bash
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"
```

### 2. Fazer o commit inicial

```bash
git add .
git commit -m "Initial commit: Curso Inspetor de Pintura N1"
```

### 3. Criar repositório no GitHub

1. Acesse https://github.com/new
2. Crie um novo repositório (ex: `curso-inspetor-de-pintura-n1`)
3. **NÃO** inicialize com README, .gitignore ou license (já temos)

### 4. Conectar e fazer push

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/curso-inspetor-de-pintura-n1.git
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### 5. Ativar GitHub Pages

1. No GitHub, vá em **Settings** do repositório
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Salve

### 6. Deploy Automático

A partir de agora, **toda vez que você fizer push na branch `main`**, o GitHub Actions irá:
- Instalar dependências
- Fazer build do projeto
- Fazer deploy automaticamente no GitHub Pages

O site estará disponível em:
`https://SEU_USUARIO.github.io/curso-inspetor-de-pintura-n1/`

## 🔄 Atualizar o site

Sempre que fizer alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

O deploy será feito automaticamente em alguns minutos!

## 📌 Notas Importantes

- O workflow está configurado para fazer deploy apenas da branch `main`
- O build é feito automaticamente pelo GitHub Actions
- Não é necessário fazer `npm run build` localmente antes do push
- O site será atualizado automaticamente após cada push

## 🐛 Troubleshooting

Se o deploy não funcionar:
1. Verifique se o GitHub Pages está ativado (Settings > Pages)
2. Verifique se o workflow foi executado (Actions tab)
3. Verifique os logs do workflow para erros

