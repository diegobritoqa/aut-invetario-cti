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

### Estratégia futura para “Editar”

1. Criar atribuição HU01 com observação `QA-AUTO-<timestamp>`.
2. Filtrar/paginar listagem até a linha com esse texto.
3. Clicar `a[href*="/portal_service/bonds/"][href$="/edit"]` **dentro da linha** (não usar id fixo 1795 em produção de testes).

## Ambiente

- Acesso confirmado **sem VPN** na rede do executor (ajustar README se mudar).
- Usar **HTTP** (`baseUrl`); HTTPS pode retornar 500.
