# Política de versionamento

O Horta Delivery segue **SemVer — MAJOR.MINOR.PATCH**.

| Tipo  | Quando incrementar | Exemplo |
| ----- | ------------------ | ------- |
| MAJOR | Mudança incompatível (quebra de dados, fluxo ou integração existente) | 1.4.2 → 2.0.0 |
| MINOR | Nova funcionalidade compatível | 1.0.0 → 1.1.0 |
| PATCH | Correção compatível, sem nova funcionalidade | 1.1.0 → 1.1.1 |

## Processo para cada alteração

1. **Antes de alterar:** registrar a mudança planejada e a versão de destino na seção
   `[Não lançado]` do `docs/CHANGELOG.md`.
2. **Implementar** a alteração.
3. **Ao concluir:**
   - mover o registro de `[Não lançado]` para uma nova seção `[X.Y.Z] — AAAA-MM-DD`;
   - criar `docs/versions/vX.Y.Z.md` (escopo, páginas, decisões, pendências);
   - atualizar `version` em `package.json` e `APP_VERSION` em `src/lib/app-info.ts`.
4. **Nunca** sobrescrever nem apagar arquivos de versões anteriores em `docs/versions/`.
   Correções em uma versão publicada geram uma nova versão PATCH.

## Repositório de código

O projeto está preparado para versionamento com Git (histórico de commits por alteração).
A conexão com o GitHub é feita pelo editor do Lovable e **não está conectada nesta versão**.
Quando conectada, recomenda-se criar uma tag `vX.Y.Z` para cada versão registrada aqui.
