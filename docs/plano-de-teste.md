# Plano de teste — Inventário CTI

**Sistema:** Inventario CTI (PGE-CE)  
**Tipo:** Automação E2E de interface (Cypress)  
**Fase atual:** Implementação em andamento — login automatizado (CT000/CT045/CT046); ver [locators.md](locators.md)  
**Ambiente:** `http://testeqa.pge.ce.gov.br`  
**Login:** `http://testeqa.pge.ce.gov.br/admins/sign_in`

---

## 1. Escopo

### 1.1 Em escopo

| Módulo | Histórias | Objetivo |
|---|---|---|
| Autenticação | Login admin | Sessão válida e negativos bloqueantes |
| Atribuições | HU01 Cadastro | Nova atribuição, ativos, regras de formulário |
| Atribuições | HU02 Edição | Carga de campos, ativos, defeito, substituição |
| Termos | HU03 Geração de termos | Modal, tipos exclusivos, conteúdo de PDF |
| Relatórios | HU04 Movimentação de ativos | Filtros, grade, PDF, vazio |
| Relatórios | HU05 Atribuições por área | Tela **distinta** de HU04 (enunciado duplicado) |

### 1.2 Fora de escopo (seletiva)

- Cadastro mestre completo de áreas, subáreas, colaboradores e ativos (usa-se massa já existente).
- Testes de API isolados, contrato, carga, performance e stress.
- Auditoria de acessibilidade completa (WCAG).
- Segurança ofensiva (injeção, força bruta, bypass de sessão).
- Módulos da aplicação não citados nas HUs.
- Substituição de fluxos críticos de UI por `cy.intercept` (exceto fallback de download de PDF).

---

## 2. Técnicas de teste

| Técnica | Onde se aplica |
|---|---|
| Caixa-preta / E2E de interface | Todas as HUs |
| Particionamento de equivalência | Modalidade, SO, tipo de termo, filtros de área |
| Análise de valor limite | Datas de período (`dd/mm/aaaa`, invertido, inválido) |
| Tabela de decisão | Pacote Office (checkbox × campo); colaborador × subárea sem colaborador; tipos de termo |
| Transição de estado | Ativo atribuído → COM DEFEITO / DISPONIVEL → remover → adicionar |
| Teste negativo | Obrigatórios, cancelar, sem seleção, login inválido |
| Smoke (P0) | Happy path + um negativo bloqueante por HU |

---

## 3. Critérios de entrada e saída

### 3.1 Entrada (prontidão para executar)

- Rede com acesso a `testeqa.pge.ce.gov.br` (VPN **não** obrigatória no ambiente validado pelo executor).
- Host `testeqa.pge.ce.gov.br` acessível via **HTTP** (HTTPS neste ambiente retornou 500 na verificação do agente).
- Node.js 18+ e Chrome instalados (fase de implementação).
- `cypress.env.json` local com e-mail e senha (não versionado).
- Massa mínima disponível no ambiente compartilhado:
  - ao menos uma Área e Subárea válidas;
  - um colaborador;
  - ativos com status DISPONIVEL;
  - caminho para status COM DEFEITO (HU02).
- Convenção de rastreio: observações com prefixo `QA-AUTO-<timestamp>`.

### 3.2 Saída (encerramento da execução)

- Cenários P0 executados: passaram **ou** falha classificada (defeito de produto vs falha de teste vs ambiente).
- [docs/relatorio-execucao.md](relatorio-execucao.md) preenchido.
- Evidências em [docs/evidencias/](evidencias/) e artefatos Cypress (`screenshots`, `videos`).
- PDFs gerados validados (quando aplicável) e **não** commitados se contiverem CPF.

---

## 4. Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| VPN / rede interna | Impede execução | Documentar; executar na máquina com VPN |
| HTTPS 500 vs HTTP OK | Cypress apontando `https` quebra o run | `baseUrl` HTTP; não forçar SSL |
| Ambiente compartilhado | Massa alterada por outros usuários | Prefixo `QA-AUTO-`; não excluir dados alheios; buscar pela observação |
| PDF em nova aba | Cypress perde o contexto | `cy.window` / stub de `window.open` só como fallback; `pdf-parse` |
| Seletores frágeis (`nth-child`, textos) | Flake | Page Objects; ids quando existirem; `data-cy` sugerido ao produto |
| Período de relatório ambíguo | Falso negativo | Confirmar inclusividade na UI; casos P2 |
| HU05 = HU04 no enunciado | Asserções erradas | Tratar telas distintas; colunas HU05 `[CONFIRMAR NA UI]` |
| Certificado associado à VPN | Browser rejeita TLS | Preferir HTTP do ambiente de teste |
| Timing de app legado | Timeout | `defaultCommandTimeout` elevado |

**Limitação do agente (pesquisa):** o fetch HTTP da tela de login retornou o texto “Inventario CTI / Bem-vindo!”. O navegador automatizado do agente permaneceu em `about:blank`. Telas autenticadas não foram mapeadas automaticamente.

---

## 5. Estratégia de dados e ordem de execução

### 5.1 Dados

- **Usuário:** `qa.teste@teste.pge.ce.gov.br` via variável de ambiente (`adminEmail` / `adminPassword`) ou `cypress.env.json`.
- **Senha:** nunca no Git. Versionar apenas `cypress.env.example.json` sem valores reais.
- **Isolamento:** `QA-AUTO-<timestamp>` no campo Observações da atribuição. Specs posteriores localizam o registro por esse texto.
- **Ativos:** preferir tombos DISPONIVEL dedicados à automação, se existirem; senão, o primeiro disponível da lista `[CONFIRMAR NA UI]`.
- **CPF (HU03):** valor de teste controlado (não usar CPF de terceiros em evidências públicas).

### 5.2 Ordem

```
CT000 (login / sessão)
  → HU01 cria atribuição QA-AUTO-*
    → HU02 edita a mesma atribuição
      → HU03 gera termo da mesma seleção
        → HU04 / HU05 usam área e período da massa criada
```

Login inválido (CT045, CT046) roda **sem** `cy.session` reutilizada da sessão válida, para não contaminar cookies.

---

## 6. Ferramentas e configurações Cypress (planejadas)

| Item | Valor planejado |
|---|---|
| Cypress | 13+ |
| Linguagem | JavaScript |
| Browser | Chrome |
| Padrão | Page Objects em `cypress/support/pages/` |
| Sessão | `cy.session` no comando de login válido |
| PDF | `pdf-parse` (ou equivalente) |
| `baseUrl` | `http://testeqa.pge.ce.gov.br` |
| Vídeo | `video: true` |
| Print em falha | `screenshotOnRunFailure: true` |
| Viewport | desktop (ex.: 1280×720) |
| Timeout | elevado (app legado) |
| `chromeWebSecurity` | avaliar somente se PDF/origem cruzada exigir |
| `cy.intercept` | **não** nos fluxos críticos; fallback de download de PDF |

### 6.1 Locators confirmados (login)

| Elemento | Locator | Nota |
|---|---|---|
| Formulário | `#new_admin` | Devise (Rails) |
| E-mail | `#admin_email` | Estável (id) |
| Senha | `#admin_password` | Estável (id) |
| Entrar (observado) | `#new_admin > div:nth-child(5) > input` | Frágil; registrar na evidência de mapeamento |
| Entrar (preferido na implementação) | `#new_admin input[type="submit"]` | Usado em `LoginPage` |
| Toast inválido | `Email ou senha inválidos.` | CT045/CT046 |
| Pós-login | URL `/`; textos `ATRIBUIÇÕES`, `ATRIBUIÇÕES SEM USUÁRIO` | CT000 |

Sidebar, Gerar Termos e exemplo de Editar: [locators.md](locators.md). Demais campos de formulário HU01–HU05: `[CONFIRMAR NA UI]`.

### 6.2 Estrutura de repositório (implementação parcial)

```
cypress/e2e/                          # um spec por HU + login
cypress/support/pages/
cypress/support/commands.js           # loginViaUi + cy.session
cypress/support/utils/pdf.js
cypress.config.js
cypress.env.example.json
docs/
  plano-de-teste.md
  cenarios.md
  melhorias.md
  relatorio-execucao.md
  evidencias/
README.md
```

Specs previstos: `login.cy.js`, `hu01-cadastro-atribuicoes.cy.js`, `hu02-editar-atribuicoes.cy.js`, `hu03-gerar-termos.cy.js`, `hu04-relatorio-movimentacao.cy.js`, `hu05-relatorio-atribuicoes-area.cy.js`.

Page Objects previstos: `LoginPage`, `AtribuicoesPage`, `NovaAtribuicaoPage`, `EditarAtribuicaoPage`, `GerarTermosPage`, `RelatorioMovimentacaoPage`, `RelatorioAtribuicoesAreaPage`.

---

## 7. Estratégia de evidências

### 7.1 O que coletar

| Tipo | Quando | Onde |
|---|---|---|
| Screenshot manual/nomeado | Passos-chave de cada CT (ver matriz) | `docs/evidencias/<HU>/CT###-*.png` |
| Screenshot automático | Falha | `cypress/screenshots/` |
| Vídeo | `cypress run` | `cypress/videos/` |
| PDF | HU03, HU04, HU05 | `cypress/downloads/` (gitignored) |
| Relatório | Fim da bateria | `docs/relatorio-execucao.md` |

### 7.2 Nomenclatura

`CT{id}-{passo-curto}.png`  
Exemplo: `CT000-dashboard-pos-login.png`, `CT026-pdf-responsabilidade.png`.

### 7.3 Defeito vs falha de teste vs ambiente

| Classificação | Definição | Ação |
|---|---|---|
| **Defeito de produto** | UI/regra viola critério de aceitação da HU | Registrar no relatório; evidência; não “passar” o CT |
| **Falha de teste** | Seletor, timing, massa errada, asserção frágil | Corrigir o teste; não abrir bug de produto |
| **Ambiente** | VPN, 500 HTTPS, dado concorrente, PDF indisponível | Bloquear CT; reexecutar quando o ambiente estabilizar |

---

## 8. Prioridades de implementação futura

- **P0:** happy path + um negativo bloqueante por HU (obrigatório para entrega mínima).
- **P1:** regras (Office, COM DEFEITO / DISPONIVEL, cancelar, exclusão mútua de termos).
- **P2:** bordas de data e período invertido.

Dependências: CT000 → CT001/CT014 (massa) → CT015–CT024 → CT025–CT033 → CT034–CT044.

---

## 9. Artefatos ainda necessários da UI autenticada

Enviar quando possível (não bloqueiam este documento):

- Prints e nomes exatos dos menus **Atribuições** e **Relatórios**.
- Labels com `*` e mensagens de validação.
- Colunas reais da tela HU05.
- Modal de termos (campo CPF, X, radios).
- Comportamento de **Salvar sem ativo**.
- PDF de amostra anonimizado.
