export default function createReportObject(employeesList) {
  return {
    allEmployees: { ...employeesList },
    getNumberOfDepartments(lst) {
      return Object.keys(lst).length;
    },
  };
}
