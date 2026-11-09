import { knownSkillPhrases } from "./skills-library";

// Compares the words and phrases in a job description with a CV, entirely in the browser.
// It is a transparent text comparison: it does not imitate any applicant tracking system,
// and it cannot tell whether a skill is genuinely evidenced in the CV.

const STOPWORDS = new Set(`a about above across after again against all also am an and any are as at be because been before being below between both but by can could did do does doing down during each either etc few for from further get gets had has have having he her here hers him his how i if in into is it its itself just let like may me might more most much must my no nor not now of off on once one only or other our ours out over own per same shall she should so some such than that the their them then there these they this those through to too under until up upon us very via was we were what when where whether which while who whom why will with within without would yet you your yours eg ie e.g i.e including include includes included
ability able apply applicant applicants benefit benefits candidate candidates career company competitive day days description desirable duties duty environment equal essential excellent experience experienced field full good great help highly hire hiring hour hours ideal ideally join job jobs key knowledge looking make making need needed needs new offer offers opportunity opportunities part people plus position positions preferred proven provide providing related relevant require required requirement requirements responsibilities responsibility responsible role roles salary seeking skill skills strong successful support team teams time type use using want way well work working year years week weeks month months based ensure ensuring take taking best high level we're you'll you're they're it's we'll what's within across everyday every various variety other others etc. understanding demonstrated demonstrable minimum least must-have nice bonus permanent temporary contract hybrid remote office location end`.split(/\s+/));

// Common multi-word terms that are useful to recognise as one keyword.
const EXTRA_PHRASES = ["customer service", "user experience", "customer experience", "attention to detail", "problem solving", "stakeholder management", "project management", "data analysis", "written communication", "verbal communication", "team leadership", "people management", "budget management", "content creation", "social media", "machine learning", "web development", "software development", "quality assurance", "health and safety", "manual handling", "first aid", "driving licence", "driver's license", "microsoft office", "google workspace", "account management", "business development", "supply chain", "front end", "back end", "full stack", "unit testing", "test automation", "agile", "scrum", "safeguarding", "time management", "end to end testing"];

interface Token { stem: string; lower: string; original: string }

function stem(word: string): string {
  if (word.length <= 3 || /[+#./0-9]/.test(word)) return word;
  return word.replace(/'s$/, "").replace(/ies$/, "y").replace(/(?<=[a-z]{3})(?:ing|ed|es|s)$/, "");
}

/** Split text into segments (so phrases never cross a sentence or bullet), then into tokens. */
function segments(text: string): Token[][] {
  return text.replace(/[‘’]/g, "'").replace(/[‐-―-]/g, " ").split(/[\n\r•·;:!?()[\]{}"“”|]+|[.,](?=\s|$)/).map(segment => (segment.match(/[\p{L}\p{N}][\p{L}\p{N}+#./']*[\p{L}\p{N}+#]|[\p{L}\p{N}]/gu) ?? [])
    .map(original => { const lower = original.toLowerCase().replace(/'s$/, ""); return { original, lower, stem: stem(lower) }; }))
    .filter(tokens => tokens.length);
}

function phraseStems(phrase: string): string[] {
  return segments(phrase).flat().map(token => token.stem);
}

function countSequence(segmentsList: Token[][], stems: string[]): number {
  let count = 0;
  for (const tokens of segmentsList) for (let i = 0; i + stems.length <= tokens.length; i++) {
    if (stems.every((value, offset) => tokens[i + offset].stem === value)) count++;
  }
  return count;
}

const PHRASES = [...new Set([...knownSkillPhrases.keys(), ...EXTRA_PHRASES])].map(phrase => ({ phrase, stems: phraseStems(phrase), label: knownSkillPhrases.get(phrase) })).filter(item => item.stems.length && !(item.stems.length === 1 && STOPWORDS.has(item.phrase)));

export interface Keyword { term: string; key: string; count: number; kind: "phrase" | "word" }
export interface KeywordMatch extends Keyword { inCV: number }

/**
 * The most distinctive terms in a job description: recognised skills and tools, phrases that
 * repeat, and words that repeat or look technical (acronyms, versions, C#, Node.js).
 */
export function extractKeywords(text: string, limit = 25): Keyword[] {
  const parts = segments(text); const tokens = parts.flat();
  if (!tokens.length) return [];
  const acronyms = new Set(tokens.filter(token => /^[A-Z][A-Z0-9+#]{1,5}$/.test(token.original) && token.original !== "I").map(token => token.lower));
  // CamelCase words such as GraphQL or PowerShell are usually product or technology names.
  const camel = new Set(tokens.filter(token => /^\p{Lu}?\p{Ll}+\p{Lu}/u.test(token.original)).map(token => token.stem));
  const surface = new Map<string, string>();
  const candidates = new Map<string, Keyword & { score: number; words: string[] }>();
  const add = (key: string, term: string, count: number, kind: Keyword["kind"], score: number, words: string[]) => {
    const existing = candidates.get(key);
    if (!existing || existing.score < score) candidates.set(key, { key, term, count, kind, score, words });
  };
  // Original wording for display: the first time a sequence of stems appears in the text.
  const display = (stems: string[]) => {
    const id = stems.join(" ");
    if (surface.has(id)) return surface.get(id)!;
    for (const segment of parts) for (let i = 0; i + stems.length <= segment.length; i++) {
      if (stems.every((value, offset) => segment[i + offset].stem === value)) {
        const text = segment.slice(i, i + stems.length).map(token => acronyms.has(token.lower) || camel.has(token.stem) ? token.original : token.lower).join(" ");
        surface.set(id, text); return text;
      }
    }
    return id;
  };
  const priority = (stems: string[]) => parts.some(segment => segment.some(token => /^(require|essential|must|proficien|experience|knowledge|familiar|skill)/.test(token.lower)) && countSequence([segment], stems) > 0) ? 1 : 0;

  for (const { stems, label } of PHRASES) {
    const count = countSequence(parts, stems);
    if (count) add(stems.join(" "), label ?? display(stems), count, stems.length > 1 ? "phrase" : "word", count * 2 + 3 + priority(stems), stems);
  }
  const isUseful = (token: Token) => !STOPWORDS.has(token.lower) && !/^\d+$/.test(token.lower) && (token.lower.length >= 3 || acronyms.has(token.lower));
  const bigrams = new Map<string, number>(), words = new Map<string, number>();
  for (const segment of parts) segment.forEach((token, index) => {
    if (!isUseful(token)) return;
    words.set(token.stem, (words.get(token.stem) ?? 0) + 1);
    const next = segment[index + 1];
    if (next && isUseful(next)) { const key = `${token.stem} ${next.stem}`; bigrams.set(key, (bigrams.get(key) ?? 0) + 1); }
  });
  for (const [key, count] of bigrams) if (count >= 2 && !candidates.has(key)) add(key, display(key.split(" ")), count, "phrase", count * 1.5 + 1 + priority(key.split(" ")), key.split(" "));
  for (const [key, count] of words) {
    const technical = /[+#./0-9]/.test(key) || acronyms.has(key) || camel.has(key);
    if (candidates.has(key) || (count < 2 && !technical)) continue;
    add(key, display([key]), count, "word", count + (technical ? 1.5 : 0) + priority([key]), [key]);
  }
  // A single word already covered by a chosen phrase only stays when it is used much more on its own.
  const phrases = [...candidates.values()].filter(item => item.words.length > 1);
  const ranked = [...candidates.values()].filter(item => item.words.length > 1 || !phrases.some(phrase => phrase.words.includes(item.key) && item.count <= phrase.count + 1));
  return ranked.sort((a, b) => b.score - a.score || b.count - a.count || a.term.localeCompare(b.term)).slice(0, limit).map(({ term, key, count, kind }) => ({ term, key, count, kind }));
}

export function compareKeywords(job: string, cv: string, limit = 25) {
  const keywords = extractKeywords(job, limit); const cvParts = segments(cv);
  const results: KeywordMatch[] = keywords.map(keyword => ({ ...keyword, inCV: countSequence(cvParts, keyword.key.split(" ")) }));
  const matched = results.filter(item => item.inCV > 0), missing = results.filter(item => item.inCV === 0);
  return { keywords: results, matched, missing, rate: results.length ? Math.round(matched.length / results.length * 100) : 0 };
}
