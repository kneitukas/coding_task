import { GetWeek, Ceil } from "../src/helpers.js";
import assert from "assert";

describe("GetWeek", () => {
  it("should return the correct week", () => {
    assert.equal(GetWeek(new Date("2012-01-04")), 1);
  });
});

describe("Ceil", () => {
  it("should ceil properly, where toFixed and round fails", () => {
    assert.equal(Ceil(1.005, 2), 1.01);
  });
});
