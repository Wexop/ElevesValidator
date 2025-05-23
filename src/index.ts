import fs from "fs";
import path from "path";
import {validateEleves} from "./validator";

const filePath = process.argv[2];

if (!filePath) {
    console.error("Usage: ts-node src/index.ts <chemin/vers/fichier.json>");
    process.exit(1);
}

const raw = fs.readFileSync(path.resolve(filePath), "utf-8");
const data = JSON.parse(raw);

if (!Array.isArray(data.eleves)) {
    console.error("Le fichier JSON doit contenir une clé 'eleves' avec une liste.");
    process.exit(1);
}

const result = validateEleves(data.eleves);

console.log("✅ Élèves valides :", result.valides.length);
console.log("❌ Erreurs détectées :", result.erreurs.length);

result.erreurs.forEach((e) => {
    console.log(`\nEntrée #${e.index}:`, e.messages.join(" | "));
});
