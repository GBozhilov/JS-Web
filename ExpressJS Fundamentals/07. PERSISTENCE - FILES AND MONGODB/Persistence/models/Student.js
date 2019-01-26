const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: String,
    grades: [Number]
});

studentSchema.methods.sayHi = function () {
    return `Hello from ${this.name}`;
};

studentSchema.virtual('averageGrade').get(function () {
    const count = this.grades.length;
    const sum = this.grades.reduce((p, c) => p += c, 0);
    return sum / count;
});

studentSchema.virtual('getAge').get(function () {
    return `${this.name} is ${this.age} years old!`;
})


studentSchema.path('grades').validate(function () {
    for (const grade of this.grades) {
        if (grade < 2 || grade > 6) {
            return false;
        }
    }
    return true;
}, 'Grades must be between 2 and 6');

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;
//module.exports = mongoose.model('Student')
