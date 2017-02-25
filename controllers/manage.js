'use strict';

var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req,res) {
        res.render('manage/index');
    });

    router.get('/books', function (req, res) {
        Book.find({}, function (err, books) {
            if (err) {
                console.log(err);
            }

            var model = {
                books: books
            }
            res.render('manage/books/index', model);
        });
    });

    router.get('/books/add', function (req, res) {
        Category.find({}, function (err, categories) {
            if (err) {
                console.log(err);
            }

            var model = {
                categories: categories
            }
            res.render('manage/books/add', model);
        });
    });

    router.post('/books', function (req, res) {
        var title = req.body.title && req.body.title.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var category = req.body.category && req.body.category.trim();
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();


        var newBook = new Book({
            title: title,
            author: author,
            publisher: publisher,
            price: price,
            category: category,
            description: description,
            cover: cover
        });

        newBook.save(function (err) {
            if (err) {
                console.log('save error', err);
            }

            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });

    router.get('/books/edit/:id', function (req, res) {
        Category.find({}, function (err, categories) {
            Book.findOne({_id:req.params.id}, function (err, book) {
                if (err) {
                    console.log(err);
                }

                var model = {
                    book: book,
                    categories: categories
                };
                res.render('manage/books/edit', model);
            });
        });
    });

    router.post('/books/edit/:id', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var description= req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();


        Book.update({_id: req.params.id}, {
            title:title,
            category: category,
            author: author,
            publisher: publisher,
            price: price,
            description: description,
            cover: cover

        }, function(err) {
            if(err) {
                console.log('update error', err);
            }

            res.location('/manage/books');
            res.redirect('/manage/books');
        });

    });

    router.post('/books/delete/:id', function (req, res) {
        Book.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
            }
            res.location('/manage/books');
            res.redirect('/manage/books');
        });
    });


    router.get('/categories', function (req, res) {
        Category.find({}, function(err, categories){
            if(err){
                console.log(err);
            }

            var model = {
                categories: categories
            };

            res.render('manage/categories/index', model);
        })
    });

    // Display category add form
    router.get('/categories/add', function (req, res) {
        res.render('manage/categories/add');
    });


    // Add a new category
    router.post('/categories', function(req, res){
        var name= req.body.name && req.body.name.trim();

        if (name == '') {
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }

        var newCategory = new Category({
            name:name
        });

        newCategory.save(function(err) {
            if(err) {
                console.log('save error', err);
            }

            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });


     // Display category edit form
    router.get('/categories/edit/:id', function (req, res) {
         Category.findOne({_id:req.params.id},function (err, category) {
            if (err) {
                console.log(err);
            }
            var model ={
                category: category
            };
            res.render('manage/categories/edit', model);
        });
    });

    // Edit category
    router.post('/categories/edit/:id', function(req, res){
        var name= req.body.name && req.body.name.trim();

        Category.update({_id: req.params.id}, {
            name:name
        }, function(err) {
            if(err) {
                console.log('update error', err);
            }

            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });

    // Delete category
    router.post('/categories/delete/:id', function (req, res) {
        Category.remove({_id: req.params.id}, function (err) {
            if (err) {
                console.log(err);
            }

            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });
};
