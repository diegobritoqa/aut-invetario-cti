# Matriz de cenários — Inventário CTI

IDs: **CT000–CT046**. Prioridade: **P0** happy path + um negativo bloqueante por HU; **P1** regras; **P2** bordas.  
Tipo: **+** positivo / **-** negativo.  
Textos, menus e colunas não confirmados: `[CONFIRMAR NA UI]`.  
Massa: observações `QA-AUTO-<timestamp>`. Login: locators confirmados (`#admin_email`, `#admin_password`, form `#new_admin`).

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
| CT041–CT044 | HU05 | Tela distinta; pesquisa; PDF; sem dados (colunas reais `[CONFIRMAR NA UI]`) |

---

## Login

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT000 | P0 | + | Ambiente HTTP acessível; credenciais no env | 1. Abrir `/admins/sign_in`. 2. Preencher `#admin_email`. 3. Preencher `#admin_password`. 4. Submeter (`#new_admin > div:nth-child(5) > input` ou `#new_admin input[type="submit"]`) | Sessão autenticada; redirecionamento ao painel; menus `[CONFIRMAR NA UI]` visíveis | `adminEmail` / `adminPassword` | `CT000-dashboard-pos-login.png` |
| CT045 | P0 | - | Tela de login | 1. E-mail válido. 2. Senha inválida. 3. Entrar | Permanece em `/admins/sign_in`; mensagem `[CONFIRMAR NA UI]`; sem acesso a Atribuições | Senha `QA-AUTO-invalid` | `CT045-senha-invalida.png` |
| CT046 | P0 | - | Tela de login | 1. Deixar `#admin_email` vazio. 2. Senha qualquer. 3. Entrar | Não autentica; validação HTML5/Devise `[CONFIRMAR NA UI]` | E-mail vazio | `CT046-email-vazio.png` |

---

## HU01 — Cadastro de atribuições

**Fluxo:** Atribuições → Nova Atribuição → Novo Ativo `[CONFIRMAR NA UI]`.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT001 | P0 | + | CT000; área, subárea, colaborador e 1 ativo DISPONIVEL | Preencher área, subárea, colaborador, modalidade Presencial, SO, Office desmarcado, 1 ativo via Atribuir Ativo, observações `QA-AUTO-<ts>`, Salvar | Confirmação `[CONFIRMAR NA UI]`; atribuição listada; ativo vinculado no inventário | Área/subárea/colaborador existentes; tombo DISPONIVEL | `CT001-cadastro-completo.png` |
| CT002 | P1 | + | Formulário nova atribuição | Selecionar Área e verificar Subárea habilitada/filtrada | Subáreas correspondem à área `[CONFIRMAR NA UI]` | Par área→subárea conhecido | `CT002-cascata-area-subarea.png` |
| CT003 | P1 | + | Formulário; subárea que permite vazio de colaborador | Preencher área/subárea **sem** colaborador; demais obrigatórios; 1 ativo; Salvar | Grava atribuição sem colaborador (critério HU01) | Subárea `[CONFIRMAR NA UI]` | `CT003-sem-colaborador.png` |
| CT004 | P1 | + | Massa CT001 ou novo cadastro | Selecionar modalidade **Presencial**; salvar; reabrir | Valor Presencial persistido | Presencial | `CT004-modalidade-presencial.png` |
| CT005 | P1 | + | Formulário | Selecionar **Home Office**; salvar; reabrir | Valor Home Office persistido | Home Office | `CT005-modalidade-home-office.png` |
| CT006 | P1 | + | Formulário | Selecionar SO obrigatório (`*`) `[CONFIRMAR NA UI]` | SO persistido; vazio bloqueado em CT011 | SO da lista | `CT006-sistema-operacional.png` |
| CT007 | P1 | + | Formulário | Marcar “Utilizará Pacote Office?”; preencher pacote; salvar | Campo pacote visível e obrigatório; valor persistido `[CONFIRMAR NA UI]` | Pacote da lista | `CT007-office-marcado.png` |
| CT008 | P1 | + | Formulário | Deixar checkbox Office desmarcada | Campo pacote oculto/desabilitado/não enviado `[CONFIRMAR NA UI]` | Checkbox off | `CT008-office-desmarcado.png` |
| CT009 | P2 | + | Happy path mínimo | Salvar com observações vazias | Salva (campo opcional) | Observações vazias | `CT009-observacoes-vazias.png` |
| CT010 | P1 | + | ≥2 ativos DISPONIVEL | “Atribuir Ativo” duas ou mais vezes; Salvar | Todos os tombos na atribuição e no inventário | 2+ tombos | `CT010-multiplos-ativos.png` |
| CT011 | P0 | - | Formulário vazio | Tentar Salvar sem Área/Subárea e demais `*` | Não grava; mensagens por campo `[CONFIRMAR NA UI]` | Campos vazios | `CT011-obrigatorios.png` |
| CT012 | P1 | - | Formulário preenchido não salvo | Preencher dados `QA-AUTO-CANCEL`; Cancelar | Rascunho descartado; lista sem o registro | Texto único de cancelamento | `CT012-cancelar.png` |
| CT013 | P1 | - | Formulário válido sem ativos | Salvar sem “Atribuir Ativo” | Regra `[CONFIRMAR NA UI]`: bloqueio **ou** gravação sem ativo | Sem tombo | `CT013-salvar-sem-ativo.png` |
| CT014 | P0 | + | CT001 executado | Localizar atribuição `QA-AUTO-<ts>` na lista/inventário | Mensagem de sucesso `[CONFIRMAR NA UI]`; ativos atribuídos visíveis | Mesmo timestamp de CT001 | `CT014-confirmacao-inventario.png` |

---

## HU02 — Editar atribuições

**Fluxo:** Atribuições → Ações → Editar `[CONFIRMAR NA UI]`.  
**Pré geral:** atribuição `QA-AUTO-*` criada na HU01.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT015 | P0 | + | Atribuição HU01 | Abrir Editar | Todos os campos carregados (área, subárea, colaborador/vazio, modalidade, SO, Office, observações) | Registro `QA-AUTO-*` | `CT015-carga-campos.png` |
| CT016 | P1 | + | Tela editar | Inspecionar “Ativos da Atribuição” | Colunas tombo, descrição, status `[CONFIRMAR NA UI]` | Ativos da HU01 | `CT016-secao-ativos.png` |
| CT017 | P1 | + | ≥1 ativo na atribuição | Remover um ativo; Salvar | Ativo sai da atribuição; status no inventário `[CONFIRMAR NA UI]` | Tombo a remover | `CT017-remover-ativo.png` |
| CT018 | P1 | + | Ativo DISPONIVEL extra | Adicionar ativo na edição; Salvar | Novo tombo na seção e no inventário | Tombo extra | `CT018-adicionar-ativo.png` |
| CT019 | P0 | + | Tela editar | Alterar observação (sufixo `-ED`); Salvar | Confirmação `[CONFIRMAR NA UI]`; valor persistido | `QA-AUTO-<ts>-ED` | `CT019-salvar-edicao.png` |
| CT020 | P1 | + | Ativo atribuído; fluxo de defeito | Status COM DEFEITO; informar defeito; Remover; adicionar novo; Salvar | Defeito registrado `[CONFIRMAR NA UI]`; ativo antigo removido; novo vinculado | Texto de defeito `QA-AUTO-DEF` | `CT020-com-defeito.png` |
| CT021 | P1 | + | Ativo atribuído; substituto DISPONIVEL | Marcar/usar DISPONIVEL; Remover; adicionar novo; Salvar | Substituição concluída; tombo antigo fora; novo na lista | Tombo DISPONIVEL | `CT021-substituicao-disponivel.png` |
| CT022 | P0 | - | Tela editar | Limpar campos `*`; Salvar | Não grava; mensagens `[CONFIRMAR NA UI]` | Campos obrigatórios vazios | `CT022-obrigatorios-edicao.png` |
| CT023 | P1 | - | Tela editar com alteração | Alterar observação; Cancelar | Alteração descartada ao reabrir | Sufixo `-NO-SAVE` | `CT023-cancelar-edicao.png` |
| CT024 | P2 | + | Atribuição com ativos | Remover todos os ativos; Salvar | Regra `[CONFIRMAR NA UI]` (permite ou bloqueia) | Lista vazia de ativos | `CT024-remover-todos-ativos.png` |

---

## HU03 — Geração de termos

**Fluxo:** Atribuições → checkbox → Gerar Termos `[CONFIRMAR NA UI]`.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT025 | P0 | + | ≥1 atribuição listada | Marcar checkbox; Gerar Termos | Modal com tipos Responsabilidade e Empréstimo | Atribuição `QA-AUTO-*` | `CT025-modal-tipos.png` |
| CT026 | P0 | + | Modal aberto; atribuição com colaborador | Selecionar Responsabilidade; informar CPF se pedido; Gerar | PDF gerado (download ou nova aba) | CPF de teste controlado | `CT026-pdf-responsabilidade.png` |
| CT027 | P1 | + | Modal aberto | Selecionar Empréstimo; Gerar | PDF de empréstimo gerado | Mesma atribuição | `CT027-pdf-emprestimo.png` |
| CT028 | P0 | - | Modal aberto | Tentar marcar os dois tipos | Mutuamente exclusivos (radio ou um desmarca o outro) `[CONFIRMAR NA UI]` | Clique nos dois controles | `CT028-tipos-exclusivos.png` |
| CT029 | P1 | + | Modal aberto | Fechar pelo **X** | Modal fecha; nenhum PDF; listagem inalterada | — | `CT029-fechar-x.png` |
| CT030 | P0 | + | PDF de CT026 | Extrair texto (`pdf-parse`) | Título; texto legal; nome do colaborador; CPF; área; seção “ATIVOS ATRIBUÍDOS”; local/data; assinatura `[CONFIRMAR NA UI]` | PDF baixado | `CT030-pdf-conteudo.png` |
| CT031 | P0 | - | Lista sem checkbox | Acionar Gerar Termos sem seleção | Mensagem/botão inativo `[CONFIRMAR NA UI]`; sem PDF | Nenhuma linha marcada | `CT031-sem-selecao.png` |
| CT032 | P1 | - | Atribuição CT003 (sem colaborador), se existir | Gerar termo | Comportamento `[CONFIRMAR NA UI]`: bloqueio, nome vazio ou CPF só manual | Registro sem colaborador | `CT032-termo-sem-colaborador.png` |
| CT033 | P1 | + | Modal com campo CPF manual | Informar CPF conhecido; Gerar | CPF aparece no PDF | CPF `000.000.000-00` **somente se a UI aceitar**; senão CPF de teste válido de homologação | `CT033-cpf-no-pdf.png` |

---

## HU04 — Relatório movimentação de ativos

**Fluxo:** Relatórios → Movimentação de Ativos → Gerar Relatório `[CONFIRMAR NA UI]`.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT034 | P0 | + | Movimentação gerada pela HU01/HU02 | Filtrar Área da massa; Período `dd/mm/aaaa` cobrindo hoje; Pesquisar | Resultados da área/período | Área da atribuição `QA-AUTO-*`; data de hoje | `CT034-filtros-pesquisar.png` |
| CT035 | P0 | + | CT034 com dados | Inspecionar grade | Agrupamento por área e data com quantidade `[CONFIRMAR NA UI]` | Mesmos filtros | `CT035-agrupamento.png` |
| CT036 | P0 | + | Grade com linhas | Conferir colunas | Tombo, N° Série, Descrição, Lotação Anterior, Lotação Atual, Colaborador | — | `CT036-colunas.png` |
| CT037 | P0 | + | Resultado de pesquisa | Gerar Relatório | PDF em **nova aba** com a mesma estrutura da grade | — | `CT037-pdf-movimentacao.png` |
| CT038 | P1 | - | Área/período sem movimento | Pesquisar intervalo vazio | Mensagem informativa `[CONFIRMAR NA UI]` | Período futuro ou área sem dado | `CT038-sem-dados.png` |
| CT039 | P2 | - | Tela de filtros | Informar data inválida (ex.: `31/02/2026` ou texto) | Validação `[CONFIRMAR NA UI]`; sem quebra da página | Data inválida | `CT039-data-invalida.png` |
| CT040 | P2 | - | Tela de filtros | Data fim &lt; data início | Mensagem ou lista vazia `[CONFIRMAR NA UI]` | Período invertido | `CT040-periodo-invertido.png` |

---

## HU05 — Relatório atribuições por área

**Nota:** o enunciado replica critérios da HU04. Tratar como **tela distinta**. Colunas e agrupamento reais: `[CONFIRMAR NA UI]`.

**Fluxo:** Relatórios → Atribuições por Área → Gerar Relatório `[CONFIRMAR NA UI]`.

| ID | Pri | Tipo | Pré-condição | Passos resumidos | Resultado esperado | Dado de teste | Evidência |
|---|---|---|---|---|---|---|---|
| CT041 | P0 | + | Usuário autenticado | Abrir Atribuições por Área | Rota/título/menu **diferentes** de Movimentação de Ativos | URLs lado a lado | `CT041-tela-distinta.png` |
| CT042 | P0 | + | Atribuição HU01 na área | Aplicar filtros disponíveis `[CONFIRMAR NA UI]`; Pesquisar | Retorna dados da área da massa `QA-AUTO-*` | Área da HU01 | `CT042-pesquisa.png` |
| CT043 | P0 | + | Resultado CT042 | Gerar Relatório | PDF gerado (aba ou download) `[CONFIRMAR NA UI]` | — | `CT043-pdf-area.png` |
| CT044 | P1 | - | Filtro sem atribuições | Pesquisar combinação vazia | Mensagem informativa `[CONFIRMAR NA UI]` | Área/período sem dado | `CT044-sem-dados.png` |

Não copiar cegamente as colunas da HU04 no código até confirmação na UI.

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
