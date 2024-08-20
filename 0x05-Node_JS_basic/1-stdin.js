// Using process stdin
console.log("Welcome to Holberton School, what is your name?")
//process.stdin.setEnconding("utf-8")
process.stdin.on("readable", function(chunk){
    console.log("Your name is: " + chunk.trim());
})