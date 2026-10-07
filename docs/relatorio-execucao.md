# Relatório de execução — Inventário CTI

Execução local em 07/10/2026. Senha e PDFs não são versionados.

## Cabeçalho

| Campo | Valor |
|---|---|
| Data | 2026-10-07 |
| Executor | Diego |
| Branch | main |
| Cypress | 13.17.0 |
| Browser | Chrome |
| `baseUrl` | `http://testeqa.pge.ce.gov.br` |
| VPN | Não |
| Observação de ambiente | HTTP. HTTPS do mesmo host retorna 500. |

**Legenda de status:** Passou | Falhou | Bloqueado | Não executado

**Severidade:** S1 bloqueante | S2 alta | S3 média | S4 baixa

## Resultados

Evidência dos casos executados: execução local do Cypress (vídeo em `cypress/videos/`, não versionado). Os P1 e P2 não foram rodados nesta entrega.

| ID | Descrição | Status | Notas |
|---|---|---|---|
| CT000 | Login válido | Passou | URL `/` com os indicadores de atribuições |
| CT001 | Cadastro happy path HU01 | Passou | Ativo MOUSE criado na hora e vinculado |
| CT002 | Cascata área/subárea | Não executado | P1 |
| CT003 | Subárea sem colaborador | Não executado | P1 |
| CT004 | Modalidade Presencial | Não executado | P1 |
| CT005 | Modalidade Home Office | Não executado | P1 |
| CT006 | Sistema operacional | Não executado | P1 |
| CT007 | Pacote Office marcado | Não executado | P1 |
| CT008 | Pacote Office desmarcado | Não executado | P1 |
| CT009 | Observações vazias | Não executado | P2 |
| CT010 | Múltiplos ativos | Não executado | P1 |
| CT011 | Obrigatórios no cadastro | Passou | Área permanece em Selecione |
| CT012 | Cancelar cadastro | Não executado | P1 |
| CT013 | Salvar sem ativo | Passou | Mensagem `Ativo não informado!` |
| CT014 | Confirmação e inventário | Passou | Toast de sucesso e observação na listagem |
| CT015 | Carga de campos na edição | Passou | Atendido por chega vazio |
| CT016 | Seção Ativos da Atribuição | Não executado | P1 |
| CT017 | Remover ativo | Não executado | P1 |
| CT018 | Adicionar ativo na edição | Não executado | P1 |
| CT019 | Salvar edição | Passou | Texto de vínculo atualizado e sufixo `-ED` |
| CT020 | Fluxo COM DEFEITO | Não executado | P1 |
| CT021 | Substituição DISPONIVEL | Não executado | P1 |
| CT022 | Obrigatórios na edição | Passou | Sem Atendido por, permanece em `/edit` |
| CT023 | Cancelar edição | Não executado | P1 |
| CT024 | Remover todos os ativos | Não executado | P2 |
| CT025 | Modal tipos de termo | Passou | Responsabilidade e Empréstimo |
| CT026 | PDF Responsabilidade | Passou | URL com `term_type=liability` |
| CT027 | PDF Empréstimo | Não executado | P1 |
| CT028 | Tipos mutuamente exclusivos | Passou | Um radio desmarca o outro |
| CT029 | Fechar modal pelo X | Não executado | P1 |
| CT030 | Conteúdo do PDF | Não executado | P1. Na geração manual o CPF veio vazio |
| CT031 | Gerar termos sem seleção | Passou | Alerta padrão da tela |
| CT032 | Termo sem colaborador | Não executado | P1 |
| CT033 | CPF no PDF | Não executado | P1. Não há campo de CPF no modal |
| CT034 | Filtros e pesquisar HU04 | Passou | Grade em `moves_today` |
| CT035 | Agrupamento por área | Passou | Faixa CTI |
| CT036 | Colunas da grade | Passou | Seis colunas da movimentação |
| CT037 | PDF movimentação | Passou | Link com área e período |
| CT038 | Relatório sem dados | Não executado | P1 |
| CT039 | Data inválida | Não executado | P2 |
| CT040 | Período invertido | Não executado | P2 |
| CT041 | HU05 tela distinta | Passou | Título Atribuições por Área/Subárea |
| CT042 | Pesquisa HU05 | Passou | Relatório sintético da CTI |
| CT043 | PDF HU05 | Passou | Link gerado. O Chrome não carrega o arquivo (DEF-06) |
| CT044 | HU05 sem dados | Não executado | P1 |
| CT045 | Senha inválida | Passou | Toast `Email ou senha inválidos.` |
| CT046 | E-mail vazio | Passou | Mesmo toast; permanece no login |

## Totais

| Status | Quantidade |
|---|---|
| Passou | 21 |
| Falhou | 0 |
| Bloqueado | 0 |
| Não executado | 26 |
| **Total** | 47 |

## Defeitos de produto

| ID | Título | Severidade | Notas |
|---|---|---|---|
| DEF-01 | Ativo já existente não vincula | S2 | O cadastro só conclui com ativo criado na mesma execução (CT001) |
| DEF-02 | Atendido por vazio na edição | S2 | Impede salvar até nova seleção (CT015, CT022) |
| DEF-03 | Alerta de termo com grafia irregular | S4 | `Atribuiçôes` (CT031) |
| DEF-04 | Termo sem CPF | S2 | Modal sem campo; PDF sem o número |
| DEF-05 | Pesquisar fora da tela na movimentação | S2 | Gerar Relatório sem pesquisa não envia filtro |
| DEF-06 | PDF de atribuições por área não carrega | S2 | URL `assignments_by_area_pdf`; Chrome: `Falha ao carregar documento PDF.` (CT043) |
| DEF-07 | Texto de script na listagem | S3 | Colaborador e áreas com marcação visível |
| DEF-08 | HTTPS retorna 500 | S3 | Suíte usa HTTP |

## Falhas de teste / ambiente

Nenhuma na execução final. As correções de seletor feitas durante a automação não foram registradas como defeito de produto.

## Vídeos

Gerados localmente em `cypress/videos/` para `login.cy.js`, `hu01-cadastro-atribuicoes.cy.js`, `hu02-editar-atribuicoes.cy.js`, `hu03-gerar-termos.cy.js`, `hu04-movimentacao-ativos.cy.js` e `hu05-atribuicoes-por-area.cy.js`. Não entram no Git.
