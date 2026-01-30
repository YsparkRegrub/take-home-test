import { Drug, Pharmacy } from "./pharmacy";
import { DrugName } from "./drug.js";

describe("Pharmacy", () => {
  const updateOnce = (drug) =>
    new Pharmacy([drug]).updateBenefitValue()[0];


  describe ("Global cases", () => {
    it('should decreases benefit and expiresIn by 1', () => {
      expect(updateOnce(new Drug(DrugName.DOLIPRANE, 5, 10))).toEqual(
        new Drug(DrugName.DOLIPRANE, 4, 9),
      );
    })

    it('should decreases benefit twice as fast after expiration date', () => {
      expect(updateOnce(new Drug(DrugName.DOLIPRANE, 0, 10))).toEqual(
        new Drug(DrugName.DOLIPRANE, -1, 8),
      );
    })

    it('should not decreases benefit below 0', () => {
      expect(updateOnce(new Drug(DrugName.DOLIPRANE, 5, 0))).toEqual(
        new Drug(DrugName.DOLIPRANE, 4, 0),
      );
    })
  })

  describe("Specific cases", () => {
    describe("Herbal Tea", () => {
      it("should increase benefit by 1 before expiration", () => {
            expect(updateOnce(new Drug(DrugName.HERBAL_TEA, 5, 10))).toEqual(
            new Drug(DrugName.HERBAL_TEA, 4, 11),
          );
      })

      it("should increase benefit by 2 after expiration", () => {
        expect(updateOnce(new Drug(DrugName.HERBAL_TEA, 0, 10))).toEqual(
          new Drug(DrugName.HERBAL_TEA, -1, 12),
        );
      })

      it("should not increase benefit above 50", () => {
        expect(updateOnce(new Drug(DrugName.HERBAL_TEA, 5, 50))).toEqual(
          new Drug(DrugName.HERBAL_TEA, 4, 50),
        );
      })
    })

    describe("Magic Pill", () => {
      it("should not change benefit or expiresIn", () => {
        expect(updateOnce(new Drug(DrugName.MAGIC_PILL, 5, 40))).toEqual(
          new Drug(DrugName.MAGIC_PILL, 5, 40),
        );
      })
    })

    describe("Fervex", () => {
      it("should increase benefit by 1 when more than 10 days left", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 15, 10))).toEqual(
          new Drug(DrugName.FERVEX, 14, 11),
        );
      })

      it("should increase benefit by 2 when 10 days or less", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 10, 10))).toEqual(
          new Drug(DrugName.FERVEX, 9, 12),
        );
      })

      it("should increase benefit by 3 when 5 days or less", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 5, 10))).toEqual(
          new Drug(DrugName.FERVEX, 4, 13),
        );
      })

      it("should drop benefit to 0 after expiration", () => {
        expect(updateOnce(new Drug(DrugName.FERVEX, 0, 10))).toEqual(
          new Drug(DrugName.FERVEX, -1, 0),
        );
      })
    })
  })

  it.todo("degrades benefit twice as fast for Dafalgan");
});
