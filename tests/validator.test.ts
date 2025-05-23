import {isValidDate, isValidEmail, validateEleves} from "../src/validator";

describe("Validation des élèves", () => {
  it("valide un élève correct", () => {
    const data = [{
      prenom: "Alice",
      nom: "Martin",
      date_naissance: "2005-09-15",
      email: "alice@example.com",
      note_moyenne: 15.2
    }];
    const result = validateEleves(data);
    expect(result.valides.length).toBe(1);
    expect(result.erreurs.length).toBe(0);
  });

  it("détecte des erreurs", () => {
    const data = [{
      prenom: "",
      nom: "",
      date_naissance: "2050-01-01",
      email: "bademail",
      note_moyenne: 25
    }];
    const result = validateEleves(data);
    expect(result.valides.length).toBe(0);
    expect(result.erreurs.length).toBe(1);
    expect(result.erreurs[0].messages.length).toBeGreaterThanOrEqual(4);
  });
});

describe('isValidDate', () => {
  test('valide une date correcte dans le passé', () => {
    expect(isValidDate('2020-01-01')).toBe(true);
  });

  test('rejette une date invalide', () => {
    expect(isValidDate('2020-13-01')).toBe(false);  // mois 13 invalide
    expect(isValidDate('hello world')).toBe(false);
  });

  test('rejette une date future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(isValidDate(futureDate.toISOString())).toBe(false);
  });
});

describe('isValidEmail', () => {
  test('valide un email correct', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  test('rejette un email sans arobase', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  test('rejette un email avec espace', () => {
    expect(isValidEmail('test @example.com')).toBe(false);
  });
});
