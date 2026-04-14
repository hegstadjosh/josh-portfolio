---
name: condense-notes
description: Condense lecture notes into documentation-style reference guides. Use when the user wants to turn verbose lecture materials into concise, exam-ready study references.
allowed-tools: Bash(~/.claude/skills/extract-image/extract-image *)
user-invocable: true
argument-hint: "<source file(s)> [output path]"
---

# Condense Lecture Notes

Transforms lecture notes into concise, documentation-style reference files. All technical content preserved, fluff removed.

## Directive

- Strip pedagogical scaffolding (no "let's look at...", "as you can see...", motivation, repeated explanations)
- Keep every technical fact, rule, code example, and edge case
- Keep concise but CLEAR explanations of *why* things work the way they do — someone reading this without having seen the lecture should still understand the concepts
- Use examples to illustrate points, not just bare code snippets
- Format as reference: concise headers, bullet points, tables, annotated code blocks
- Preserve all gotchas — prime exam material
- Man page tone, not classroom presentation. Same info, fewer words — but never at the cost of clarity.

## Reading PDFs

Read PDFs in small chunks using `Read(pages: "N-M")`. The pages parameter you pass is the only reliable source of page numbers — PDF content itself may not contain visible page numbers.

## Diagrams

When source materials contain diagrams or figures worth preserving, use the `/extract-image` skill to extract them. The `--page-range` you pass to extract-image must exactly match the `pages` parameter from your `Read()` call (e.g. if you called `Read(pages: "5-10")`, pass `--page-range 5-10`). Embed with `![[filename.png]]` in the appropriate sections.

## Output

- Markdown file, Obsidian-compatible
- Images in a sibling `images/` directory
