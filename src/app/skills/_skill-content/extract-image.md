---
name: extract-image
description: Extract a specific image or diagram from a PDF file by describing it. Use this automatically when creating study guides from lecture PDFs that contain diagrams, figures, memory layouts, or other visual content worth preserving.
allowed-tools: Bash(~/.claude/skills/extract-image/extract-image *)
user-invocable: true
argument-hint: "--pdf <path> --page-range N-M --batch manifest.json"
---

# Extract Image from PDF

Extracts images/diagrams from a PDF by description. Two-pass: Gemini Pro finds the page + refines the description, Gemini Flash crops the diagram.

## Batch mode (preferred)

When extracting multiple diagrams from the same page range, use batch mode — **one Pro call for all descriptions**.

1. Write a JSON manifest file (e.g. `/tmp/extract-manifest.json`):
```json
[
  {"description": "first stack/heap diagram with .sz=0, empty MyString", "output": "/path/to/07-vec-init.png"},
  {"description": "second stack/heap diagram after push_back abc, with .sz=1", "output": "/path/to/07-vec-push-abc.png"}
]
```

2. Call:
```bash
~/.claude/skills/extract-image/extract-image \
  --pdf "/path/to/lecture.pdf" \
  --page-range 7-12 \
  --batch /tmp/extract-manifest.json
```

## Single mode

```bash
~/.claude/skills/extract-image/extract-image \
  --pdf "/path/to/lecture.pdf" \
  --description "memory layout diagram showing stack and heap" \
  --output "/path/to/output.png" \
  --page-range 3-8
```

## Arguments

- `--pdf`: Path to the PDF
- `--page-range`: Range of pages to search (e.g. "3-8"). Pass the range you read with Read().
- `--batch`: Path to JSON manifest (array of `{description, output}` objects)
- `--description` / `--output`: For single extraction mode
- `--page`: Exact page (skips Pro page-finding). Use only if certain.

## Output

One JSON line per extraction to stdout:
- `{"status": "ok", "method": "rasterize_crop", "path": "...", "page": N, "box": [...]}` on success
- `{"status": "not_found", ...}` if no match
- `{"status": "error", ...}` on failure

## How to use when building study guides

1. Read the PDF in chunks with Read() (e.g. pages 1-8, then 9-15)
2. For each chunk, note ALL diagrams you want to extract
3. Write a batch manifest with all descriptions from that chunk
4. Call extract-image once with `--batch` and `--page-range` matching your Read() range
5. Embed results in Obsidian with `![[filename.png]]`

**Descriptions must be UNAMBIGUOUS.** Include unique details that distinguish diagrams — specific values shown (.sz=0 vs .sz=1), labels, what's crossed out. You can also use ordinal position within the range: "first stack/heap diagram", "third memory layout", etc. Pro will refine the description to be page-specific before cropping.

**Batch is strongly preferred** over multiple single calls — it's ~1/N the cost for N diagrams in the same range.
