const mongoose = require('mongoose');
const Student = require('./models/Student');

const connStr = 'mongodb://localhost:27017/cars';

mongoose.connect(connStr, { useNewUrlParser: true }, (err, obj) => {
    if (err) {
        console.log(err);
        return;
    }

    // const newStudent = new Student({
    //     "name": "Grozde",
    //     "age": 34,
    //     "phone": "0888 777 666",
    //     "grades": [4, 4, 5, 6, 6, 2]
    // });

    Student.find().then(function (data) {
        console.log(data.length);
    })
});
