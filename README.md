# Automação E2E — Inventário CTI

Suíte Cypress (planejada) para o sistema **Inventario CTI** da PGE-CE.  
Este repositório, nesta fase, contém **documentação de teste**. Specs e `package.json` entram na fase de implementação.

- Plano: [docs/plano-de-teste.md](docs/plano-de-teste.md)
- Cenários CT000–CT046: [docs/cenarios.md](docs/cenarios.md)
- Achados e melhorias: [docs/melhorias.md](docs/melhorias.md)
- Relatório (template): [docs/relatorio-execucao.md](docs/relatorio-execucao.md)
- Evidências: [docs/evidencias/](docs/evidencias/)

## Ambiente

| Item | Valor |
|---|---|
| Login | http://testeqa.pge.ce.gov.br/admins/sign_in |
| `baseUrl` | http://testeqa.pge.ce.gov.br |
| Usuário | `qa.teste@teste.pge.ce.gov.br` |
| Senha | variável de ambiente / `cypress.env.json` local (**nunca** no Git) |

O host pode exigir **VPN** (`sslvpn.pge.ce.gov.br`). HTTPS do mesmo host chegou a retornar 500; usar HTTP.

## Pré-requisitos (fase de implementação)

- Node.js 18+
- Google Chrome
- VPN PGE, se o host não resolver na sua rede
- Cypress 13+ (a instalar com o projeto)

## Credenciais (previsto)

1. Copiar o arquivo de exemplo (será criado na implementação):

```text
cypress.env.example.json  →  cypress.env.json
```

2. Preencher localmente:

```json
{
  "adminEmail": "qa.teste@teste.pge.ce.gov.br",
  "adminPassword": "SUBSTITUA"
}
```

3. Garantir `cypress.env.json` no `.gitignore`.

Alternativa: `CYPRESS_adminEmail` e `CYPRESS_adminPassword`.

## Locators de login (confirmados)

- E-mail: `#admin_email`
- Senha: `#admin_password`
- Formulário: `#new_admin`
- Entrar (observado): `#new_admin > div:nth-child(5) > input`
- Entrar (preferido): `#new_admin input[type="submit"]`

## Comandos previstos (ainda não aplicáveis)

```bash
npx cypress open --browser chrome
npx cypress run --browser chrome
```

Ordem funcional: login → HU01 (cria `QA-AUTO-<timestamp>`) → HU02 → HU03 → HU04 / HU05.

## Stack planejada

Cypress 13+, JavaScript, Chrome, Page Objects, `cy.session` no login válido, `pdf-parse` para termos/relatórios. Sem `cy.intercept` em fluxo crítico, exceto fallback de download de PDF.

## Evidências

| Tipo | Onde |
|---|---|
| Prints da matriz | `docs/evidencias/` |
| Relatório preenchido | `docs/relatorio-execucao.md` |
| Vídeo / screenshot de falha | `cypress/videos/`, `cypress/screenshots/` (gitignore) |

## Estrutura proposta (futura)

```text
cypress/e2e/            # um spec por HU + login
cypress/support/pages/
docs/
cypress.config.js
cypress.env.example.json
README.md
```
