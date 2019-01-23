function greet(name, cb) {
    let message = `Hi, ${name}!`;
    console.log(message);
    cb(message);
}

function formalGreet(name) {
    return `Hello, ${name}! How are you?`;
}

module.exports = {
    greet,
    formalGreet
};