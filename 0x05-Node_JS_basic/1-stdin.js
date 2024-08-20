// Using process stdin
console.log('Welcome to Holberton School, what is your name?');
// process.stdin.setEnconding("utf-8")
process.stdin.on('readable', function () {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('Your name is: ' + chunk);
  }
});
