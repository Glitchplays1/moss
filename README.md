# Moss — Friend AI

A family-friendly chatbot that lives in one HTML page. Moss remembers your chat on this device, looks up Wikipedia, links Minecraft YouTube videos, opens Allrecipes, and already knows a few facts about Minecraft, FNAF, MrBeast, and Saurians Studio.

**Repo:** https://github.com/Glitchplays1/moss

**Live page (after Pages is on):** https://glitchplays1.github.io/moss/

## Open it on your computer

1. Download `friend-ai.html` (or open `index.html`)
2. Double-click the file
3. Chat in the box at the bottom

## This is already on GitHub

The project lives in **Glitchplays1/moss**.

To update it later on your computer:

```bash
git clone https://github.com/Glitchplays1/moss.git
cd moss
# edit files
git add .
git commit -m "Update Moss"
git push
```

## Turn on the website

1. Open https://github.com/Glitchplays1/moss
2. Click **Settings** → **Pages**
3. Set source to **GitHub Actions**
4. Wait for the Action to finish (Actions tab)
5. Open https://glitchplays1.github.io/moss/

## What you can ask

- When was Minecraft made?
- Show me Minecraft YouTube videos
- How many subscribers does MrBeast have?
- Tell me about Saurians Studio
- What is FNAF? then Who made it?
- Give me a chocolate chip cookie recipe
- remember that my favorite game is Minecraft

## How it works

Moss is HTML + CSS + JavaScript (not a giant cloud AI):

- Remembers this chat in your browser
- Saves facts you teach with `remember that ...`
- Looks up Wikipedia when the browser allows it
- Gives YouTube and Allrecipes links

Subscriber counts change every day, so Moss gives a saved number plus a live search link.

## Files

| File | What it is |
| --- | --- |
| `index.html` | GitHub Pages home (opens the chat) |
| `friend-ai.html` | The Moss chat app |
| `README.md` | This guide |
| `LICENSE` | License |
| `.github/workflows/static.yml` | Publishes the site |

## License

See `LICENSE` in this repository.
