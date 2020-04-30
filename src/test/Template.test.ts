import { expect } from "chai";
import "mocha";
import Template from "../Template";

describe("Template: testMethod", () => {
  it("should return 0", () => {
    const template = new Template();
    expect(template.testMethod()).to.equal(0);
  });
});
