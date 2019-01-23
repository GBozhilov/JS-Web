const greeter = require('./greeter');

greeter.greet('Ivan', (message) => {
    console.log(new Date().getTime());
});