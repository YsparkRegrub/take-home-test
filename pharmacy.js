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
          this.updateBenefitValueForHerbalTea(drug);
          break;
        case DrugName.FERVEX:
          this.updateBenefitValueForFervex(drug);
          break;
        case DrugName.DAFALGAN:
          this.updateBenefitValueForDafalgan(drug);
          break;
        default:
          this.updateBenefitValueForDefaultDrug(drug);
      }
    }
    return this.drugs;
  }

  updateBenefitValueForHerbalTea(herbalTea) {
    if (herbalTea.benefit < 50) {
      herbalTea.benefit += 1;
    }
    herbalTea.expiresIn -= 1;
    if (herbalTea.expiresIn < 0 && herbalTea.benefit < 50) {
      herbalTea.benefit += 1;
    }
  }

  updateBenefitValueForFervex(fervex) {
    if (fervex.benefit < 50) {
      fervex.benefit += 1;
    }
    if (fervex.expiresIn < 11 && fervex.benefit < 50) {
      fervex.benefit += 1;
    }
    if (fervex.expiresIn < 6 && fervex.benefit < 50) {
      fervex.benefit += 1;
    }
    fervex.expiresIn -= 1;
    if (fervex.expiresIn < 0) {
      fervex.benefit = 0;
    }
  }

  updateBenefitValueForDefaultDrug(drug) {
    if (drug.benefit > 0) {
      drug.benefit -= 1;
    }
    drug.expiresIn -= 1;
    if (drug.expiresIn < 0 && drug.benefit > 0) {
      drug.benefit -= 1;
    }
  }

  updateBenefitValueForDafalgan(dafalgan) {
    if (dafalgan.benefit > 0) {
      dafalgan.benefit -= 2;
    }
    dafalgan.expiresIn -= 1;
    if (dafalgan.expiresIn < 0 && dafalgan.benefit > 0) {
      dafalgan.benefit -= 2;
    }

    if (dafalgan.benefit < 0) {
      dafalgan.benefit = 0;
    }
  }
}
