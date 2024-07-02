export default function getStudentIdsSum(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr.reduce((accumulator, currentValue) => accumulator + currentValue.id, 0);
}
