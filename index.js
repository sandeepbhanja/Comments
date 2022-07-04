const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded({
    extended: true
}));
const{v4: uuid} = require('uuid');
const mo = require('method-override');
app.use(mo('__method'));

let comment = [
    {
        id : uuid(),
        username: 'Bob',
        comments: 'lolol'
    },
    {
        id : uuid(),
        username: 'Rob',
        comments: 'Hello'
    },
    {
        id : uuid(),
        username: 'James',
        comments: 'Hola'
    }
]

app.get('/comments',(req, res) => {
    res.render('comments/index', {comment});
});

app.post('/comments', (req, res) => {
    console.log(req.body);
    const{username, comments} = req.body;
    const id = uuid();
    comment.push({id,username,comments});
    res.redirect('/comments');
})

app.get('/comments/new',(req, res) => {
    res.render('comments/new');
});

app.get('/comments/:id', (req, res) => {
    const {id} = req.params;
    const com = comment.find(c => c.id === id);
    res.render('comments/show',{com});
});

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const com = comment.find(c => c.id === id);
    res.render('comments/edit',{com});
});

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comment = comment.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comment.find(c => c.id === id);

    //get new text from req.body
    console.log(req.body);
    const newCommentText = req.body.comments;
    //update the comment with the data from req.body:
    foundComment.comments = newCommentText;
    //redirect back to index (or wherever you want)
    res.redirect('/comments')
})

app.listen(3000,(req,res)=>{
    console.log("Active");
})