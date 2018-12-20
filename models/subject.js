var db = require('../db/dbconfig');
var subject = {};

subject.getAll = function (req, res, next) {
    db.manyOrNone("SELECT * FROM subject;")  
      .then(function (result) {
        res.locals.subject = result;
        next(); 
      })
      .catch(function(error){ 
        console.log('error',error);
        next();
      })
  }

  subject.find = function (req, res, next) {
    var id = req.params.id;
      db.oneOrNone("SELECT * FROM subject WHERE id = $1", [id])
        .then(function(result){
          res.locals.subject = result;
          next();
        })
        .catch(function(error){
          console.log(error);
          next();
        })
    }

subject.create = function(req , res , next){
  var subjectData = {
    subjectname: req.body.subjectname
  }
  console.log(req.body)
  db.one(`INSERT INTO subject (subjectname) VALUES($1) RETURNING id;` , [subjectData.subjectname])
  .then(function(result){
    console.log(result)
    res.locals.subject_id = result.id;
    next();
  })
  .catch(function(error){
    console.log(error);
    next();
  })
}



subject.update = function(req , res , next){
   var subjectData = {
   subjectName: req.body.subjectName
     }
        console.log(req.body);
        db.one(
            `INSERT INTO subject(subjectName) VALUES($1) RETURNING id;`,[subjectData.subjectName])
            .then(function(result){
                console.log(result)
                res.locals.subject = result.id;
                next(); 
            })
            .catch(function(error){
                console.log(error);
                next();
            })
    }

subject.delete = function(req, res, next){  
    db.none('DELETE FROM subject WHERE id=$1;', [req.params.id])
     .then(function(){  
       console.log('Deleted!!!!!!!!!!');
       next();
   })
          .catch(function(error){
            console.log(error);
            next();
          })
 }

module.exports = subject;