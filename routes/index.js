var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');

var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://adm:azerty123@ds259361.mlab.com:59361/myfamilyapp',
    options,
    function(err) {
     console.log(err);
    }
);

var memberSchema = mongoose.Schema({
    avatar: String,
    lastName: String,
    firstName: String,
    relationShip: String,
    driver: Boolean,
    authority: Boolean
});

var MemberModel = mongoose.model('members', memberSchema);

var taskSchema = mongoose.Schema({
    nomTache: String,
    description: String,
    date: Date,
    idPieceJointe: String,
    idOwner: String,
    statusTache: String,
    statusMembre:[]

});

var taskModel = mongoose.model('tasks', taskSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Route POST
router.post('/addCard', function(req, res, next) {
var members;
var owner;
  MemberModel.find(
    function (err, users) {

     members = users.map(function(user) {

      if (user._id != req.body.idOwner) {

        return {id_membre: user._id, status_membre: ""}
      }
    });

      var task = new taskModel({
        nomTache: req.body.taskName,
        description:req.body.description,
        date:req.body.date,
        idPieceJointe:"",
        idOwner:req.body.idOwner,
        statusTache:"soumis",
        statusMembre:members
      });



      task.save(function(err,tasks){

        res.json({taskId: task._id})

      });

  }
  );

  });


// GET route "detail" => détail de la tache
router.get('/detail', function(req, res, next) {
  console.log("route get detail ok");
  console.log(req.query);
   taskModel.find({_id:req.query.idTache}, function(err, task){
console.log("task", task);
        res.json({nomTache:task[0].nomTache,
                  descriptionTache:task[0].description,
                  date:task[0].date,
                  idPieceJointe:task[0].idPieceJointe,
                  idOwner:task[0].idOwner});
   })
});


// Route delete
router.delete('/delete', function(req,res,next){
  taskModel.remove({_id:req.query.idTache},function(err){
    taskModel.find(function(err,task){
      console.log(task);
      res.json({task});
    });
  });
});

router.post('/addTask', function(req, res, next) {
  console.log(req.body.taskName,
                req.body.descTask,
                req.body.dateTime,
                req.body.owner
              )

              var newUser = new UserModel ({
               lastName: "Doe",
               firstName: "John",
               age: 43
              });

              newUser.save(
    function (error, user) {

    }
);


    res.json({res})

  });






//Route pour afficher les taches crées par l'utilisateur
router.get('/tachesCrees', function(req, res, next) {
  taskModel.find(function (erreur, resultat) {
        console.log(resultat);

    res.json({resultat});
   });
});
//-------------------------------------------



module.exports = router;
