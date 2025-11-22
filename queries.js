// queries.js

//-----------------------------------------
// BASIC CRUD OPERATIONS
//-----------------------------------------

// 1. Find all books in a specific genre
db.books.find({ genre: "Fantasy" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2010 } });

// 3. Find books by a specific author
db.books.find({ author: "John Miller" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "Ocean Deep" },
  { $set: { price: 17.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Last Horizon" });


//-----------------------------------------
// ADVANCED QUERIES
//-----------------------------------------

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

db.books.find().sort({ price: 1 });

db.books.find().sort({ price: -1 });

db.books.find().limit(5).skip(0);
db.books.find().limit(5).skip(5);


//-----------------------------------------
// AGGREGATION PIPELINES
//-----------------------------------------

db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  {
    $group: {
      _id: {
        $subtract: ["$published_year", { $mod: ["$published_year", 10] }]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

//-----------------------------------------
// INDEXING
//-----------------------------------------

db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: -1 });

db.books.find({ title: "Ocean Deep" }).explain("executionStats");
db.books.find({ author: "John Miller" }).explain("executionStats");
