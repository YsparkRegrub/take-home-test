import { Drug, Pharmacy } from "./pharmacy";
import { DrugName } from "./drug.js";

describe("Pharmacy", () => {
  const updateOnce = (drug) =>
    new Pharmacy([drug]).updateBenefitValue()[0];


  describe ("Global cases", () => {
    it('decreases benefit and expiresIn by 1', () => {
      expect(updateOnce(new Drug(DrugName.DOLIPRANE, 5, 10))).toEqual(
        new Drug(DrugName.DOLIPRANE, 4, 9),
      );
    })

    it('decreases benefit twice as fast after expiration', () => {
      expect(updateOnce(new Drug(DrugName.DOLIPRANE, 0, 10))).toEqual(
        new Drug(DrugName.DOLIPRANE, -1, 8),
      );
    })

    it('floor benefit to 0', () => {
      expect(updateOnce(new Drug(DrugName.DOLIPRANE, 5, 0))).toEqual(
        new Drug(DrugName.DOLIPRANE, 4, 0),
      );
    })
  })

  describe("Specific cases", () => {
    describe("Herbal Tea", () => {
      it("increases benefit by 1 before expiration", () => {
            expect(updateOnce(new Drug(DrugName.HERBAL_TEA, 5, 10))).toEqual(
            new Drug(DrugName.HERBAL_TEA, 4, 11),
          );
      })

      it("increases benefit by 2 after expiration", () => {
        expect(updateOnce(new Drug(DrugName.HERBAL_TEA, 0, 10))).toEqual(
          new Drug(DrugName.HERBAL_TEA, -1, 12),
        );
      })

      it("benefit capped at 50", () => {
        expect(updateOnce(new Drug(DrugName.HERBAL_TEA, 5, 50))).toEqual(
          new Drug(DrugName.HERBAL_TEA, 4, 50),
        );
      })
    })

    describe("Magic Pill", () => {
      it("does not change benefit or expiration date", () => {
        expect(updateOnce(new Drug(DrugName.MAGIC_PILL, 5, 40))).toEqual(
          new Drug(DrugName.MAGIC_PILL, 5, 40),
        );
      })
    })

    describe("Fervex", () => {
      it("increases benefit by 1 when 10+ days left", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 15, 10))).toEqual(
          new Drug(DrugName.FERVEX, 14, 11),
        );
      })

      it("increases benefit by 2 when 10 days or less", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 10, 10))).toEqual(
          new Drug(DrugName.FERVEX, 9, 12),
        );
      })

      it("increases benefit by 3 when 5 days or less", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 5, 10))).toEqual(
          new Drug(DrugName.FERVEX, 4, 13),
        );
      })

      it("drops benefit to 0 after expiration", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 0, 10))).toEqual(
          new Drug(DrugName.FERVEX, -1, 0),
        );
      })
    })

    describe("Dafalgan", () => {
      it("decreases benefit by 2 before expiration", () => {
        expect(updateOnce(new Drug(DrugName.DAFALGAN, 5, 10))).toEqual(
          new Drug(DrugName.DAFALGAN, 4, 8),
        );
      })

      it("decreases benefit by 4 after expiration", () => {
        expect(updateOnce(new Drug(DrugName.DAFALGAN, 0, 10))).toEqual(
          new Drug(DrugName.DAFALGAN, -1, 6),
        );
      })

      it("floors benefit to 0", () => {
        expect(updateOnce(new Drug(DrugName.DAFALGAN, 5, 1))).toEqual(
          new Drug(DrugName.DAFALGAN, 4, 0),
        );
      })
    })
  })
});
