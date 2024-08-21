const fs = require('fs');

const countStudents = (filepath) => new Promise((resolve, reject) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }
    if (data) {
      const readlines = data
        .toString('utf8')
        .trim()
        .split('\n')
        .map((item) => item.replace('\r', ''));

      if (readlines.length === 0) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lstStudents = [];
      const studentCountByField = {};

      for (let i = 1; i < readlines.length; i += 1) {
        const line = readlines[i];
        const values = line.split(',');
        const student = {
          firstname: values[0],
          lastname: values[1],
          age: values[2],
          field: values[3],
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
    }
    resolve(true);
  });
});

module.exports = countStudents;
