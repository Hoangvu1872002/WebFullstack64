const express = require('express');
const teachersRouter = express.Router();

const teachers = [

    {
        name: 'Nguyen Tuan Anh',
        age: 31,
        id: 1,
        class: '2A'
    },
    {
        name: 'Hoang Van Vu',
        age: 20,
        id: 2,
        class: '2C'
    },
    {
        name: 'Le Ngoc Manh',
        age: 26,
        id: 3,
        class:'3C'
    }

]
teachersRouter.get('/', (req,res)=>{
    res.json(teachers)
})
 teachersRouter.post('/add', (req,res)=>{
    teachers.push({
        name: ' Nguyen van Thinh',
        age: 44
    })
    res.json(teachers)
 })
 teachersRouter.get('/find/:id', (req, res)=>{
      const idParams = req.params.id;
      const findTeacher = teachers.find((teachers)=> teachers.id === parseInt(idParams));

     if(findTeacher){
        res.json(findTeacher);
     }else{
        res.end('khong tim thay thong tin giang vien nay.')
     }
 })
 teachersRouter.get('/find', (req, res)=>{
    const age =req.query.age;
    const classId =req.query.class;
    const findTeacherQuery = teachers.find(teachers => teachers.age===parseInt(age) && teachers.class===classId);

    if(findTeacherQuery){
        res.json(findTeacherQuery)
    }else{
        res.end('khong tim thay giang vien nay.')
    }
 })

 module.exports = teachersRouter;