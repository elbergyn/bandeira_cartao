# Bandeira do Cartão – Identificador de Bandeira

Projeto de estudo DIO

## Descrição

Aplicação Node.js/Express com uma API para identificar a bandeira de um cartão de crédito a partir do número informado. Possui interface web moderna (HTML/CSS/JS) que mostra a bandeira e um cartão fictício estilizado, exibindo a logo oficial da bandeira conforme o usuário digita.

## Funcionalidades

- API Express (POST /bandeira) identifica a bandeira do cartão pelos primeiros dígitos.
- Suporte a Visa, MasterCard, American Express, Elo, Hipercard, Discover.
- Interface web responsiva e centralizada.
- Cartão fictício estilizado com número formatado em tempo real e logo da bandeira.
- Consulta automática: resultado exibido conforme o usuário digita, sem botão.
- Logos oficiais das bandeiras exibidas via link externo.

## Como executar

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Inicie o servidor:

   ```sh
   node express.js
   ```

3. Acesse a interface web em: [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

- `express.js` – Servidor Express principal
- `src/index.html` – Interface web
- `src/funcoes.js` – Lógica JS da interface
- `package.json` – Dependências do projeto

## Exemplo de Uso

Digite o número do cartão na interface. O sistema identifica e exibe a bandeira e a logo correspondente automaticamente.

---

Projeto para fins didáticos. Não utilize para processar dados reais de cartões.
