# Matriz de cenários — Inventário CTI

IDs: **CT000–CT046**. Prioridade: **P0** happy path + um negativo bloqueante por HU; **P1** regras; **P2** bordas.  
Tipo: **+** positivo / **-** negativo.  
Massa: observações `QA-AUTO-<timestamp>`.  
Cenários P1 e P2 desta matriz não foram executados nesta entrega.

**Ordem de execução:** CT000 → HU01 (cria dado) → HU02 → HU03 → HU04 / HU05. CT045 e CT046 fora da sessão válida.

---

## Rastreabilidade (resumo)

| ID | HU / módulo | Critério de aceitação |
|---|---|---|
| CT000, CT045, CT046 | Login | Autenticação admin; credencial inválida; e-mail vazio |
| CT001–CT014 | HU01 | Área/subárea; colaborador ou subárea sem colaborador; `*`; modalidade; SO; Office condicional; observações; atribuir ativo(s); Salvar/Cancelar; confirmação e inventário |
| CT015–CT024 | HU02 | Carga de campos; Ativos da Atribuição; remover/adicionar; COM DEFEITO; DISPONIVEL; obrigatórios; Salvar/Cancelar |
| CT025–CT033 | HU03 | Checkbox; tipos exclusivos; Gerar; X; PDF (título, texto legal, nome, CPF, área, ATIVOS ATRIBUÍDOS, local/data, assinatura); sem seleção; sem colaborador |
| CT034–CT040 | HU04 | Área e período; pesquisar; agrupamento; colunas; PDF nova aba; sem dados; datas |
| CT041–CT044 | HU05 | Tela distinta; pesquisa sintética; link do PDF; sem dados |

---

## Login

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT000 | P0 | + | Ambiente HTTP acessível; credenciais no env | 1. Abrir `/admins/sign_in`. 2. Preencher `#admin_email`. 3. Preencher `#admin_password`. 4. Submeter `#new_admin input[type="submit"]` | URL `/`; textos `ATRIBUIÇÕES` e `ATRIBUIÇÕES SEM USUÁRIO` visíveis | `adminEmail` / `adminPassword` | `CT000-dashboard-pos-login.png` |
| CT045 | P0 | - | Tela de login | 1. E-mail válido. 2. Senha inválida. 3. Entrar | Permanece em `/admins/sign_in`; toast `Email ou senha inválidos.` (~3s) | Senha `QA-AUTO-invalid` | `CT045-senha-invalida.png` |
| CT046 | P0 | - | Tela de login | 1. Deixar `#admin_email` vazio. 2. Senha qualquer. 3. Entrar | Permanece em `/admins/sign_in`; toast `Email ou senha inválidos.` | E-mail vazio | `CT046-email-vazio.png` |

---

## HU01 — Cadastro de atribuições

**Fluxo:** `/portal_service/bonds` → Nova Atribuição → Atribuir Ativo (`#btn_asset`).

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT001 | P0 | + | CT000; primeira área/subárea/colaborador da lista e 1 ativo | `#set_area`, `#resp_subarea`, radio colaborador, `#attended`, Presencial, `#so`, observação `QA-AUTO-<ts>`, `#btn_asset`, Salvar | Texto `Ativos vinculados a:` e `Parabéns!`; tag visível na listagem | Primeira opção não vazia de cada select | `CT001-cadastro-completo.png` |
| CT002 | P1 | + | Formulário nova atribuição | Selecionar Área e verificar Subárea | Subáreas recarregadas para a área escolhida. Não executado | Par área→subárea | `CT002-cascata-area-subarea.png` |
| CT003 | P1 | + | Formulário; subárea sem colaborador | Preencher área/subárea sem colaborador; demais obrigatórios; 1 ativo; Salvar | Grava atribuição sem colaborador. Não executado | Subárea que admita vazio | `CT003-sem-colaborador.png` |
| CT004 | P1 | + | Massa CT001 ou novo cadastro | Selecionar modalidade **Presencial**; salvar; reabrir | Valor Presencial persistido | Presencial | `CT004-modalidade-presencial.png` |
| CT005 | P1 | + | Formulário | Selecionar **Home Office**; salvar; reabrir | Valor Home Office persistido | Home Office | `CT005-modalidade-home-office.png` |
| CT006 | P1 | + | Formulário | Selecionar o sistema operacional e salvar | SO persistido. Não executado | SO da lista | `CT006-sistema-operacional.png` |
| CT007 | P1 | + | Formulário | Marcar “Utilizará Pacote Office?”; preencher pacote; salvar | Pacote obrigatório e persistido. Não executado | Pacote da lista | `CT007-office-marcado.png` |
| CT008 | P1 | + | Formulário | Deixar o checkbox Office desmarcado | Campo de pacote oculto ou desabilitado. Não executado | Checkbox off | `CT008-office-desmarcado.png` |
| CT009 | P2 | + | Happy path mínimo | Salvar com observações vazias | Salva (campo opcional) | Observações vazias | `CT009-observacoes-vazias.png` |
| CT010 | P1 | + | ≥2 ativos DISPONIVEL | “Atribuir Ativo” duas ou mais vezes; Salvar | Todos os tombos na atribuição e no inventário | 2+ tombos | `CT010-multiplos-ativos.png` |
| CT011 | P0 | - | Formulário vazio | Salvar sem preencher | Não grava; `#set_area` continua `Selecione ...` (alerta nativo não está no DOM) | Campos vazios | `CT011-obrigatorios.png` |
| CT012 | P1 | - | Formulário preenchido não salvo | Preencher dados `QA-AUTO-CANCEL`; Cancelar | Rascunho descartado; lista sem o registro | Texto único de cancelamento | `CT012-cancelar.png` |
| CT013 | P1 | - | Formulário válido sem ativos | Salvar sem `#btn_asset` | Bloqueia; texto `Ativo não informado!` | Sem tombo | `CT013-salvar-sem-ativo.png` |
| CT014 | P0 | + | CT001 executado | Localizar `QA-AUTO-<ts>` após o toast | Toast `Ativos vinculados a: … Parabéns!` e observação na listagem `/portal_service/bonds` | Mesmo timestamp de CT001 | `CT014-confirmacao-inventario.png` |

---

## HU02 — Editar atribuições

**Fluxo:** na listagem, `a[href$="/edit"]` da linha da observação.  
**Pré geral:** atribuição `QA-AUTO-*` criada na HU01.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT015 | P0 | + | Atribuição criada no teste | Abrir Editar da linha `QA-AUTO-*` | Título Atualizando Atribuição; observação, área e Presencial carregados; `#attended` vazio | Registro `QA-AUTO-*` | `CT015-carga-campos.png` |
| CT016 | P1 | + | Tela editar | Inspecionar a seção de ativos | Tombo, descrição e status visíveis. Não executado | Ativos da HU01 | `CT016-secao-ativos.png` |
| CT017 | P1 | + | ≥1 ativo na atribuição | Remover um ativo; Salvar | Ativo sai da atribuição. Não executado | Tombo a remover | `CT017-remover-ativo.png` |
| CT018 | P1 | + | Ativo DISPONIVEL extra | Adicionar ativo na edição; Salvar | Novo tombo na seção e no inventário | Tombo extra | `CT018-adicionar-ativo.png` |
| CT019 | P0 | + | Tela editar | Selecionar `#attended`; observação com sufixo `-ED`; Salvar | Redireciona para a lista; texto `Vínculo de <colaborador>, atualizado com sucesso!`; `-ED` na grade | `QA-AUTO-<ts>-ED` | `CT019-salvar-edicao.png` |
| CT020 | P1 | + | Ativo atribuído | Status COM DEFEITO; informar defeito; Remover; adicionar novo; Salvar | Defeito registrado e ativo substituído. Não executado | Texto `QA-AUTO-DEF` | `CT020-com-defeito.png` |
| CT021 | P1 | + | Ativo atribuído; substituto DISPONIVEL | Marcar/usar DISPONIVEL; Remover; adicionar novo; Salvar | Substituição concluída; tombo antigo fora; novo na lista | Tombo DISPONIVEL | `CT021-substituicao-disponivel.png` |
| CT022 | P0 | - | Tela editar com `#attended` vazio | Salvar sem escolher Atendido por | Permanece em `/edit`; validação nativa `Selecione um item da lista` (não está no DOM); sem mensagem de sucesso | `#attended` vazio | `CT022-obrigatorios-edicao.png` |
| CT023 | P1 | - | Tela editar com alteração | Alterar observação; Cancelar | Alteração descartada ao reabrir | Sufixo `-NO-SAVE` | `CT023-cancelar-edicao.png` |
| CT024 | P2 | + | Atribuição com ativos | Remover todos os ativos; Salvar | A tela permite ou bloqueia a lista vazia. Não executado | Lista vazia de ativos | `CT024-remover-todos-ativos.png` |

---

## HU03 — Geração de termos

**Fluxo:** Atribuições → Gerar Termos (`button[data-target="#generate_term"]`).

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT025 | P0 | + | Lista de atribuições | Gerar Termos | Modal `#generate_term` com `#term_type_liability` e `#term_type_loan` | — | `CT025-modal-tipos.png` |
| CT026 | P0 | + | Uma linha marcada | Responsabilidade; Gerar | `window.open` em `/portal_service/bonds/term_responsibility_asset` com `term_type=liability` | Primeira linha da lista | `CT026-pdf-responsabilidade.png` |
| CT027 | P1 | + | Modal aberto | Selecionar Empréstimo; Gerar | Mesma rota com `term_type=loan` | Mesma atribuição | `CT027-pdf-emprestimo.png` |
| CT028 | P0 | - | Modal aberto | Marcar Responsabilidade e depois Empréstimo | Só um radio fica marcado (`name="term_type"`) | Clique nos dois controles | `CT028-tipos-exclusivos.png` |
| CT029 | P1 | + | Modal aberto | Fechar pelo X | Modal fecha e nenhum PDF é gerado. Não executado | — | `CT029-fechar-x.png` |
| CT030 | P1 | + | PDF de CT026 | Extrair texto | CPF **não** veio preenchido na geração manual; não há campo de CPF no modal | PDF autenticado | `CT030-pdf-conteudo.png` |
| CT031 | P0 | - | Nenhuma linha marcada | Marcar um tipo e Gerar | `alert` `Selecione um tipo de Termo e uma ou mais Atribuiçôes` | Nenhuma linha marcada | `CT031-sem-selecao.png` |
| CT032 | P1 | - | Atribuição sem colaborador | Gerar termo | Bloqueio, nome vazio ou CPF manual. Não executado | Registro sem colaborador | `CT032-termo-sem-colaborador.png` |
| CT033 | P1 | + | Modal com campo CPF manual | Informar CPF conhecido; Gerar | CPF aparece no PDF | CPF `000.000.000-00` **somente se a UI aceitar**; senão CPF de teste válido de homologação | `CT033-cpf-no-pdf.png` |

---

## HU04 — Relatório movimentação de ativos

**Fluxo:** Relatórios → Movimentação de Ativos. O botão **Pesquisar** existe no formulário (`POST /portal_service/reports/moves_today`), mas o layout o empurra para fora da tela. **Gerar Relatório** sem pesquisar só abre `/pdf_create` e volta com o aviso `Informe uma Área e/ou Período para gerar o pdf!`. Depois da pesquisa, o link do PDF leva os filtros na query.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT034 | P0 | + | Movimentação do dia na área CTI | Área CTI, período de hoje, Pesquisar | Grade em `/portal_service/reports/moves_today` | Área CTI; data de hoje | `CT034-filtros-pesquisar.png` |
| CT035 | P0 | + | CT034 com dados | Inspecionar a grade | Faixa com o nome da área (CTI) | Mesmos filtros | `CT035-agrupamento.png` |
| CT036 | P0 | + | Grade com linhas | Conferir colunas | Tombo, Nº de Série, Descrição, Lotação Anterior, Lotação Atual, Colaborador | — | `CT036-colunas.png` |
| CT037 | P0 | + | Resultado de pesquisa | Conferir Gerar Relatório | Link `pdf_create` com `area_name`, `initial_date` e `final_date` | — | `CT037-pdf-movimentacao.png` |
| CT038 | P1 | - | Área ou período sem movimento | Pesquisar intervalo vazio | Mensagem ou grade vazia. Não executado | Período futuro | `CT038-sem-dados.png` |
| CT039 | P2 | - | Tela de filtros | Data inválida | Validação sem quebrar a página. Não executado | Data inválida | `CT039-data-invalida.png` |
| CT040 | P2 | - | Tela de filtros | Data fim anterior à data início | Mensagem ou lista vazia. Não executado | Período invertido | `CT040-periodo-invertido.png` |

---

## HU05 — Relatório atribuições por área

**Nota:** o enunciado repete critérios da HU04. A tela real é o relatório sintético/analítico, com gráficos, e não a grade de movimentação.

**Fluxo:** Relatórios → Atribuições por Área (`/portal_service/reports/assignments_by_area`). Título `Atribuições por Área/Subárea`. Tipo Sintético ou Analítico, área e subárea, Pesquisar. O PDF é `assignments_by_area_pdf`. O Chrome exibe `Falha ao carregar documento PDF.`

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT041 | P0 | + | Usuário autenticado | Abrir Atribuições por Área | Título `Atribuições por Área/Subárea` e rota diferente de Movimentação de Ativos | — | `CT041-tela-distinta.png` |
| CT042 | P0 | + | Área CTI com atribuições | Sintético, área CTI, subárea, Pesquisar | Painel `Relatório Sintético - CTI` e `Atribuições por Modalidade` | Área `9` | `CT042-pesquisa.png` |
| CT043 | P0 | + | Resultado CT042 | Conferir Gerar Relatório | Link `assignments_by_area_pdf` com `area=9` e `type=syntetic` | — | `CT043-pdf-area.png` |
| CT044 | P1 | - | Filtro sem atribuições | Pesquisar combinação vazia | Mensagem ou painel vazio. Não executado | Área sem dado | `CT044-sem-dados.png` |

---

## Dependências entre cenários

```
CT000
 ├─ CT001 / CT014 ── massa QA-AUTO-*
 │     ├─ CT015–CT024 (edição da mesma atribuição)
 │     ├─ CT025–CT031, CT033 (termos da seleção)
 │     └─ CT034–CT037, CT042–CT043 (relatórios da área/período)
 ├─ CT003 ── (opcional) CT032
 ├─ CT045, CT046 (sessão isolada)
 └─ CT038–CT040, CT044 (filtros sem depender da massa, mas podem reutilizar área)
```

---

## Convenção de evidência

Arquivo: `docs/evidencias/<modulo>/CT{id}-{passo}.png`  
Módulos sugeridos: `login`, `hu01`, `hu02`, `hu03`, `hu04`, `hu05`.
