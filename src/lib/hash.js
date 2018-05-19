/**
 * TODO: Make this better, maybe use a 3rd party.
 * This is 100% stupid and is a remnant of the original repo. Keeping for compatibility for now.
 * original source: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */
export default function hash(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length(); i++) {
        let char = str.charCodeAt(i);
        hash     = ((hash << 5) - hash) + char;
        hash     |= 0;
    }
    return hash;
}