const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/bookList', {
  useNewUrlParser: true
});



// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


// Create a scheme for items in the book list
const bookSchema = new mongoose.Schema({
  title: String,
  path: String,
  author: String,
  rating: Number,
  generes: [String],
});

// Create a model for items in the book list
const Book = mongoose.model('Book', bookSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }

  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new book in the list
app.post('/api/books', async (req, res) => {

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    path: req.body.path,
    rating: req.body.rating * 100,
    generes: req.body.generes
  });
  try {
    await book.save();
    res.send(book);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Get a list of all of the books
app.get('/api/books', async (req, res) => {
  try {
    let books = await Book.find();
    
    for (book of books) {
    
      book.rating = book.rating / 100;
    }
    res.send(books);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

let fs = require('fs');

app.delete('/api/books/:id', async (req, res) => {
  try {
    let imgPath = await Book.findOne({
      _id: req.params.id
    });
    await Book.deleteOne({
      _id: req.params.id
    });
    await fs.unlink("../front-end/public" + imgPath.path, () => { return });
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    let book = await Book.findOne({
      _id: req.params.id
    });

    let request = req.body;
    let newKeys = Object.keys(request);
    for (key of newKeys) {
      book[key] = request[key];
    }
    book.rating = book.rating * 100;

    book.save();
    res.sendStatus(200);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3002, () => console.log('Server listening on port 3002!'));
