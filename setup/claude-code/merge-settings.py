#!/usr/bin/env python3
"""Merge setup/claude-code/settings.json into ~/.claude/settings.json.

Adds the jutsu marketplace and enables its plugins. Keys already in the target
keep their values, except the ones this file sets. Writes a .bak copy first.

    python3 setup/claude-code/merge-settings.py [target]
"""
import json
import shutil
import sys
from pathlib import Path

source = json.loads((Path(__file__).parent / "settings.json").read_text())
target = Path(sys.argv[1] if len(sys.argv) > 1 else Path.home() / ".claude" / "settings.json")

current = json.loads(target.read_text()) if target.exists() else {}
if target.exists():
    shutil.copy2(target, target.with_name(target.name + ".bak"))

for key, value in source.items():
    if isinstance(value, dict):
        current.setdefault(key, {}).update(value)
    else:
        current[key] = value

target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(json.dumps(current, indent=2) + "\n")
print(f"Merged {', '.join(source)} into {target}")
