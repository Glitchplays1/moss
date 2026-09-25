const logEl = document.getElementById("log");
const form = document.getElementById("form");
const input = document.getElementById("q");
const netEl = document.getElementById("net");

const KNOWN = {
  minecraft: { topic: "Minecraft", text: "Minecraft first appeared to the public on May 17, 2009 (Classic), created by Markus Notch Persson. The full Java Edition 1.0 release was November 18, 2011 at MineCon. It is a sandbox building game by Mojang Studios." },
  fnaf: { topic: "Five Nights at Freddy's", text: "Five Nights at Freddy's (FNAF) is a 2014 survival-horror game series created by Scott Cawthon. The first game came out on August 8, 2014." },
  mrbeast: { topic: "MrBeast", person: "MrBeast", text: "MrBeast (Jimmy Donaldson) is one of the biggest YouTubers. Around September 2026 public trackers showed about 518 million subscribers. Counts change every day." },
  saurians: { topic: "Saurians Studio", person: "Saurians Studio", text: "Saurians Studio is a YouTube channel at youtube.com/@SauriansStudio-g7i. When this helper was built it had about 34 subscribers." }
};

const YOUTUBERS = {
  "mrbeast": { name: "MrBeast", handle: "@MrBeast", url: "https://www.youtube.com/@MrBeast", subs: "about 518 million (Sep 2026, changes daily)", height: "Public reports often list Jimmy Donaldson around 6'2 / 188 cm. Unofficial." },
  "mr beast": { name: "MrBeast", handle: "@MrBeast", url: "https://www.youtube.com/@MrBeast", subs: "about 518 million (Sep 2026, changes daily)", height: "Public reports often list Jimmy Donaldson around 6'2 / 188 cm. Unofficial." },
  "saurians studio": { name: "Saurians Studio", handle: "@SauriansStudio-g7i", url: "https://www.youtube.com/@SauriansStudio-g7i", subs: "about 34 (when this AI was built)", height: "No public height listed." },
  "saurians": { name: "Saurians Studio", handle: "@SauriansStudio-g7i", url: "https://www.youtube.com/@SauriansStudio-g7i", subs: "about 34 (when this AI was built)", height: "No public height listed." },
  "dream": { name: "Dream", handle: "@Dream", url: "https://www.youtube.com/@Dream", subs: "Search YouTube for the live count", height: "Dream has said he is around 6'3 / 191 cm. Unofficial." },
  "markiplier": { name: "Markiplier", handle: "@markiplier", url: "https://www.youtube.com/@markiplier", subs: "Search YouTube for the live count", height: "Public listings often say about 6'2 / 188 cm. Unofficial." }
};

const SPELL = { spall:"spell", recpie:"recipe", recipie:"recipe", minecaft:"Minecraft", minecraf:"Minecraft", youtobe:"YouTube", suscribers:"subscribers", hieght:"height", fnaff:"FNAF" };

function linkCards(items) {
  return "<div class=\"cards\">" + items.map(i => "<div class=\"card\"><a href=\"" + i.href + "\" target=\"_blank\" rel=\"noopener\">" + esc(i.title) + "</a><div>" + esc(i.sub || "") + "</div></div>").join("") + "</div>";
}
function youtubeSearch(q) { return "https://www.youtube.com/results?search_query=" + encodeURIComponent(q); }
function wikiSearch(q) { return "https://en.wikipedia.org/wiki/Special:Search?search=" + encodeURIComponent(q); }
function recipeSearch(q) { return "https://www.allrecipes.com/search?q=" + encodeURIComponent(q); }
function socialblade(handle) { return "https://socialblade.com/youtube/handle/" + encodeURIComponent(handle.replace(/^@/, "")); }
function normalize(s) { return s.toLowerCase().replace(/[^\w\s'@]/g, " ").replace(/\s+/g, " ").trim(); }
function correctSpelling(text) {
  return { text: text.split(/(\s+)/).map(w => { const key = w.toLowerCase().replace(/[^a-z]/g, ""); return SPELL[key] && SPELL[key].toLowerCase() !== key ? SPELL[key] : w; }).join("") };
}
function detectTopic(t) {
  const n = normalize(t);
  if (/\b(fnaf|five nights|freddy)\b/.test(n)) return KNOWN.fnaf;
  if (/\bminecraft|mine craft|mojang|notch\b/.test(n)) return KNOWN.minecraft;
  if (/\bmr\s*beast|mrbeast|jimmy donaldson\b/.test(n)) return KNOWN.mrbeast;
  if (/\bsaurians?( studio)?\b/.test(n)) return KNOWN.saurians;
  return null;
}
function findPerson(t) {
  const n = normalize(t);
  for (const key of Object.keys(YOUTUBERS)) { if (n.includes(key)) return YOUTUBERS[key]; }
  const m = n.match(/how (?:tall|old|many subs(?:cribers)?) (?:is|does|do) (.+?)(?: have|$)/);
  if (m) return { name: m[1].trim(), handle: null, url: wikiSearch(m[1]) };
  return null;
}
async function wikiSummary(title) {
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_"));
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!res.ok) throw new Error("wiki");
  const data = await res.json();
  return { title: data.title, extract: data.extract, url: (data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page) || wikiSearch(title) };
}
async function wikiSearchTitle(q) {
  const url = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&origin=*&search=" + encodeURIComponent(q);
  const res = await fetch(url);
  if (!res.ok) throw new Error("search");
  const data = await res.json();
  return data[1] && data[1][0] ? data[1][0] : q;
}
function minecraftVideos(extra) {
  const q = extra ? ("Minecraft " + extra) : "Minecraft";
  return linkCards([
    { title: "YouTube: " + q + " videos", href: youtubeSearch(q + " gameplay"), sub: "Family search" },
    { title: "Minecraft official channel", href: "https://www.youtube.com/@Minecraft", sub: "Official videos" },
    { title: "Saurians Studio", href: "https://www.youtube.com/@SauriansStudio-g7i", sub: "About 34 subs when saved" }
  ]);
}
function greeting(first) {
  const name = memory.profile.name ? ", " + esc(memory.profile.name) : "";
  addMsg("ai", "Hey" + name + ", I'm <b>Moss</b>. Chat and facts are saved in this browser memory storage. Say <i>remember that ...</i> or <i>my name is ...</i>.", first);
}
function followUpRewrite(raw) {
  const n = normalize(raw);
  const topic = memory.lastTopic || memory.lastPerson;
  if (!topic) return raw;
  if (/^(who made it|who created it|who is it made by)\??$/.test(n)) return "Who created " + topic + "?";
  if (/^(what is it|what is that|explain it)\??$/.test(n)) return "What is " + topic + "?";
  if (/^(how old is (he|she|they|it)|how old)\??$/.test(n)) return "How old is " + (memory.lastPerson || topic) + "?";
  if (/^(how tall is (he|she|they|it)|how tall)\??$/.test(n)) return "How tall is " + (memory.lastPerson || topic) + "?";
  if (/^(how many subscribers|how many subs)\??$/.test(n)) return "How many subscribers does " + (memory.lastPerson || topic) + " have?";
  if (/^(when (was|is) it (made|released)|when did it come out)\??$/.test(n)) return "When was " + topic + " made?";
  return raw;
}
async function reply(userText) {
  let text = followUpRewrite(correctSpelling(userText).text.trim());
  const n = normalize(text);
  if (/^(my name is|i am|i'm|im)\s+/.test(n)) {
    const name = text.replace(/^(my name is|i am|i'm|im)\s+/i, "").replace(/[!.]+$/, "").trim();
    if (name) { memory.profile.name = name.slice(0, 40); saveStore(); return "Nice to meet you, <b>" + esc(memory.profile.name) + "</b>. Saved in memory storage."; }
  }
  if (n.startsWith("remember that ") || n.startsWith("remember ")) {
    const fact = text.replace(/^remember( that)? /i, "").trim();
    if (fact) { memory.taught.push({ id: "f-" + Date.now(), text: fact, created: Date.now() }); saveStore(); return "Saved to memory storage: <b>" + esc(fact) + "</b>"; }
  }
  if (n.startsWith("forget ")) {
    const needle = n.replace(/^forget /, "");
    const before = memory.taught.length;
    memory.taught = memory.taught.filter(f => !normalize(f.text).includes(needle));
    saveStore();
    return before === memory.taught.length ? "I did not find that fact." : "Forgot matching facts.";
  }
  const taughtHit = memory.taught.find(f => n.includes(normalize(f.text).slice(0, 24)) || normalize(f.text).includes(n));
  if (n.startsWith("what do you remember") || n === "memory" || n === "show memory") {
    const facts = memory.taught.map(f => f.text);
    const last = memory.lastTopic ? "Last topic: " + memory.lastTopic : "No last topic yet.";
    const name = memory.profile.name ? "Your name: " + memory.profile.name + "<br>" : "";
    return name + (facts.length ? "Saved facts:<br>- " + facts.map(esc).join("<br>- ") + "<br><br>" : "No taught facts yet.<br>") + last;
  }
  if (/\b(hello|hi|hey|yo)\b/.test(n) && n.split(" ").length < 6) return "Hey" + (memory.profile.name ? " " + esc(memory.profile.name) : "") + "! Ask me about Minecraft, recipes, or YouTubers.";
  if (/\b(who are you|what are you|your name)\b/.test(n)) return "I'm Moss. I use rules, memory storage on this device, and Wikipedia.";
  if (/\b(youtube|video|videos|vid|vids|watch)\b/.test(n)) {
    const extra = text.replace(/.*(youtube|videos?|vids?|watch)\s*(for|about|of)?/i, "").trim();
    const q = extra && extra.length > 1 ? extra : "Minecraft";
    memory.lastTopic = /minecraft/i.test(q) ? "Minecraft" : q;
    return "YouTube links:<br>" + minecraftVideos(/minecraft/i.test(q) ? extra.replace(/minecraft/ig, "").trim() : q);
  }
  if (/\b(recipe|recipes|cook|how do i make|how to make)\b/.test(n)) {
    let dish = text.replace(/.*?(recipe for|how do i make|how to make|cook)\s*/i, "");
    dish = dish.replace(/recipe[s]?/ig, "").trim() || "easy dinner";
    memory.lastTopic = dish;
    return "Allrecipes:<br>" + linkCards([{ title: "Allrecipes search: " + dish, href: recipeSearch(dish), sub: "www.allrecipes.com" }, { title: "Allrecipes home", href: "https://www.allrecipes.com/" }]);
  }
  if (/\b(subscriber|subscribers|subs)\b/.test(n)) {
    const person = findPerson(text) || (memory.lastPerson && YOUTUBERS[normalize(memory.lastPerson)]) || null;
    if (person) {
      memory.lastPerson = person.name; memory.lastTopic = person.name;
      return (person.subs ? person.name + " has <b>" + esc(person.subs) + "</b>. " : "No locked count for " + esc(person.name) + ". ") + "Counts change.<br>" + linkCards([{ title: person.name + " on YouTube", href: person.url }, { title: "Stats search", href: person.handle ? socialblade(person.handle) : youtubeSearch(person.name + " subscribers") }]);
    }
    const guess = text.replace(/.*(?:how many subscribers|how many subs)\s*/i, "").replace(/\shave\??/i, "").trim();
    memory.lastPerson = guess; memory.lastTopic = guess;
    return "Check live counts here:<br>" + linkCards([{ title: "YouTube search", href: youtubeSearch(guess) }]);
  }
  if (/\b(how tall|height)\b/.test(n)) {
    const person = findPerson(text);
    const name = person ? person.name : (memory.lastPerson || text.replace(/how tall is/i, "").trim());
    memory.lastPerson = name; memory.lastTopic = name;
    if (person && person.height) return esc(person.name) + ": " + esc(person.height);
    try { const w = await wikiSummary(await wikiSearchTitle(name)); return "Wikipedia for <b>" + esc(w.title) + "</b>:<br>" + esc(w.extract || ""); } catch (e) { return "Could not fetch height."; }
  }
  if (/\b(how old|age of)\b/.test(n)) {
    const person = findPerson(text);
    const name = person ? person.name : (memory.lastPerson || text.replace(/how old is/i, "").trim());
    memory.lastPerson = name; memory.lastTopic = name;
    try { const w = await wikiSummary(await wikiSearchTitle(name)); return "<b>" + esc(w.title) + "</b><br>" + esc(w.extract || ""); } catch (e) { return "Could not reach Wikipedia."; }
  }
  const known = detectTopic(text);
  if (known) { memory.lastTopic = known.topic; if (known.person) memory.lastPerson = known.person; return known.text; }
  if (taughtHit && n.length < 80) return "From memory storage: " + esc(taughtHit.text);
  const cleaned = text.replace(/^(what is|what's|who is|who's|tell me about|explain|when was|when did)\s+/i, "").replace(/\?+$/, "");
  memory.lastTopic = cleaned;
  try {
    const w = await wikiSummary(await wikiSearchTitle(cleaned));
    netEl.textContent = "Looked up Wikipedia";
    return "Wikipedia for <b>" + esc(w.title) + "</b>.<br><br>" + esc(w.extract || "No summary.");
  } catch (e) {
    netEl.textContent = "Offline lookup";
    return "Could not reach Wikipedia. Memory storage still works.";
  }
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addMsg("me", esc(text));
  const tip = document.createElement("div");
  tip.className = "typing";
  tip.textContent = "Moss is thinking…";
  logEl.appendChild(tip);
  try { const html = await reply(text); tip.remove(); addMsg("ai", html); }
  catch (err) { tip.remove(); addMsg("ai", "Something broke on that lookup."); }
});
document.getElementById("clear").onclick = () => { logEl.innerHTML = ""; memory.messages = []; memory.lastTopic = ""; memory.lastPerson = ""; saveStore(); greeting(); };
document.getElementById("forget").onclick = () => { memory.taught = []; saveStore(); addMsg("ai", "Taught facts cleared."); };
document.getElementById("wipeAll").onclick = () => { wipeMemory(); greeting(); addMsg("ai", "All memory storage on this device is empty now."); };
document.getElementById("exportMem").onclick = exportMemory;
document.getElementById("importMem").onclick = () => document.getElementById("importFile").click();
document.getElementById("importFile").onchange = (ev) => {
  const file = ev.target.files && ev.target.files[0];
  if (!file) return;
  importMemoryFile(file, (err) => { addMsg("ai", err ? "That file was not valid Moss memory." : "Loaded memory file."); });
  ev.target.value = "";
};
document.querySelectorAll("button.chip[data-q]").forEach(btn => { btn.onclick = () => { input.value = btn.getAttribute("data-q"); form.requestSubmit(); }; });
restoreChat();
