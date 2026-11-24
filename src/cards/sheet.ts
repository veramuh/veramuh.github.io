// Flashcards aus einem Google Sheet laden.
//
// Aufbau des Sheets:
//   Tab "Themen":  Spalte A = Namen der Themen-Tabs (der Tab-Name ist auch der Titel auf der Seite)
//   Pro Thema ein Tab: Spalte A = Vorderseite (Frage), Spalte B = Rückseite (Antwort),
//                      Spalte C (optional) = Bild-URL zur Frage
//   Die erste Zeile jedes Tabs ist die Überschrift und wird ignoriert.
//
// Das Sheet muss freigegeben sein mit "Jeder mit dem Link: Betrachter".
// Die ID steht in der Sheet-URL: docs.google.com/spreadsheets/d/<ID>/edit

export const SHEET_ID = "1g8xL0WJmiisjd9hsCAVTcH0lnCBFZknLxVSNj-1LZ24";

const TOPICS_TAB = "Themen";

export interface Topic {
  title: string;
  tab: string;
  slug: string;
}

export interface Card {
  front: string;
  back: string;
  /** Optional: Bild-URL aus Spalte C, wird zur Frage angezeigt */
  image?: string;
}

// true, wenn zuletzt mindestens ein Tab aus der Offline-Kopie kam
let offline = false;
export const loadedOffline = () => offline;

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Minimaler CSV-Parser (unterstützt Anführungszeichen, Kommas und Zeilenumbrüche in Zellen)
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

async function fetchTab(tab: string): Promise<string[][]> {
  const url =
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:csv&headers=1&sheet=${encodeURIComponent(tab)}`;
  const notShared = new Error(
    'Das Google Sheet ist nicht erreichbar. Ist es mit „Jeder mit dem Link: Betrachter“ freigegeben?'
  );
  const cacheKey = `cards-cache-${tab}`;
  let text: string;
  try {
    let res: Response;
    try {
      res = await fetch(url);
    } catch {
      throw notShared;
    }
    if (!res.ok) throw new Error(`Tab "${tab}" konnte nicht geladen werden (${res.status})`);
    text = await res.text();
    if (text.trimStart().startsWith("<")) throw notShared; // Google-Loginseite statt CSV
    try {
      localStorage.setItem(cacheKey, text);
    } catch {
      /* Speicher voll oder gesperrt: dann eben ohne Offline-Kopie */
    }
  } catch (e) {
    // Offline (z.B. im Zug): zuletzt geladene Kopie verwenden, falls vorhanden
    let cached: string | null = null;
    try {
      cached = localStorage.getItem(cacheKey);
    } catch {
      /* ignore */
    }
    if (cached === null) throw e;
    text = cached;
    offline = true;
  }
  const rows = parseCsv(text);
  return rows
    .slice(1) // Überschrift
    .map((r) => r.map((c) => c.trim()))
    .filter((r) => r[0]);
}

// Beispielinhalte, solange noch keine SHEET_ID eingetragen ist
const DEMO: Record<string, { title: string; cards: Card[] }> = {
  "Staatskunde CH": {
    title: "Staatskunde CH",
    cards: [
      { front: "Wie viele Mitglieder hat der Bundesrat?", back: "7" },
      { front: "Wie heissen die beiden Kammern des Parlaments?", back: "Nationalrat und Ständerat" },
      { front: "Wie viele Sitze hat der Nationalrat?", back: "200" },
      { front: "Wie viele Unterschriften braucht eine Volksinitiative?", back: "100'000 innert 18 Monaten" },
      { front: "Wie viele Kantone hat die Schweiz?", back: "26" },
    ],
  },
  "Stadt Zürich": {
    title: "Stadt Zürich",
    cards: [
      { front: "Wie viele Stadtkreise hat Zürich?", back: "12" },
      { front: "Welcher Fluss fliesst aus dem Zürichsee?", back: "Die Limmat" },
      { front: "Wie heisst das Frühlingsfest, bei dem der Böögg verbrannt wird?", back: "Sechseläuten" },
    ],
  },
};

export const isDemo = () => !SHEET_ID;

export async function loadTopics(): Promise<Topic[]> {
  offline = false;
  if (isDemo()) {
    return Object.keys(DEMO).map((tab) => ({ title: DEMO[tab].title, tab, slug: slugify(tab) }));
  }
  const rows = await fetchTab(TOPICS_TAB);
  return rows.map(([tab]) => ({ title: tab, tab, slug: slugify(tab) }));
}

export async function loadCards(tab: string): Promise<Card[]> {
  if (isDemo()) return DEMO[tab]?.cards ?? [];
  const rows = await fetchTab(tab);
  return rows
    .filter((r) => r[1])
    .map(([front, back, image]) => ({
      front,
      back,
      image: image && /^https?:\/\//.test(image) ? image : undefined,
    }));
}
