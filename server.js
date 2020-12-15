const express = require('express');
const app = express();
const articlesRouter = require('./routes/articles');
const mongoose = require('mongoose');
const Article = require('./models/articles');
const methodOverride = require('method-override');


mongoose.connect('mongodb://localhost/blog', {useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex: true});

app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended : false}));
app.use('/articles' , articlesRouter);
app.use(methodOverride('_method'));

app.get('/', async (req, res) =>{
    const articles = await Article.find().sort({
        date : 'desc'
    });
    
    res.render('articles/index', {articles :  articles});
})

app.listen(5000);