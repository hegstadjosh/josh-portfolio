---
name: second-opinion
description: Get a different perspective from other LLMs (GPT, Gemini, Claude Opus, Grok) on design decisions, architecture, debugging, or judgment calls
user-invocable: true
---

# Second Opinion

Get an outside perspective from another LLM when you're deep in a problem and might have tunnel vision.

## Usage

```
/second-opinion Should I use WebSockets or SSE for streaming?
/second-opinion --gemini Is this schema going to scale?
/second-opinion --opus Am I overcomplicating this?
/second-opinion --grok Any edge cases I'm missing?
/second-opinion --all What's the best approach here?
```

## How to Execute

Run the Python script at `~/.claude/skills/second-opinion/second_opinion.py`:

```bash
# Default (GPT-5.4)
python3 ~/.claude/skills/second-opinion/second_opinion.py "the question or context here"

# Gemini
python3 ~/.claude/skills/second-opinion/second_opinion.py --gemini "the question"

# Claude Sonnet (via OpenRouter)
python3 ~/.claude/skills/second-opinion/second_opinion.py --sonnet "the question"

# All three in parallel
python3 ~/.claude/skills/second-opinion/second_opinion.py --all "the question"

# Pipe context in
echo "context here" | python3 ~/.claude/skills/second-opinion/second_opinion.py --all
```

Include relevant context in the question — code snippets, the decision at hand, what you've already considered. The script prepends a meta-prompt that tells the other model to think holistically and challenge assumptions.

Present the output to the user, then add your own synthesis at the end — where the models agree, disagree, and what you'd recommend.

## Setup

### 1. Get API keys (only for the models you want)

| Model | Get key at | Cost |
|-------|-----------|------|
| GPT-5.4 (default) | https://platform.openai.com/api-keys | Pay-per-use |
| Gemini 2.5 Pro | https://aistudio.google.com/apikey | Free tier (1000 req/day) |
| Claude Sonnet 4.6 | https://console.anthropic.com/settings/keys | Pay-per-use |

### 2. Add to your shell

```bash
# Add whichever keys you got to ~/.zshrc (or ~/.bashrc)
echo 'export OPENAI_API_KEY="sk-..."' >> ~/.zshrc
echo 'export GEMINI_API_KEY="AI..."' >> ~/.zshrc
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc
```

### 3. Install the skill

Copy the `second-opinion/` folder to `~/.claude/skills/second-opinion/`. That's it — no dependencies beyond Python 3.
