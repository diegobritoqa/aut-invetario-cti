# Automação E2E — Inventário CTI

Suíte Cypress do sistema **Inventario CTI** (PGE-CE): login, cadastro e edição de atribuições, geração de termos e relatórios.

- Plano: [docs/plano-de-teste.md](docs/plano-de-teste.md)
- Cenários CT000–CT046: [docs/cenarios.md](docs/cenarios.md)
- Melhorias: [docs/melhorias.md](docs/melhorias.md)
- Relatório de execução: [docs/relatorio-execucao.md](docs/relatorio-execucao.md)
- Locators: [docs/locators.md](docs/locators.md)

## Ambiente

| Item | Valor |
|---|---|
| Login | http://testeqa.pge.ce.gov.br/admins/sign_in |
| `baseUrl` | http://testeqa.pge.ce.gov.br |
| Usuário | `qa.teste@teste.pge.ce.gov.br` |
| Senha | `cypress.env.json` local (não versionado) |

Usar **HTTP**. O HTTPS do mesmo host retorna 500. VPN não foi necessária nesta execução.

## Pré-requisitos

- Node.js 18+
- Google Chrome
- Cypress **13.17.0** (fixado no `package.json`)

## Credenciais

```text
cypress.env.example.json  →  cypress.env.json
```

```json
{
  "adminEmail": "qa.teste@teste.pge.ce.gov.br",
  "adminPassword": "SUBSTITUA"
}
```

`cypress.env.json` está no `.gitignore`. Alternativa: `CYPRESS_adminEmail` e `CYPRESS_adminPassword`.

## Como executar

```bash
npm install
npm run cy:login
npm run cy:hu01
npm run cy:hu02
npm run cy:hu03
npm run cy:hu04
npm run cy:hu05
```

Para ver o Chrome durante o teste, use o modo headed:

```bash
npm run cy:login:headed
npm run cy:hu01:headed
npm run cy:hu02:headed
npx cypress run --headed --browser chrome --spec cypress/e2e/hu03-gerar-termos.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/hu04-movimentacao-ativos.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/hu05-atribuicoes-por-area.cy.js
```

`npm run cy:open` abre a interface do Cypress para escolher o spec. `npm run cy:run` executa a suíte inteira sem janela.

Ordem funcional: login, HU01 (cria a massa `QA-AUTO-<timestamp>`), HU02, HU03, HU04 e HU05.

## Stack

Cypress 13.17.0, JavaScript, Chrome, Page Objects e `cy.session` no login válido. Fluxos críticos não usam `cy.intercept`.

## Estrutura

```text
cypress/e2e/
cypress/support/pages/
cypress/support/commands.js
cypress.config.js
cypress.env.example.json
docs/
```
