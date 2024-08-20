// Executing basic javascript with node js

function displayMessage(d) {
    return process.stdout.write(d + '\n');
}

module.exports = displayMessage;