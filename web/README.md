# Frontend - instalação e dicas

## Criar projeto em react com todas as dependências necessárias
Executar a seguinte linha de comando no terminal:

`$ yarn create react-app web`

ou

`$ npx create react-app web`

### Configurações iniciais do projeto gerado:
1. Remover os seguintes arquivos da pasta `src`:
   - App.css
   - App.test.js
   - logo.svg
   - serviceWorker.js
   - setupTests.js

2. Editar os arquivos `App.js` e `index.js`, removendo as linhas que referenciam os arquivos removidos anteriormente.
