var express = require('express');
var router = express.Router();
var lesson = require('../models/lesson');

router.get('/', renderIndex); // list all the lessons
// router.get('/:id/edit' ,lesson.find , renderEdit) // edit a lessen that i chosie , name of the lessen
router.get('/new', renderNew); // create a new lesson
router.get('/:id', lesson.find , renderShow); // select a lessen by id
router.post('/:id', lesson.create, redirectShow); 
router.delete('/:id', lesson.delete, redirectIndex); //delete a lessen by id
// router.put('/:id' , lesson.update, redirectShow); 

function renderIndex(req, res){
  mustacheVariables = {
    lesson: res.locals.lesson
  }
  res.render('./lesson/index', mustacheVariables);
}

function renderShow(req,res){
    mustacheVariables = res.locals.lesson;
    res.render('./lesson/show', mustacheVariables);
  }

  function renderNew( req,res){
    res.render('./lesson/new')
  }

  function redirectIndex(req, res){
    res.redirect('/lesson/');
  }

  function redirectShow(req , res){
    res.redirect(`/lesson/${res.locals.lesson_id}`);
  }
module.exports = router;