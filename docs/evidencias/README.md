# Evidências de execução

Pasta para prints nomeados por cenário. **Não** versionar senhas, cookies nem PDFs com CPF.

## Convenção

`docs/evidencias/<modulo>/CT{id}-{passo}.png`

Módulos: `login`, `hu01`, `hu02`, `hu03`, `hu04`, `hu05`.

Exemplos:

- `login/CT000-dashboard-pos-login.png`
- `hu01/CT001-cadastro-completo.png`
- `hu03/CT026-pdf-responsabilidade.png`

## Outros artefatos

| Origem | Caminho | Git |
|---|---|---|
| Prints manuais da matriz | esta pasta | sim (sem dado sensível) |
| Falha automática Cypress | `cypress/screenshots/` | não (gitignore na implementação) |
| Vídeo | `cypress/videos/` | não |
| PDF gerado | `cypress/downloads/` | não |

Lista completa de arquivos esperados: [cenarios.md](../cenarios.md) e [relatorio-execucao.md](../relatorio-execucao.md).
