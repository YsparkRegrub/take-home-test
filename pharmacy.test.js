import { Drug, Pharmacy } from "./pharmacy";
import { DrugName } from "./drug.js";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug(DrugName.TEST, 2, 3)]).updateBenefitValue(),
    ).toEqual([new Drug(DrugName.TEST, 1, 2)]);
  });
});
