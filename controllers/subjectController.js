var express = require('express');
var router = express.Router();

var subject = require('../models/subject');
var lesson = require('../models/lesson');

router.get('/', subject.getAll, renderIndex); // show all the subjects 
router.get('/new', renderNew);// create a new subject 
router.get('/:id', lesson.findBySubject ,  subject.find , renderShow); // select a subject 
router.get('/:id/lesson/new',renderNewLesson);
router.post('/', subject.create, redirectIndex); // when i creat a new subject it retuns me to the show page
router.delete('/:id', subject.delete , redirectIndex); // when i delete a subject it retuns me to the show page


router.post('/:id/lesson', lesson.create, redirectShow);

// router.get('/subject/:id' , lesson.find , renderIndexLesson)
// router.get('/:id/edit' ,subject.find , renderEdit) // edit a subject name
// router.put('/:id' , subject.update, redirectShow); // when i update a subject name it retuns me to the show page

function renderIndex(req, res){
  mustacheVariables = {
    subject: res.locals.subject
  }
  res.render('./subject/index', mustacheVariables);
//   console.log(mustacheVariables);
}

function renderNewLesson(req,res){
  res.render('./lesson/new' , { id: req.params.id});
}
// function renderIndexLesson(req, res){
//     mustacheVariables = {
//         lesson: res.locals.lesson
//     }
//     res.render('./lesson/index', mustacheVariables);
//   //   console.log(mustacheVariables);
//   }

function renderShow(req,res){
  mustacheVariables = res.locals.subject;
  res.render('./subject/show', mustacheVariables);
}

// function renderEdit(req ,res){
//   var mustacheVariables =  res.locals.subject;
//   res.render('./subject/edit' , mustacheVariables);
// }

function renderNew(req, res){
  res.render('./subject/new');
}

function redirectShow(req, res) {
  console.log(req.body);
  res.redirect(`/subject/${res.locals.subject_id}`);
}

function redirectIndex(req, res){
  res.redirect('/subject');
}

module.exports = router;