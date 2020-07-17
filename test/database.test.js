import Db from "../src/database.js";
import pkg from "chai";
const { expect } = pkg;

describe("Db", function () {
  it("Should create a class instance", function () {
    expect(Db).with.property("_users");
  });
  it("GetOrCreateUser should push user to an array and return the user", function () {
    let user = Db.GetOrCreateUser(1, "natural");
    expect(user).not.empty;
    expect(Db).property("_users").have.length("1");
  });
});
