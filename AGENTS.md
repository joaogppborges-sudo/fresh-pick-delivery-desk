<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- Admin modules are defined once in `src/lib/modules.ts`; sidebar, header, mobile nav, page heads and routing tests read from it — add a module there and its route file together so navigation and routes never drift.
- Domain status/payment/category vocabularies live in `src/lib/domain/status.ts` and drive `StatusBadge`; database enums should mirror them so UI labels stay consistent.
- Locale, currency and timezone formatting go through `src/lib/format.ts` only, so every date and price shares the same regional rules.
- Unimplemented actions use `PendingButton`/`DevBadge` and forms use `PreviewFormDialog` until persistence exists, so no control appears to work without doing anything.
- Lists use the shared `DataTable` (table on desktop, cards on mobile) instead of page-specific tables, to keep the mobile experience consistent.
- Every change follows `docs/VERSIONING.md`: log it under `[Não lançado]` in `docs/CHANGELOG.md` before implementing, then add a new `docs/versions/vX.Y.Z.md` and bump `package.json` and `src/lib/app-info.ts`; never edit past version files.
