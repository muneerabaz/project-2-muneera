var db = require('../db/dbconfig');
var lesson = {};
// getAll view all the lessens 
// find open a spsific lessen depinding on the subject 
// update means edit the lessen not 
lesson.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM lesson;")  
      .then(function (result) {
        res.locals.lesson = result;
        next(); 
      })
      .catch(function(error){ // if something goes wrong the catch catches the error so it dose not mess evertthing else on the code
        console.log('error',error);
        next();
      })
  }

  lesson.findBySubject = function (req, res, next) {
    var id = req.params.id;
      db.manyOrNone("SELECT * FROM lesson WHERE subject_id = $1;", [id])
        .then(function(result){
          res.locals.lesson = result;
          next();
        })
        .catch(function(error){
          console.log(error);
          next();
        })
    }


    lesson.find = function (req, res, next) {
  var id = req.params.id;
    db.oneOrNone("SELECT * FROM lesson WHERE id = $1;", [id])
      .then(function(result){
        res.locals.lesson = result;
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
  }

  lesson.create = function(req , res , next){
    console.log("creating a lessons"); 
    var lessonData = {
      topic: req.body.topic,
      notes: req.body.notes,
      subject_id: parseInt(req.params.id)
    }
    console.log(lessonData)
    db.one(`INSERT INTO lesson (subject_id, topic, notes) VALUES($1, $2, $3) RETURNING subject_id;` , [lessonData.subject_id,lessonData.topic , lessonData.notes])
    .then(function(result){
      console.log(result)
      res.locals.subject_id = result.subject_id;
      next();
    })
    .catch(function(error){
      console.log('ERROR IN LESSON.CREATE')
      console.log(error);
      next();
    })
  }

  lesson.update = function(req , res , next){
    // if (subject_id == 'Statistics'){
    //     subject_id == 1;
    // }else (subject_id == )
    var lessenData = {
        // subject_id = req.body.subject_id,
        topic: req.body.topic ,
        notes: req.body.notes
    }
    console.log(req.body);
    db.one(
        `INSERT INTO lesson(topic, notes ) VALUES($1 ,$2 ) RETURNING id;`,[lessenData.topic , lessenData.notes])
        .then(function(result){
            console.log(result)
            res.locals.lesson_id = result.id;
            next(); 
        })
        .catch(function(error){
            console.log(error);
            next();
        })
}

lesson.delete = function(req, res, next){
    db.none('DELETE FROM lesson WHERE id=$1;', [req.params.id])
      .then(function(){
        console.log('Deleted!!!!!!!!!!');
        next();
      })
      .catch(function(error){
        console.log(error);
        next();
      })
  }
  
  module.exports = lesson;