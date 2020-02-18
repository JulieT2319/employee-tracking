class Role {
  constructor(title, salary, department) {
    this.title = title;
    this.salary = parseFloat(salary);
    this.department_id = parseInt(department);
  }
}

module.exports = Role;