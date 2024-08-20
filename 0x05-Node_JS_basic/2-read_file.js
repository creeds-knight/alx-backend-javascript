// reading a file synchronoulsy using node js
// const { error } = require('console');
const fs = require('fs');

function countStudents (filepath) {
  try {
    if (!fs.existsSync(filepath)) {
      throw new Error('Cannot load the database');
    }
    if (!fs.statSync(filepath).isFile()) {
      throw new Error('Cannot load the database');
    }
    const readlines = fs.readFileSync(filepath, 'utf-8')
      .toString('utf8')
      .trim()
      .split('\n')
      .map(item => item.replace('\r', ''));

    if (readlines.length === 0) {
      throw new Error('Cannot load the database');
    }
    // const fields = readlines[0].split(',');

    const lstStudents = [];
    const studentCountByField = {};
    for (let i = 1; i < readlines.length; i++) {
      const line = readlines[i];
      if (line === '') continue;
      const values = line.split(',');
      const student = {
        firstname: values[0],
        lastname: values[1],
        age: values[2],
        field: values[3]
      };
      lstStudents.push(student);
      if (!studentCountByField[student.field]) {
        studentCountByField[student.field] = [];
      }
      studentCountByField[student.field].push(student.firstname);
    }
    console.log(`Number of students: ${lstStudents.length}`);
    for (const [field, firstnames] of Object.entries(studentCountByField)) {
      console.log(`Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}`);
    }
  } catch {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
