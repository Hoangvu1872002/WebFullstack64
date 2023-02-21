const express = require('express');
const studentsRouter = express.Router();

const students = [

    {
        name: 'Nguyen Tuan Anh - student',
        age: '31'
    },
    {
        name: 'Hoang Van Vu - student',
        age: '20'
    },
    {
        name: 'Le Ngoc Manh - student',
        age: '26'
    }

]
studentsRouter.get('/', (req, res) => {
    res.json(students)
})
studentsRouter.post('/add', (req, res) => {
    students.push({
        name: 'Nguyen van Thinh - student',
        age: '44'
    });
    res.json(students)
})

module.exports = studentsRouter;