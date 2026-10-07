# Automação E2E — Inventário CTI

Suíte Cypress (planejada) para o sistema **Inventario CTI** da PGE-CE.  
Documentação de teste + **implementação inicial** (login Cypress CT000/CT045/CT046).

- Plano: [docs/plano-de-teste.md](docs/plano-de-teste.md)
- Cenários CT000–CT046: [docs/cenarios.md](docs/cenarios.md)
- Achados e melhorias: [docs/melhorias.md](docs/melhorias.md)
- Relatório (template): [docs/relatorio-execucao.md](docs/relatorio-execucao.md)
- Evidências: [docs/evidencias/](docs/evidencias/)
- Locators: [docs/locators.md](docs/locators.md)

## Ambiente

| Item | Valor |
|---|---|
| Login | http://testeqa.pge.ce.gov.br/admins/sign_in |
| `baseUrl` | http://testeqa.pge.ce.gov.br |
| Usuário | `qa.teste@teste.pge.ce.gov.br` |
| Senha | variável de ambiente / `cypress.env.json` local (**nunca** no Git) |

HTTPS do mesmo host pode retornar 500; usar **HTTP**. VPN não foi necessária no ambiente do executor (revalidar se a rede mudar).

## Pré-requisitos

- Node.js 18+
- Google Chrome
- Cypress **13.17.0** fixado no `package.json` (Cypress 16+ exige Node 22+ e remove `Cypress.env()`)

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

## Comandos

```bash
npm install
npm run cy:open         # UI do Cypress (lista de specs) + Chrome ao clicar no teste
npm run cy:login:headed # Chrome visível, sem UI do Cypress (melhor se cy:open ficar branco)
npm run cy:run          # headless (sem janela)
npm run cy:login        # só login, headless
```

### Ver o navegador durante o teste

1. **Recomendado se você está aprendendo:** `npm run cy:login:headed` — abre o **Chrome** e executa o login; você vê cada passo. Não usa a janela do Cypress.
2. **`npm run cy:open`** — abre o app **Cypress** (Electron). Clique em **`login.cy.js`** na lista; só então o Chrome abre. O script já usa `--e2e` (pula a tela inicial).
3. **`npm run cy:login`** / **`cy:run`** — **headless** (sem janela visível).

### Janela do Cypress em branco / `bad IPC message`

No terminal pode aparecer `Terminating renderer for bad IPC message` — bug comum do **Electron** (UI do Cypress) no Windows, often GPU.

Tente, nesta ordem:

```powershell
npm run cy:open
```

(o script já desativa GPU com `ELECTRON_EXTRA_LAUNCH_ARGS=--disable-gpu`)

Se continuar branco, use **`npm run cy:login:headed`** para ver o teste no Chrome mesmo assim.

Outras dicas: fechar outras instâncias do Cypress; atualizar driver de vídeo; não rodar como Administrador se der conflito.

### Erro `Cypress.env() was removed` (Cypress 16)

Se o `npm install` instalou Cypress 16, rode de novo `npm install` neste repo (versão fixada em **13.17.0**) e confira com `npx cypress version`.

### Erro `Cypress executable not found` / `Please reinstall Cypress`

O pacote npm existe, mas o **programa Cypress** (~200 MB) ainda não foi baixado. Na pasta do projeto:

```powershell
npx cypress install
npx cypress verify
npm run cy:open
```

O `postinstall` no `package.json` roda `cypress install` após cada `npm install`; se falhar (rede/antivírus), execute `npx cypress install` manualmente.

Ordem funcional: login → HU01 (cria `QA-AUTO-<timestamp>`) → HU02 → HU03 → HU04 / HU05.

## Stack planejada

Cypress 13+, JavaScript, Chrome, Page Objects, `cy.session` no login válido, `pdf-parse` para termos/relatórios. Sem `cy.intercept` em fluxo crítico, exceto fallback de download de PDF.

## Evidências

| Tipo | Onde |
|---|---|
| Prints da matriz | `docs/evidencias/` |
| Relatório preenchido | `docs/relatorio-execucao.md` |
| Vídeo / screenshot de falha | `cypress/videos/`, `cypress/screenshots/` (gitignore) |

## Pós-login (assert CT000)

URL: `/` — textos `ATRIBUIÇÕES` e `ATRIBUIÇÕES SEM USUÁRIO`.

## Estrutura

```text
cypress/e2e/login.cy.js
cypress/support/pages/
docs/locators.md
cypress.config.js
cypress.env.example.json
```
