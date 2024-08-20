export default function createEmployeesObject(departmentName, employees) {
  const dct = {};
  const lst = [];

  for (const value of employees) {
    lst.push(value);
  }
  dct[departmentName] = lst;

  return dct;
}
