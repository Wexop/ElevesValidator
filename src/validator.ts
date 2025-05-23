export interface Eleve {
  prenom: string;
  nom: string;
  date_naissance: string;
  email: string;
  note_moyenne: number;
}

export interface ValidationError {
  index: number;
  eleve: any;
  messages: string[];
}

export interface ValidationResult {
  valides: Eleve[];
  erreurs: ValidationError[];
}

export function isValidDate(dateStr: string): boolean {
  const d = new Date(dateStr);
  return !isNaN(d.getTime()) && d <= new Date();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateEleves(eleves: any[]): ValidationResult {
  const valides: Eleve[] = [];
  const erreurs: ValidationError[] = [];

  eleves.forEach((eleve, index) => {
    const messages: string[] = [];

    if (!eleve.prenom || typeof eleve.prenom !== "string" || !eleve.prenom.trim())
      messages.push("Prénom invalide");

    if (!eleve.nom || typeof eleve.nom !== "string" || !eleve.nom.trim())
      messages.push("Nom invalide");

    if (!eleve.date_naissance || !isValidDate(eleve.date_naissance))
      messages.push("Date de naissance invalide ou future");

    if (!eleve.email || !isValidEmail(eleve.email))
      messages.push("Email invalide");

    if (
      typeof eleve.note_moyenne !== "number" ||
      eleve.note_moyenne < 0 ||
      eleve.note_moyenne > 20
    )
      messages.push("Note moyenne invalide");

    if (messages.length > 0) {
      erreurs.push({ index, eleve, messages });
    } else {
      valides.push(eleve);
    }
  });

  return { valides, erreurs };
}
