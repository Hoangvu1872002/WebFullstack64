const express = require('express');
const booksRouter = express.Router();
const booksModel = require('../model/books.model');
const { joint, emismatchedr } = require('../middleware/middleware')

booksRouter.post('/',joint, async function(req, res){
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

   await booksModel.insertMany(book, (err) => {
        if (err) {
            return res.send("error")
        } else {
            return res.send(book);
        }
    })
})

booksRouter.get("/:id", emismatchedr, async function(req, res){

   const bookFind = await booksModel.findOne({ _id: req.params.id })

        if (!bookFind) {
            return res.send("error");
        } else {
            console.log("success");
            return res.json(bookFind);
        }
    
})

booksRouter.put("/:id",joint, async function(req, res){

    console.log('loiiiiiiii')

    const bookUpdate = await booksModel.findOne({
        _id: req.params.id
    })
    console.log('loiiiiiiii')


    if(!bookUpdate){
        return res.send('khong tim thay!')
    }else{
        try {
            await booksModel.updateOne({
                 _id: req.params.id
             },{               
                title: req.body.title,
                author: req.body.author,
                publication_date: req.body.publication_date,
                pages: req.body.pages,
    
                genres: [req.body.genres[0], req.body.genres[1], req.body.genres[2]],
                publisher:{
                    name: req.body.publisher.name,
                    location: req.body.publisher.location
                }            
             })
              bookUpdate = await booksModel.findById({
                _id: req.params.id
            })
             return res.status(200).send(bookUpdate);          
        } catch (error) {
          return res.send('loi!')  
        }
    } 
})


booksRouter.delete("/:id",joint, async function(req, res){


    console.log(req.params.id)
    
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        try {
            await booksModel.deleteOne({
                
                 _id: req.params.id
             })
             return res.status(200).send("thanh cong!");         
        } catch (error) {
          return res.send('loi!')  
        }
      }else{
        res.send('khong thay')
      }
    // myObjectId = ObjectId(req.params.id)
    // myObjectIdString = myObjectId.toString()

//     const bookDelete = await booksModel.findOne({
//       _id: req.params.id.toString()
// })

//     console.log(bookDelete)

//     if(!bookDelete){
//         return res.send('khong tim thay!')
//     }else{
//         try {
//             await booksModel.deleteOne({
                
//                  _id: req.params.id
//              })
//              return res.status(200).send("thanh cong!");         
//         } catch (error) {
//           return res.send('loi!')  
//         }
//     }

})

module.exports = booksRouter;