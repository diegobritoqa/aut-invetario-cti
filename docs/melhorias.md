# Melhorias e achados — Inventário CTI

Achados de especificação e de produto observados na execução de 07/10/2026.

## 1. Defeitos de produto

| ID | Onde | O que acontece | Severidade |
|---|---|---|---|
| DEF-01 | Nova atribuição | Ativo que já está na lista de tombos não vincula. Só conclui o cadastro um ativo criado na hora, em Ativos → Novo Ativo. | S2 |
| DEF-02 | Editar atribuição | O campo Atendido por (`#attended`) chega vazio e é obrigatório. Sem preenchê-lo, Salvar não grava. | S2 |
| DEF-03 | Gerar termos | Sem checkbox, ou sem tipo, o alerta é `Selecione um tipo de Termo e uma ou mais Atribuiçôes` (acento circunflexo). | S4 |
| DEF-04 | Termo PDF | Não há campo de CPF no modal. O PDF de responsabilidade sai sem CPF. | S2 |
| DEF-05 | Movimentação de ativos | O botão Pesquisar fica fora da área visível. Gerar Relatório, sem pesquisar antes, não envia área nem período e a tela avisa `Informe uma Área e/ou Período para gerar o pdf!`. | S2 |
| DEF-06 | Atribuições por área | A URL do PDF é gerada (`assignments_by_area_pdf`), mas o Chrome exibe `Falha ao carregar documento PDF.` | S2 |
| DEF-07 | Listagens | Coluna de colaborador e opções de área exibem texto com marcação de script e nomes muito longos, o que quebra a leitura da grade. | S3 |
| DEF-08 | HTTPS | `https://testeqa.pge.ce.gov.br` retorna 500. O acesso estável é HTTP. | S3 |

## 2. Lacunas de especificação

| ID | Tema | Achado | Sugestão |
|---|---|---|---|
| ESP-01 | HU04 e HU05 | O enunciado repete os critérios de Movimentação de Ativos em Atribuições por Área. Na aplicação são telas diferentes: a HU04 é uma grade; a HU05 é um painel sintético/analítico com gráficos. | Documentar cada relatório com colunas e filtros próprios. |
| ESP-02 | Período | O formato `dd/mm/aaaa` não diz se as duas datas são inclusivas. | Fixar dois campos, intervalo inclusivo e fuso de Fortaleza. |
| ESP-03 | Termo sem colaborador | A HU01 admite subárea sem colaborador; a HU03 pede nome e CPF no termo. | Definir se o termo bloqueia, usa o responsável da subárea ou aceita CPF manual. |
| ESP-04 | Salvar sem ativo | A HU01 pede um ou mais ativos, mas não descreve a mensagem. Na tela, Salvar sem ativo exibe `Ativo não informado!`. | Registrar essa mensagem como regra. |
| ESP-05 | Relatório sem dados | A mensagem de período ou área sem movimento não está especificada. | Publicar o texto único da tela vazia. |

## 3. Sugestões de testabilidade

| ID | Sugestão | Benefício |
|---|---|---|
| PROD-01 | Atributos `data-cy` nos botões de login, Gerar Termos, Pesquisar e Gerar Relatório. | O submit do login hoje depende de `#new_admin input[type="submit"]`; `nth-child` quebra se o formulário ganhar um bloco. |
| PROD-02 | Catálogo fixo de mensagens (login, obrigatório, termo, relatório). | A assertiva deixa de depender de texto com acento irregular. |
| PROD-03 | Massa de área, subárea, colaborador e ativo reservada a teste. | Reduz interferência no ambiente compartilhado. |
| PROD-04 | CPF preenchido a partir do colaborador, com máscara. | O termo deixa de sair em branco. |
| PROD-05 | Layout dos filtros de relatório visível em 100% de zoom, com Pesquisar na mesma linha. | O usuário encontra o botão sem reduzir o zoom. |
| PROD-06 | PDF com `Content-Type: application/pdf` válido. | O visualizador do Chrome consegue abrir o arquivo. |
