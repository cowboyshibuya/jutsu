# setup

The agent setup itself: what to put on a machine so every session starts the same way. Global `CLAUDE.md` instructions, settings, hooks, a status line, MCP servers to connect.

Nothing here installs on its own. Each file says where it goes and why; copy what you want. Keep it free of secrets, tokens and anything tied to one machine.

## Claude Code

| File | Goes into | What it does |
| --- | --- | --- |
| [`claude-code/settings.json`](claude-code/settings.json) | `~/.claude/settings.json` | Adds the jutsu marketplace and enables the `workflow`, `interface` and `web` plugins. Claude Code installs them on its next start. |
| [`claude-code/merge-settings.py`](claude-code/merge-settings.py) | Run it | Merges the file above into `~/.claude/settings.json` without touching other keys, after writing a `.bak` copy. |

On a new machine, from a checkout of this repository:

```bash
python3 setup/claude-code/merge-settings.py
```

On a remote machine without a checkout, copy both files over and run it there:

```bash
scp setup/claude-code/settings.json setup/claude-code/merge-settings.py <host>:/tmp/ && ssh <host> 'python3 /tmp/merge-settings.py'
```

Then start a new interactive Claude Code session there; it offers to install the declared plugins on start, and the `/` menu lists `workflow:cowboy-mode`. `claude plugin list` alone does not install them, so to have them ready without starting a session, install them once directly:

```bash
claude plugin marketplace add cowboyshibuya/jutsu && claude plugin install workflow@jutsu && claude plugin install interface@jutsu && claude plugin install web@jutsu
```

When a new skill group gets its plugin, add it to `enabledPlugins` here.
