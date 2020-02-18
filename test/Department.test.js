const Department = require("../lib/Department");

test("Can instantiate Department instance", () => {
  const r = new Department();
  expect(typeof r).toBe("object");
});

test("Can set Department via constructor arguments", () => {
  const dept = "Develompent";
  const r = new Department(dept);
  expect(r.name).toBe(dept);
});
