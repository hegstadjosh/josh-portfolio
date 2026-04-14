---
name: study-guide
description: Create richly illustrated study guides from course materials (syllabi, textbooks, readings, lecture notes). Invoke when the user needs to prepare for an exam or wants study materials built from their sources.
---

# Study Guide Builder

This skill covers the full pipeline: extracting source material, writing guides, and illustrating them. Adapt the steps to what's needed — sometimes you're starting from scratch, sometimes adding images to existing guides, sometimes just one week.

## Key Principles

- **One agent per unit** (week, chapter, topic). Each guide needs deep reading of its sources — a single agent skimming 7 units produces garbage. Parallelize across units, not within them.
- **Extract text first, then send to agents.** PDFs (especially scanned ones) are too large/media-heavy for agents to read directly. Pre-extract to .txt files so agents work with plain text.
- **Same image = same file.** If Ali ibn Abi Talib appears in 4 guides, all 4 embed `ali_ibn_abi_talib.jpg`. Build an image index to enforce this.
- **Generous with images.** Every significant person, event, place, or artifact gets one — not just one per section. Think richly illustrated textbook, not minimalist notes.
- **Never modify source text when adding images.** Only insert embed lines and captions.

## Phase 1: Gather and Prep Sources

Figure out what materials exist and what maps to what:
- Look for a syllabus, reading schedule, or similar to understand the structure
- Identify textbooks (full books → split by chapter), individual readings/PDFs, lecture slides
- Organize files by unit if not already done

**Text extraction** (critical for PDFs):
- Text-based PDFs: use PyMuPDF (`fitz`) to extract text
- Scanned/image PDFs: use `ocrmypdf --force-ocr --jobs 4` first, then extract
- Save as descriptive .txt files (e.g., `Rahman - Ch4 Law.txt`, `week 3 - Mernissi.txt`)
- A Python venv at `/tmp/pdfenv` with `pymupdf` and `ocrmypdf` has been used before — recreate if needed

## Phase 2: Write the Guides

Spin off one agent per unit. Each agent gets:
- The list of extracted .txt files relevant to its unit
- Clear instructions on structure (adapt to subject):
  - **Overview narrative** — the big picture, what ties the sources together
  - **Section for each source/reading** — detailed coverage with citations
  - **Key terms/people/concepts table** at the end
- Tell agents to be thorough, cite sources, and not impose arbitrary length limits

Output as Obsidian markdown. Store in per-unit folders if appropriate.

## Phase 3: Plan Images

Again, one agent per unit. Each agent:
1. Reads its study guide
2. Identifies every significant person/event/place/artifact
3. Writes a per-unit image index (`image_index_wkN.md`) with:
   - Filename (descriptive, subject-based, not unit-based)
   - Subject
   - AI generation prompt
4. Inserts `![[filename.jpg|200]]` embeds with italic captions into the guide
5. Checks existing images first to avoid regenerating

**Image placement rule**: Every section or subsection dedicated to a specific entity gets that entity's image at the top — not just the first mention. If al-Ghazali has sections in Week 5, 6, and 7, his image appears in all three. If a reading section covers a person's life, their portrait goes at the top of that section even if it appeared earlier in the overview. The goal is that whenever you're reading/taking notes about someone, you see their face.

Then combine indexes: deduplicate filenames across units so the same subject always maps to one file. Fix any embed mismatches in the guides.

**Prompt style guide** (adapt to subject):
- Historical/humanities figures: "Ottoman miniature painting portrait of..." or era-appropriate styles
- Science/math: diagrams, visualizations, apparatus illustrations
- CS/engineering: architecture diagrams, flowcharts
- The style should match what a good textbook in that field would use

## Phase 4: Generate Images

**Requires image generation capability.** Two options:

1. **Replicate MCP** (`mcp__replicate__create_predictions`): Use if the MCP server is available. Model `google/nano-banana-2`, inputs: `prompt`, `aspect_ratio: "1:1"`, `output_format: "jpg"`. Set `Prefer: "wait"`. Download the output URL with `curl -sL`. Good for small batches or when agents handle generation.

2. **Python script hitting the Replicate API directly**: Better for large batches (50+ images). Use `ThreadPoolExecutor` for parallelism, `Prefer: wait` header, and retry on 429s. Needs a `REPLICATE_API_TOKEN` (ask the user). See `/tmp/generate_images.py` for a working example if it still exists.

If neither Replicate MCP nor an API token is available, **tell the user** rather than silently skipping images or trying a different approach.

## Extracting Visuals from Source Materials

When source PDFs contain diagrams, figures, or other visual content worth keeping (memory layouts, class hierarchies, charts, etc.), use the `/extract-image` skill to pull them directly rather than recreating them. This is especially useful for CS/engineering/math materials where the original diagrams are precise and hard to reproduce. Run extractions in the background while writing the guide.

## Lessons Learned

- Agents hit "too much media" errors reading PDFs with images. Always extract text first.
- Scanned PDFs often have 0 extractable text — check before assuming text extraction worked. OCR if needed.
- Wikimedia/Openverse have very sparse results for niche historical figures. AI generation is more reliable.
- Unicode characters in filenames break things silently. Clean filenames before processing.
- When combining work from multiple agents, always do a deduplication pass. They will independently invent slightly different filenames for the same thing.
