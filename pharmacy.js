import { DrugName } from "./drug.js";
export { Drug } from "./drug.js";

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];

      switch (drug.name) {
        case DrugName.MAGIC_PILL:
          break;
        case DrugName.HERBAL_TEA:
          this.updateValuesForHerbalTea(drug);
          break;
        case DrugName.FERVEX:
          this.updateValuesForFervex(drug);
          break;
        case DrugName.DAFALGAN:
          this.updateValuesForDafalgan(drug);
          break;
        default:
          this.updateValuesForDefaultDrug(drug);
      }
    }

    return this.drugs;
  }

  updateValuesForHerbalTea(herbalTea) {
    this.increaseBenefit(herbalTea);
  
    this.decreaseExpirationDate(herbalTea);

    if (herbalTea.expiresIn < 0)
      this.increaseBenefit(herbalTea);
  }

  updateValuesForFervex(fervex) {
      this.increaseBenefit(fervex);

    if (fervex.expiresIn < 11)
      this.increaseBenefit(fervex);

    if (fervex.expiresIn < 6)
      this.increaseBenefit(fervex);
    
    this.decreaseExpirationDate(fervex);

    if (fervex.expiresIn < 0)
      fervex.benefit = 0;
  }

  updateValuesForDefaultDrug(drug) {
    this.decreaseBenefit(drug);

    this.decreaseExpirationDate(drug);

    if (drug.expiresIn < 0)
      this.decreaseBenefit(drug);
  }

  updateValuesForDafalgan(dafalgan) {
    if (dafalgan.benefit > 0)
      dafalgan.benefit -= 2;

    this.decreaseExpirationDate(dafalgan);

    if (dafalgan.expiresIn < 0 && dafalgan.benefit > 0)
      dafalgan.benefit -= 2;

    if (dafalgan.benefit < 0)
      dafalgan.benefit = 0;
  }

  increaseBenefit(drug) {
    if (drug.benefit < 50)
      drug.benefit += 1;
  }

  decreaseBenefit(drug) {
    if (drug.benefit > 0)
      drug.benefit -= 1;
  }

  decreaseExpirationDate(drug) {
    drug.expiresIn -= 1;
  }
}
