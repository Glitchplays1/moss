# Moss — Friend AI

A family-friendly chatbot that lives in one HTML page. Moss remembers your chat on this device, looks up Wikipedia, links Minecraft YouTube videos, opens Allrecipes, and already knows a few facts about Minecraft, FNAF, MrBeast, and Saurians Studio.

**Repo:** https://github.com/Glitchplays1/moss

**Live page:** https://glitchplays1.github.io/moss/

## Open it on your computer

1. Download `friend-ai.html` (or open `index.html`)
2. Double-click the file
3. Chat in the box at the bottom

## Memory storage

Moss keeps memory in your browser:

- Chat history comes back after refresh
- Facts you teach with `remember that ...`
- Your name if you say `my name is ...`
- Last topic for follow-ups like `who made it?`
- **Download memory file** saves `moss-memory.json`
- **Load memory file** restores that JSON on another computer
- **Wipe all memory** clears storage on this device

Memory stays on the computer you used. It is not uploaded to GitHub.

## What you can ask

- When was Minecraft made?
- Show me Minecraft YouTube videos
- How many subscribers does MrBeast have?
- Tell me about Saurians Studio
- What is FNAF? then Who made it?
- Give me a chocolate chip cookie recipe
- remember that my favorite game is Minecraft
- my name is Alex
- what do you remember
- forget Minecraft

## How it works

Moss is HTML + CSS + JavaScript (not a giant cloud AI):

- Memory storage uses `localStorage`
- Wikipedia lookups when the browser allows them
- YouTube and Allrecipes search links

## Files

| File | What it is |
| --- | --- |
| `index.html` | GitHub Pages home (opens the chat) |
| `friend-ai.html` | The Moss chat app |
| `README.md` | This guide |
| `LICENSE` | License |
| `.github/workflows/static.yml` | Publishes the site |
