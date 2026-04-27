# .obsidian/ — Obsidian app configuration

**Path:** `.obsidian/` (repo root)
**Owner:** Obsidian application
**Type:** Per-vault app settings (JSON)

## Files
- `app.json` — top-level app preferences (e.g. how links resolve, default view mode)
- `appearance.json` — theme, font sizes, accent colors
- `core-plugins.json` — which built-in Obsidian plugins are enabled
- `workspace.json` — current pane layout, open files, last-active tab. **Mutates frequently** — every time you switch panes Obsidian rewrites it.

## Notes
- These files are auto-managed by Obsidian; you rarely edit them by hand.
- `workspace.json` causes noisy git diffs because it changes on every UI interaction. Consider adding it to [[gitignore]] later if it becomes a problem (currently NOT ignored).
- Community plugins, if added later, would live under `.obsidian/plugins/` and have their own settings JSONs.

## Related
- [[skill-obsidian-vault-workflow]] — defines the protocol Obsidian renders
- [[skill-obsidian-markdown]] — syntax this app interprets
- [[skill-obsidian-bases]] — `.base` files this app renders as database views
- [[gitignore]] — candidate to extend if `workspace.json` churn becomes annoying
- [[vault-bootstrap]] — session that documented these
