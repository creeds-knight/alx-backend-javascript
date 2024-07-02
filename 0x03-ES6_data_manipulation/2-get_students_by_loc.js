// get students by location

export default function getStudentsByLocation(arr, city) {
  if (!Array.isArray(arr) || typeof city !== 'string') {
    return [];
  }
  return arr.filter((std) => std.location === city);
}
