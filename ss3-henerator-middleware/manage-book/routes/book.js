var express = require('express');
var booksRouter = express.Router();
const joi = require('joi');

let books = [
    { id: 1, title: 'book 1', author: ' author 1' },
    { id: 2, title: 'book 2', author: ' author 2' },
    { id: 3, title: 'book 3', author: ' author 3' },

];

booksRouter.get('/get-all', (req, res) => {
    res.send(books);
})

const bookSchema = joi.object({
    title: joi.string().min(3).required(),
    author: joi.string().min(3).required()
})

booksRouter.post('/create', (req, res) => {
    const valiationResult = bookSchema.validate(req.body);
    // console.log(valiationResult);
    if (valiationResult.error) {
        return res.status(400).send(valiationResult.error.details[0].message);
    }

    const book ={
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    }

    books.push(book)
    res.send(book);
})


booksRouter.put('/:id',(req,res) => {
    const findBook = books.find(book => book.id === parseInt(req.params.id))
    if(!findBook){
        res.status(404).send("khong tim thay quyen sach voi id nay");
    }
     const valiationResult = bookSchema.validate(req.body);
     if(valiationResult.error){
        return res.status(400).send(valiationResult.error.details[0].message);
     }

     findBook.title = req.body.title;
     findBook.author = req.body.author;
     res.send(findBook)

})

     
module.exports = booksRouter;