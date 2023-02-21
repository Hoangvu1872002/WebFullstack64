// const jsonExport = require('jsonexport');

// const  members = [
//     {
//         name: 'Nguyen Tuan Anh',
//         age: '31'
//     },
//     {
//         name: 'Hoang Van Vu',
//         age: '20',
//     },
//     {
//         name:'Le Ngoc Manh',
//         age: '26',
//     }
// ]
// jsonExport(members, function(errors,csv){
// if(errors){
//     return console.log(errors);
// }
// console.log(csv);
// });


// creat server with express
const express = require('express');
const app = express();


const teachersRouter = require('./teachers');
const studentsRouter = require('./students');

app.use('/teachers', teachersRouter);
app.use('/students', studentsRouter);
// const students = [
//    {
//     name: 'Hoang Van Vu', age: 10
//    }, 
//    {
//     name:'Hoang Tuan Anh', age: 19
//    },
//    {
//     name:'Nguyen Van Huy', age: 20
//    }
// ]

// app.get('/students', (req,res)=> {
//     students.push({
//         name: 'Bui Thanh Phong',
//         age: 20
//     })
//     res.json(students);
// })

// app.get('/user/:id', (req,res)=>{
//     console.log(req.params);
//     const idParams = req.params;
//     console.log(idParams);
//     res.send("wellcome to my website");
// })
const port = 3003;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})
