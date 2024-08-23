const express = require('express');

const app = express();

const port = 1245;
// const host = 'localhost';
const filepath = process.argv.length > 2 ? process.argv[2] : '';
const fs = require('fs');

const countStudents = (filepath) => new Promise((resolve, reject) => {
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

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

    let result = `Number of students: ${lstStudents.length}\n`;
    for (const [field, firstnames] of Object.entries(studentCountByField)) {
      result += `Number of students in ${field}: ${firstnames.length}. List: ${firstnames.join(', ')}\n`;
    }

    resolve(result.trim());
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  let responseText = 'This is the list of our students\n';

  countStudents(filepath)
    .then((response) => {
      responseText += response;
      res.statusCode = 200;
      res.send(responseText);
    })
    .catch((err) => {
      responseText += err.message;
      res.statusCode = 200;
      res.send(responseText);
    });
});

// If you want to include the host, uncomment it above, otherwise remove it here
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
