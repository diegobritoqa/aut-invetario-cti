# Relatório de execução — Inventário CTI

Preencher **após** `cypress run` (ou sessão `cypress open` documentada). Não versionar senhas nem PDFs com CPF.

---

## Cabeçalho

| Campo | Valor |
|---|---|
| Data | _YYYY-MM-DD_ |
| Executor | |
| Branch / commit | |
| Cypress | _ex.: 13.x_ |
| Browser | Chrome |
| `baseUrl` | `http://testeqa.pge.ce.gov.br` |
| VPN | Sim / Não |
| Observação de ambiente | |

**Legenda de status:** Passou | Falhou | Bloqueado | Não executado  

**Classificação (se não passou):** defeito de produto | falha de teste | ambiente  

**Severidade:** S1 bloqueante | S2 alta | S3 média | S4 baixa

---

## Resultados

| ID | Descrição | Status | Evidência | Defeito / falha | Severidade | Notas |
|---|---|---|---|---|---|---|
| CT000 | Login válido | | `docs/evidencias/login/CT000-dashboard-pos-login.png` | | | |
| CT001 | Cadastro happy path HU01 | | `docs/evidencias/hu01/CT001-cadastro-completo.png` | | | |
| CT002 | Cascata área/subárea | | `docs/evidencias/hu01/CT002-cascata-area-subarea.png` | | | |
| CT003 | Subárea sem colaborador | | `docs/evidencias/hu01/CT003-sem-colaborador.png` | | | |
| CT004 | Modalidade Presencial | | `docs/evidencias/hu01/CT004-modalidade-presencial.png` | | | |
| CT005 | Modalidade Home Office | | `docs/evidencias/hu01/CT005-modalidade-home-office.png` | | | |
| CT006 | Sistema operacional | | `docs/evidencias/hu01/CT006-sistema-operacional.png` | | | |
| CT007 | Pacote Office marcado | | `docs/evidencias/hu01/CT007-office-marcado.png` | | | |
| CT008 | Pacote Office desmarcado | | `docs/evidencias/hu01/CT008-office-desmarcado.png` | | | |
| CT009 | Observações vazias | | `docs/evidencias/hu01/CT009-observacoes-vazias.png` | | | |
| CT010 | Múltiplos ativos | | `docs/evidencias/hu01/CT010-multiplos-ativos.png` | | | |
| CT011 | Obrigatórios no cadastro | | `docs/evidencias/hu01/CT011-obrigatorios.png` | | | |
| CT012 | Cancelar cadastro | | `docs/evidencias/hu01/CT012-cancelar.png` | | | |
| CT013 | Salvar sem ativo | | `docs/evidencias/hu01/CT013-salvar-sem-ativo.png` | | | |
| CT014 | Confirmação e inventário | | `docs/evidencias/hu01/CT014-confirmacao-inventario.png` | | | |
| CT015 | Carga de campos na edição | | `docs/evidencias/hu02/CT015-carga-campos.png` | | | |
| CT016 | Seção Ativos da Atribuição | | `docs/evidencias/hu02/CT016-secao-ativos.png` | | | |
| CT017 | Remover ativo | | `docs/evidencias/hu02/CT017-remover-ativo.png` | | | |
| CT018 | Adicionar ativo na edição | | `docs/evidencias/hu02/CT018-adicionar-ativo.png` | | | |
| CT019 | Salvar edição | | `docs/evidencias/hu02/CT019-salvar-edicao.png` | | | |
| CT020 | Fluxo COM DEFEITO | | `docs/evidencias/hu02/CT020-com-defeito.png` | | | |
| CT021 | Substituição DISPONIVEL | | `docs/evidencias/hu02/CT021-substituicao-disponivel.png` | | | |
| CT022 | Obrigatórios na edição | | `docs/evidencias/hu02/CT022-obrigatorios-edicao.png` | | | |
| CT023 | Cancelar edição | | `docs/evidencias/hu02/CT023-cancelar-edicao.png` | | | |
| CT024 | Remover todos os ativos | | `docs/evidencias/hu02/CT024-remover-todos-ativos.png` | | | |
| CT025 | Modal tipos de termo | | `docs/evidencias/hu03/CT025-modal-tipos.png` | | | |
| CT026 | PDF Responsabilidade | | `docs/evidencias/hu03/CT026-pdf-responsabilidade.png` | | | |
| CT027 | PDF Empréstimo | | `docs/evidencias/hu03/CT027-pdf-emprestimo.png` | | | |
| CT028 | Tipos mutuamente exclusivos | | `docs/evidencias/hu03/CT028-tipos-exclusivos.png` | | | |
| CT029 | Fechar modal pelo X | | `docs/evidencias/hu03/CT029-fechar-x.png` | | | |
| CT030 | Conteúdo do PDF | | `docs/evidencias/hu03/CT030-pdf-conteudo.png` | | | |
| CT031 | Gerar termos sem seleção | | `docs/evidencias/hu03/CT031-sem-selecao.png` | | | |
| CT032 | Termo sem colaborador | | `docs/evidencias/hu03/CT032-termo-sem-colaborador.png` | | | |
| CT033 | CPF no PDF | | `docs/evidencias/hu03/CT033-cpf-no-pdf.png` | | | |
| CT034 | Filtros e pesquisar HU04 | | `docs/evidencias/hu04/CT034-filtros-pesquisar.png` | | | |
| CT035 | Agrupamento área/data | | `docs/evidencias/hu04/CT035-agrupamento.png` | | | |
| CT036 | Colunas da grade | | `docs/evidencias/hu04/CT036-colunas.png` | | | |
| CT037 | PDF movimentação | | `docs/evidencias/hu04/CT037-pdf-movimentacao.png` | | | |
| CT038 | Relatório sem dados | | `docs/evidencias/hu04/CT038-sem-dados.png` | | | |
| CT039 | Data inválida | | `docs/evidencias/hu04/CT039-data-invalida.png` | | | |
| CT040 | Período invertido | | `docs/evidencias/hu04/CT040-periodo-invertido.png` | | | |
| CT041 | HU05 tela distinta | | `docs/evidencias/hu05/CT041-tela-distinta.png` | | | |
| CT042 | Pesquisa HU05 | | `docs/evidencias/hu05/CT042-pesquisa.png` | | | |
| CT043 | PDF HU05 | | `docs/evidencias/hu05/CT043-pdf-area.png` | | | |
| CT044 | HU05 sem dados | | `docs/evidencias/hu05/CT044-sem-dados.png` | | | |
| CT045 | Senha inválida | | `docs/evidencias/login/CT045-senha-invalida.png` | | | |
| CT046 | E-mail vazio | | `docs/evidencias/login/CT046-email-vazio.png` | | | |

---

## Totais

| Status | Quantidade |
|---|---|
| Passou | |
| Falhou | |
| Bloqueado | |
| Não executado | |
| **Total** | 47 |

---

## Defeitos de produto (detalhe)

| ID CT | Título | Severidade | Evidência | Notas |
|---|---|---|---|---|
| | | | | |

---

## Falhas de teste / ambiente (detalhe)

| ID CT | Título | Classificação | Evidência | Notas |
|---|---|---|---|---|
| | | | | |

---

## Vídeos e artefatos Cypress

| Spec | Vídeo | Screenshots de falha |
|---|---|---|
| login.cy.js | `cypress/videos/` | `cypress/screenshots/` |
| hu01-cadastro-atribuicoes.cy.js | | |
| hu02-editar-atribuicoes.cy.js | | |
| hu03-gerar-termos.cy.js | | |
| hu04-relatorio-movimentacao.cy.js | | |
| hu05-relatorio-atribuicoes-area.cy.js | | |
