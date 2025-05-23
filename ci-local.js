#!/usr/bin/env node

import { execSync } from 'child_process';
import { mkdtempSync, rmSync, cpSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

function run(cmd, opts = {}) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', ...opts });
}

async function main() {
  try {
    // Affiche la version node
    const nodeVersion = execSync('node -v', { encoding: 'utf8' }).trim();
    console.log(`Node version : ${nodeVersion}`);

    console.log('CI locale en cours...');

    // Dossier projet actuel
    const PROJECT_DIR = process.cwd();

    // Création dossier temporaire
    const TEMP_DIR = mkdtempSync(join(tmpdir(), 'eleves-validator-'));
    console.log(`Création d’un dossier temporaire: ${TEMP_DIR}`);

    // Copier contenu (exclut node_modules et .idea)
    // Node.js >= 16 supporte cpSync récursif avec filter
    cpSync(PROJECT_DIR, TEMP_DIR, {
      recursive: true,
      filter: (src) => !src.includes('node_modules') && !src.includes('.idea'),
    });

    // Se déplacer dans dossier temporaire
    process.chdir(TEMP_DIR);

    // Installer les dépendances avec pnpm
    console.log('Installation avec pnpm...');
    run('pnpm install');

    // Exécuter les scripts
    console.log('Validation de valid.json');
    run('pnpm valid');

    console.log('Validation de invalid.json');
    run('pnpm invalid');

    console.log('Validation de eleves_mixed.json');
    run('pnpm eleves_mixed');

    console.log('Lancement des tests...');
    run('pnpm test');

    console.log('CI locale terminée avec succès !');
  } catch (err) {
    console.error('Erreur durant la CI locale :', err);
    process.exit(1);
  }
}

main();
