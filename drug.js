export const DrugName = Object.freeze({
  DOLIPRANE: "Doliprane",
  HERBAL_TEA: "Herbal Tea",
  FERVEX: "Fervex",
  MAGIC_PILL: "Magic Pill",
  DAFALGAN: "Dafalgan",
});

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}
