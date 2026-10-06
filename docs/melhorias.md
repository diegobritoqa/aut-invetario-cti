# Melhorias e achados — Inventário CTI

Achados de **especificação** (enunciado vs comportamento esperado) e de **produto** (testabilidade e UX). Itens com `[CONFIRMAR NA UI]` dependem de descoberta autenticada.

---

## 1. Inconsistências e lacunas de especificação

| ID | Tema | Achado | Impacto no teste | Sugestão |
|---|---|---|---|---|
| ESP-01 | HU04 vs HU05 | O enunciado **repete** os critérios de Movimentação de Ativos em Atribuições por Área | Risco de asserções erradas nas colunas/PDF da HU05 | Tratar HU05 como tela distinta (CT041–CT044); confirmar colunas reais antes de codificar |
| ESP-02 | URL / protocolo | Login documentado em HTTP; HTTPS do mesmo host retornou **500** na verificação do agente | `baseUrl` HTTPS quebraria a suíte | Manter `http://testeqa.pge.ce.gov.br`; registrar se o PDF do desafio citar host antigo |
| ESP-03 | Período | “Período (dd/mm/aaaa)” não define inclusividade (início/fim inclusivos?), um ou dois campos, nem fuso | CT034/CT040 ambíguos | Especificar: dois campos, inclusivo, fuso de Fortaleza |
| ESP-04 | HU01 sem colaborador vs HU03 | HU01 permite subárea **sem colaborador**; HU03 exige nome e CPF no termo | CT032 sem oráculo claro | Definir: bloquear termo, exigir responsável da subárea, ou CPF só manual |
| ESP-05 | CPF manual | CPF é “campo manual” no termo, não herdado do colaborador | Risco de termo com nome A e CPF B | Prefill pelo cadastro; validar dígitos |
| ESP-06 | Status de ativo | Grafias “COM DEFEITO” e “DISPONIVEL” (sem acento) | Seletores por texto quebram se a UI usar “Disponível” | Padronizar enum e documentar valores exatos |
| ESP-07 | “Novo Ativo” no fluxo de atribuição | Fluxo HU01 mistura Nova Atribuição e Novo Ativo | Pode ser cadastro de ativo ou apenas vínculo | Nomear a ação: “Vincular ativo” vs “Cadastrar ativo” |
| ESP-08 | Salvar sem ativo | HU01 pede vincular um ou mais ativos, mas não diz se Salvar sem ativo é inválido | CT013 sem oráculo | Tornar 1+ ativos obrigatório **ou** permitir rascunho |
| ESP-09 | Cancelar | “Cancelar descarta” não diz se há confirmação (unsaved changes) | CT012/CT023 | Definir dialog sim/não |
| ESP-10 | Tipos de termo | Mutuamente exclusivos, mas não diz radio vs checkbox | CT028 | Usar radio group |
| ESP-11 | Sem dados (relatório) | “Mensagem informativa” sem texto | CT038/CT044 frágeis se assertarem string | Texto único versionado |
| ESP-12 | Inventário pós-salvar | “Ativos atribuídos no inventário” não cita tela/filtro | CT014 | Nomear menu/coluna de status do ativo após atribuição |
| ESP-13 | Gerar Termos sem seleção | Não define botão desabilitado vs alerta | CT031 | Preferir botão disabled + tooltip |
| ESP-14 | Rede / VPN | Host de teste associado a `sslvpn.pge.ce.gov.br` | Agente e CI sem VPN não executam | Documentar pré-requisito (já no README) |
| ESP-15 | Login Devise | Formulário `#new_admin` (admins) | Escopo só perfil admin | Explicitar que o desafio não cobre outros papéis |

---

## 2. Melhorias sugeridas de produto (testabilidade e qualidade)

| ID | Área | Sugestão | Benefício |
|---|---|---|---|
| PROD-01 | Seletores | Atributos `data-cy` (ex.: `data-cy="login-submit"`, `data-cy="btn-gerar-termos"`) | Evita `#new_admin > div:nth-child(5) > input`, que quebra se o Devise ganhar um `div` |
| PROD-02 | Login | Manter `#admin_email` e `#admin_password` (já estáveis) | Page Object simples |
| PROD-03 | Mensagens | Catálogo fixo de toasts/erros (obrigatório, sem dados, termo, cancelar) | Asserts sem regex frouxa |
| PROD-04 | Massa QA | Área/subárea/colaborador/ativos `QA-AUTO` que não entrem em uso humano | Menos flake em ambiente compartilhado |
| PROD-05 | CPF | Prefill e máscara; não exigir digitação no termo se o colaborador já tem CPF | HU03 alinhada ao cadastro |
| PROD-06 | HU05 | Relatório com colunas próprias (ex.: atribuição, modalidade, quantidade de ativos) | Enunciado deixa de ser cópia da HU04 |
| PROD-07 | PDF | URL ou filename previsível; `Content-Disposition` estável | Menos `cy.intercept` de fallback |
| PROD-08 | Status | Enum único na UI e no PDF (`DISPONIVEL` vs `Disponível`) | Transição COM DEFEITO / substituição testável |
| PROD-09 | Acessibilidade | `label for` + ids em filtros de relatório (hoje só login foi inspecionado) | Locators por id |
| PROD-10 | HTTPS | Corrigir 500 em `https://testeqa.pge.ce.gov.br` ou redirecionar para HTTP de forma explícita | Evita configuração errada no Cypress |
| PROD-11 | Confirmação de save | Mensagem com id da atribuição ou tombo | CT014 objetivo |
| PROD-12 | Observações | Placeholder sugerindo prefixo de teste (opcional em homologação) | Facilita busca `QA-AUTO-` |

---

## 3. Locator de login (mapeamento vs robustez)

| Elemento | Informado | Risco | Uso na implementação futura |
|---|---|---|---|
| E-mail | `#admin_email` | Baixo | Primário |
| Senha | `#admin_password` | Baixo | Primário |
| Entrar | `#new_admin > div:nth-child(5) > input` | Alto (`nth-child`) | Registrar como observado; preferir `#new_admin input[type="submit"]` até existir `data-cy` |

---

## 4. Débito para fechamento pós-descoberta UI

- Textos de validação de login (CT045, CT046).
- Nomes exatos dos menus e rotas HU01–HU05.
- Colunas reais de HU05.
- Oráculo de CT013, CT024 e CT032.
- Amostra de PDF (anonimizada) para fixar strings do `pdf-parse`.
