var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookList', {
    useNewUrlParser: true
});

// Create a scheme for items in the book list
const bookSchema = new mongoose.Schema({
    title: String,
    path: String,
    author: String,
    rating: Number,
    generes: [String],
});

const Book = mongoose.model('Book', bookSchema);



async function addData() {
    var mock = [
        {
            "generes": [
                "Comedy",
                "Humor",
                "Fantasy",
                "Science Fiction",
                "Adventure"
            ],
            "_id": 0,
            "title": "The Hitchhiker's Guide to the Galaxy",
            "author": "Douglas Adams",
            "rating": 4.22,
            "image": "81XSN3hA5gL.jpg"
        },
        {
            "_id": 1,
            "title": "Ender's Game",
            "author": "Orson Scott Card",
            "rating": 4.3,
            "image": "81+IUsYtGTL.jpg",
            "generes": [
                "Science Fiction",
                "Young Adult"
            ]
        },
        {
            "generes": [
                "Science Fiction",
                "Classics",
                "Political"
            ],
            "_id": 2,
            "title": "Dune",
            "author": "Frank Herbert",
            "rating": 4.23,
            "image": "9780593099322.jpg"
        },
        {
            "generes": [
                "Classics",
                "Fiction",
                "Historical Fiction",
                "Romance",
                "Young Adult"
            ],
            "_id": 3,
            "title": "Little Women",
            "author": "Louisa May Alcott",
            "rating": 4.1,
            "image": "9781950435098_p0_v2_s1200x630.jpg"
        },
        {
            "generes": [
                "Classics",
                "Fiction",
                "Young Adult",
                "Historical"
            ],
            "_id": 4,
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "rating": 4.28,
            "image": "GUEST_1607358e-8a84-4160-b93f-15b30b146a9f.jpg"
        },
        {
            "generes": [
                "Science Fiction",
                "Classics",
                "Dystopia"
            ],
            "_id": 5,
            "title": "1984",
            "author": "George Orwell",
            "rating": 4.19,
            "image": "41E9Z5XaHcL.jpg"
        },
        {
            "generes": [
                "Classics",
                "Fiction",
                "Romance"
            ],
            "_id": 6,
            "title": "The Great Gatsby",
            "author": "Francis Scott Fitzgerald",
            "rating": 3.93,
            "image": "81Q6WkLhX4L.jpg"
        },
        {
            "generes": [
                "Classics",
                "Fiction",
                "Science Fiction",
                "Dystopia"
            ],
            "_id": 7,
            "title": "Fahrenheit 451",
            "author": "Ray Bradbury",
            "rating": 3.99,
            "image": "71OFqSRFDgL.jpg"
        },
        {
            "generes": [
                "Dystopia",
                "Philosophy",
                "Classics",
                "Fiction"
            ],
            "_id": 8,
            "title": "Atlas Shrugged",
            "author": "Ayn Rand, Leonard Peikoff",
            "rating": 3.69,
            "image": "612URtxh-qL.jpg"
        },
        {
            "generes": [
                "Classics",
                "Fiction",
                "Adventure"
            ],
            "_id": 9,
            "title": "The Old Man and the Sea",
            "author": "Ernest Hemingway",
            "rating": 3.79,
            "image": "indexomadsea.jpg"
        },
        {
            "generes": [
                "Classics",
                "Fiction",
                "Fantasy",
                "Young Adult",
                "Animals"
            ],
            "_id": 10,
            "title": "Watership Down",
            "author": "Richard Adams",
            "rating": 4.06,
            "image": "76620.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Classics",
                "Science Fiction"
            ],
            "_id": 11,
            "title": "A Wrinkle in Time",
            "author": "Madeleine L'Engle",
            "rating": 3.99,
            "image": "510-sv2qzFL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 12,
            "title": "Harry Potter and the Sorcerer's Stone",
            "author": "J.K. Rowling",
            "rating": 4.48,
            "image": "81iqZ2HHD-L.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 13,
            "title": "Harry Potter and the Chamber of Secrets",
            "author": "J.K. Rowling",
            "rating": 4.43,
            "image": "51TA3VfN8RL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 14,
            "title": "Harry Potter and the Prisoner of Azkaban",
            "author": "J.K. Rowling",
            "rating": 4.57,
            "image": "81lAPl9Fl0L.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 15,
            "title": "Harry Potter and the Goblet of Fire",
            "author": "J.K. Rowling",
            "rating": 4.56,
            "image": "91gZX7sjnpL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 16,
            "title": "Harry Potter and the Order of the Phoenix",
            "author": "J.K. Rowling",
            "rating": 4.5,
            "image": "91TpLHDnuFL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 17,
            "title": "Harry Potter and the Half-Blood Prince",
            "author": "J.K. Rowling",
            "rating": 4.57,
            "image": "61sXBXmAWML.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 18,
            "title": "Harry Potter and the Deathly Hallows",
            "author": "J.K. Rowling",
            "rating": 4.62,
            "image": "71sH3vxziLL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Young Adult",
                "Magic"
            ],
            "_id": 19,
            "title": "Harry Potter and the Cursed Child: Parts One and Two",
            "author": "John Tiffany, Jack Thorne, J.K. Rowling",
            "rating": 3.59,
            "image": "71zWjTSsq1L.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Classics",
                "Fiction",
                "Adventure"
            ],
            "_id": 20,
            "title": "The Fellowship of the Ring (The Lord of the Rings #1)",
            "author": "J.R.R. Tolkien",
            "rating": 4.37,
            "image": "91jBdaRVqML.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Classics",
                "Adventure"
            ],
            "_id": 21,
            "title": "The Two Towers (The Lord of the Rings #2)",
            "author": "J.R.R. Tolkien",
            "rating": 4.45,
            "image": "A1y0jd28riL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Classics",
                "Adventure"
            ],
            "_id": 22,
            "title": "The Return of the King (The Lord of the Rings #3)",
            "author": "J.R.R. Tolkien",
            "rating": 4.53,
            "image": "51xszqr6yrL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Fiction",
                "Classics",
                "Adventure",
                "Young Adult"
            ],
            "_id": 23,
            "title": "The Hobbit, or There and Back Again",
            "author": "J.R.R. Tolkien",
            "rating": 4.28,
            "image": "81rJBESgUPL.jpg"
        },
        {
            "generes": [
                "Young Adult",
                "Fiction",
                "Dystopia",
                "Fantasy",
                "Romance",
                "Adventure"
            ],
            "_id": 24,
            "title": "The Hunger Games",
            "author": "Suzanne Collins",
            "rating": 4.32,
            "image": "61JfGcL2ljL.jpg"
        },
        {
            "generes": [
                "Young Adult",
                "Fiction",
                "Dystopia",
                "Fantasy",
                "Romance",
                "Adventure"
            ],
            "_id": 25,
            "title": "Catching Fire",
            "author": "Suzanne Collins",
            "rating": 4.29,
            "image": "61VUik8NJ8L.jpg"
        },
        {
            "generes": [
                "Young Adult",
                "Fiction",
                "Dystopia",
                "Fantasy",
                "Romance",
                "Adventure"
            ],
            "_id": 26,
            "title": "Mockingjay",
            "author": "Suzanne Collins",
            "rating": 4.05,
            "image": "61n5pTMvmpL.jpg"
        },
        {
            "generes": [
                "Young Adult",
                "Fantasy",
                "Romance",
                "Fiction",
                "Vampires"
            ],
            "_id": 27,
            "title": "Twilight",
            "author": "Stephenie Meyer",
            "rating": 3.61,
            "image": "71gfFjhxYgL.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Young Adult",
                "Fiction",
                "Romance",
                "Vampires"
            ],
            "_id": 28,
            "title": "New Moon",
            "author": "Stephenie Meyer",
            "rating": 3.55,
            "image": "982735.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Young Adult",
                "Fiction",
                "Romance",
                "Vampires"
            ],
            "_id": 29,
            "title": "Eclipse",
            "author": "Stephenie Meyer",
            "rating": 3.7,
            "image": "982358234598.jpg"
        },
        {
            "generes": [
                "Fantasy",
                "Young Adult",
                "Fiction",
                "Romance",
                "Vampires"
            ],
            "_id": 30,
            "title": "Breaking Dawn",
            "author": "Stephenie Meyer",
            "rating": 3.7,
            "image": "41s-hCyNhQL.jpg"
        }
    ];

    for (book of mock) {
        try {
            const newBook = new Book({
                title: book.title,
                author: req.body.author,
                path: "/images/" + book.image,
                rating: book.rating * 100,
                generes: book.generes
            });
            await newBook.save();
        }
        catch (eror) {
            console.log(error);
        }
    }
}



module.exports.startHere = function () {
    console.log("is called")
    addData();
};


