# Élève Validator

Un outil en TypeScript pour valider des fichiers JSON contenant des données d'élèves.  
Il vérifie que les données sont complètes, bien formatées et cohérentes.

---

## Installation

```
pnpm install
```

## Commandes disponibles

- `pnpm valid`  
  Valide le fichier `data/valid.json` (données valides).

- `pnpm invalid`  
  Valide le fichier `data/invalid.json` (données invalides).

- `pnpm eleves_mixed`  
  Valide le fichier `data/eleves_mixed.json` (données mixtes valides et invalides).

- `pnpm test`  
  Lance les tests unitaires avec Jest.
