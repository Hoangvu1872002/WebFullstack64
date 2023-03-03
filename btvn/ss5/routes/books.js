const express = require('express');
const booksRouter = express.Router();
const booksModel = require('../model/books.model');
const { joint, emismatchedr } = require('../middleware/middleware')

booksRouter.post('/post',joint, (req, res) => {
    const book = new booksModel();
    book.title = req.body.title;
    book.author = req.body.author;
    book.publication_date = req.body.publication_date;
    book.pages = req.body.pages;
    book.genres[0] = req.body.genres[0];
    book.genres[1] = req.body.genres[1];
    book.genres[2] = req.body.genres[2];

    book.publisher.name = req.body.publisher.name;
    book.publisher.location = req.body.publisher.location;

    // book.save((err, book) => {
    //     if (err) {
    //         res.send("error");
    //     } else {
    //         console.log('win', book);
    //         res.json(book);
    //     }
    // })

    booksModel.insertMany(book, (err) => {
        if (err) {
            res.send("error")
        } else {
            res.send(book);
        }
    })
})

booksRouter.get("/", emismatchedr, (req, res) => {
    booksModel.find({ title: req.query.title }).exec((err, book) => {
        if (err) {
            res.send("error");
        } else {
            console.log("success");
            res.json(book)
        }
    })
})

booksRouter.put("/:id",joint, (req, res) => {
    booksModel.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            publication_date: req.body.publication_date,
            pages: req.body.pages,

            genres: [req.body.genres[0], req.body.genres[1], req.body.genres[2]],
            publisher:{
                name: req.body.publisher.name,
                location: req.body.publisher.location,
            }
        }
    }, {
        upsert: true

    },
        (err, book) => {
            if (err) {
                res.send("error")
            } else {
                res.send(book)
            }
        }

    )
})


booksRouter.delete("/:id",joint, (req, res) => {
    booksModel.findByIdAndDelete({
        _id: req.params.id
    }, {

    }, (err) => {
        if (err) {
            res.send("error")
        } else {
            res.status(200).send("thanh cong!")
        }
    }
    )
})

module.exports = booksRouter;