const Role = require("../lib/Role");

test("Can instantiate Role instance", () => {
  const r = new Role();
  expect(typeof r).toBe("object");
});

test("Can set role title via constructor arguments", () => {
  const title = "Developer";
  const r = new Role(title);
  expect(r.title).toBe(title);
});

test("Can set salary via constructor arguments", () => {
  const salary = 65000.00;
  const r = new Role("Developer", salary);
  expect(r.salary).toBe(salary);
});

test("Can set department id via constructor arguments", () => {
  const dept = 3;
  const r = new Role("Developer", 65000.00, dept);
  expect(r.department_id).toBe(dept);
});