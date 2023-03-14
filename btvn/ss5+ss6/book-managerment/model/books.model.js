const mongoose = require('mongoose') 
const booksSchema = mongoose.Schema;

const bookSchema = new booksSchema ({
    
    title: String,
    author: String,
    publication_date: String,
    pages: Number,
    genres: [String],
    publisher:{
        name: String,
        location: String
    }
})

module.exports = mongoose.model('book', bookSchema);

