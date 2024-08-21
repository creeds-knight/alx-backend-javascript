const http = require('http');
const fs = require('fs');

const port = 1245;
const host = 'localhost';
const filepath = process.argv.length > 2 ? process.argv[2] : '';

// Function to count students
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
      result += `Number of students in ${field}: ${firstnames.length}. List:
      ${firstnames.join(', ')}\n`;
    }

    resolve(result.trim());
  });
});

// Create the HTTP server
const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    const responseData = 'Hello Holberton School!';
    res.setHeader('Content-Length', responseData.length);
    res.statusCode = 200;
    res.end(responseData);
  } else if (req.url === '/students') {
    let responseText = 'This is the list of our students\n';

    try {
      const studentsData = await countStudents(filepath);
      responseText += studentsData;
    } catch (error) {
      responseText = 'Cannot load the database';
      res.statusCode = 500;
    }

    res.setHeader('Content-Length', responseText.length);
    res.end(responseText);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Length', 'Not Found'.length);
    res.end('Not Found');
  }
});

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});

module.exports = app;
