export default function updateStudentGradeByCity(array, city, newGrades) {
  return array
    .filter(({ location }) => location === city)
    .map((x) => {
      const match = newGrades.find(({ studentId }) => studentId === x.id);
      const grade = match ? match.grade : 'N/A';
      return { ...x, grade };
    });
}
