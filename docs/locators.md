# Locators mapeados — Inventário CTI

Atualizado com descoberta manual/automação. Preferir ids e `data-*`; XPath abaixo é equivalente documentado.

## Login (`/admins/sign_in`)

| Elemento | Seletor preferido | Observação |
|---|---|---|
| E-mail | `#admin_email` | |
| Senha | `#admin_password` | |
| Formulário | `#new_admin` | Devise |
| Entrar | `#new_admin input[type="submit"]` | Alternativa observada: `#new_admin > div:nth-child(5) > input` |
| Toast credencial inválida | texto `Email ou senha inválidos.` | ~3s na tela; CT045/CT046 |

## Pós-login (`/`)

| Elemento | Seletor / assert |
|---|---|
| URL | `http://testeqa.pge.ce.gov.br/` |
| Indicadores | textos visíveis `ATRIBUIÇÕES`, `ATRIBUIÇÕES SEM USUÁRIO` |
| Sidebar | `#accordionSidebar` |

## Menu lateral

| Item | XPath (referência) | Cypress (equivalente) |
|---|---|---|
| Atribuições | `//*[@id='accordionSidebar']//a[.//span[normalize-space()='Atribuições']]` | `#accordionSidebar` → `contains('span','Atribuições').closest('a')` |
| Relatórios | `//*[@id='accordionSidebar']//a[.//span[normalize-space()='Relatórios']]` | `#accordionSidebar` → `contains('span','Relatórios').closest('a')` |
| Ativos | menu lateral **Ativos** | URL `/portal_service/listing_assets` |

## Ativos — listagem (`/portal_service/listing_assets`)

| Coluna | Exemplo no HTML |
|---|---|
| Tombo | `<td>TB-1791338102626</td>` |
| Descrição | `<td>DESKTOP Dell OptiPlex 3080</td>` |
| Serial / Aquisição | colunas da grade |
| Status | **não existe** nesta tela |

## Ativos — novo (`/portal_service/listing_assets/new`)

| Elemento | Seletor |
|---|---|
| Tipo | `#type` (teste usa `MOUSE`, para não exigir SO na atribuição) |
| Modelo | `#asset_model` |
| Tombo | `#asset_tombo` |
| Marca | `#asset_brand` |
| Serial | `#asset_serial` (opcional) |
| Código da aquisição | `#asset_acquisition_id` (`1` = `00/0001`) |
| Salvar | `input[type="submit"][name="commit"][value="Salvar"]` |
| Cancelar | `button.btn-danger` com texto Cancelar |
| Atalho na listagem | `button.btn-success` com texto `Novo Ativo` |

## Atribuições — listagem

| Elemento | Seletor |
|---|---|
| URL | `/portal_service/bonds` |
| Nova Atribuição | `button` com texto `Nova Atribuição` |
| Gerar Termos | `button[data-target="#generate_term"]` |
| Editar (exemplo) | `a[href="/portal_service/bonds/1795/edit"]` — preferir linha com `QA-AUTO-*` |

## Atribuições — formulário nova

| Elemento | Seletor |
|---|---|
| Área | `#set_area` |
| Subárea | `#resp_subarea` (`bond[subarea_id]`). Após a Área, a página chama `GET /portal_service/subareas.json?area_id=`. O teste escolhe a primeira opção real dessa resposta |
| Colaborador (radio) | `#bond_employee_type_colaborador` |
| Sem colaborador (radio) | `#bond_employee_type_sem_usuario` |
| Subárea (radio tipo) | `#bond_employee_type_subarea` |
| Colaborador (select) | `#collaborators` (`bond[user_id]`), Select2 `#select2-collaborators-container` |
| Atendido por | `#attended` |
| Presencial | `#bond_modality_presencial` |
| Home Office | `#bond_modality_home_office` |
| Sistema operacional | `#so` |
| Utilizará Pacote Office? | `#check_office` |
| Pacote | `#key` (primeira opção real: `option` índice 2) |
| Observações | `#bond_observation` |
| Atribuir Ativo | `#btn_asset` |
| Tombo (Select2) | `#set_tombo`; lista `#select2-set_tombo-results li` (pular o item cujo texto é só `Tombo`) |
| Descrição | `#set_description` |
| Status da linha | `#set_status`. `5` = `VÍNCULADO` (com acento), `6` = `VÍNCULADO EM USO` |
| Salvar | `input[type='submit'][name='commit'][value='Salvar']` |
| Cancelar | `button.btn-danger[type='button']` |
| Sucesso | texto `Ativos vinculados a:` + `Parabéns!` |
| Sem ativo | texto `Ativo não informado!` |
| Obrigatório vazio | não há nó de mensagem inspecionável; placeholder `#set_area option[value='']` com `Selecione ...` permanece |

## Atribuições — edição (`/portal_service/bonds/:id/edit`)

| Elemento | Seletor / texto |
|---|---|
| Título | `Atualizando Atribuição` |
| Abrir | na linha da observação, `a[href$="/edit"]` |
| Observação | `#bond_observation` |
| Atendido por | `#attended` chega **vazio** e é `required` para salvar |
| Salvar | `input[type="submit"][name="commit"][value="Salvar"]` |
| Sucesso | `Vínculo de <colaborador>, atualizado com sucesso!` e volta para `/portal_service/bonds` |
| Obrigatório vazio | balão nativo `Selecione um item da lista` |

## Atribuições — gerar termos

| Elemento | Seletor / texto |
|---|---|
| Abrir modal | `button[data-target="#generate_term"]` |
| Modal | `#generate_term` |
| Responsabilidade | `#term_type_liability` (`value="liability"`) |
| Empréstimo | `#term_type_loan` (`value="loan"`) |
| Gerar | `#btn-termo` |
| Fechar | `#generate_term button[data-dismiss="modal"]` |
| Sem checkbox ou sem tipo | `alert` `Selecione um tipo de Termo e uma ou mais Atribuiçôes` |
| PDF | nova aba `/portal_service/bonds/term_responsibility_asset?bonds_ids=<id>&term_type=liability` ou `term_type=loan` |

## Relatórios — movimentação de ativos (`/portal_service/reports/index`)

| Elemento | Seletor / texto |
|---|---|
| Menu | `#accordionSidebar` → Relatórios → `a[href="/portal_service/reports/index"]` |
| Área | `#area_name` |
| Data inicial | `#initial_date` (`type="date"`, valor `aaaa-mm-dd`) |
| Data final | `#final_date` |
| Pesquisar | `input[type="submit"][value="Pesquisar"]` (fora da área visível; envia `POST /portal_service/reports/moves_today`) |
| Grade | Tombo, Nº de Série, Descrição, Lotação Anterior, Lotação Atual, Colaborador; faixa com o nome da área |
| Gerar Relatório | `a[href*="/portal_service/reports/pdf_create"]`. Sem pesquisa, o href não leva filtro e a tela exibe `Informe uma Área e/ou Período para gerar o pdf!`. Com pesquisa: `pdf_create?area_name=CTI&initial_date=...&final_date=...` |

## Relatórios — atribuições por área (`/portal_service/reports/assignments_by_area`)

| Elemento | Seletor / texto |
|---|---|
| Título | `Atribuições por Área/Subárea` |
| Sintético | `#type_syntetic` (`value="syntetic"`, `required`) |
| Analítico | `#type_analytic` (`value="analytic"`) |
| Área | `#search_area` (CTI = `value="9"`; o value é o id, não o nome) |
| Subárea | `#search_subarea` |
| Pesquisar | `input[type="submit"][value="Pesquisar"]` |
| Resultado sintético | painéis `Relatório Sintético - CTI`, `Atribuições por Modalidade`, `Total de Atribuições`. Os filtros voltam vazios depois da pesquisa |
| PDF | `assignments_by_area_pdf?area=9&subarea=65&type=syntetic`. O Chrome exibe `Falha ao carregar documento PDF.` |

## Ambiente

- Acesso confirmado **sem VPN** na rede do executor (ajustar README se mudar).
- Usar **HTTP** (`baseUrl`); HTTPS pode retornar 500.
