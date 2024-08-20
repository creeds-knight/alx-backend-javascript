export default function createIteratorObject(report) {
  let allemployees = [];
  for (const item of Object.values(report.allEmployees)) {
    allemployees = [
      ...allemployees,
      ...item,
    ];
  }
  return allemployees;
}
