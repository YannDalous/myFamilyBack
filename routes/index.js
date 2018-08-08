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

        return {id_membre: user._id, status_membre: ""};
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

   taskModel.find({_id:req.query.idTache}, function(err, task){

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

      res.json({task});
    });
  });
});


//Route pour afficher les taches crées par l'utilisateur
router.get('/tachesCrees', function(req, res, next) {
  taskModel.find(function (erreur, resultat) {


    res.json(resultat);
   });
});
//-------------------------------------------
router.get('/refused', function(req, res, next) {
  var updateMember = [];

  taskModel.find(
      { _id: req.query.idTache } ,

      function (err, task) {

        updateMember = task[0].statusMembre.map(member => {

          if (member != null) {
          if (member.id_membre == req.query.idMember) {

            return {id_membre: member.id_membre, status_membre: "NO" };
          } else {

            return {id_membre: member.id_membre, status_membre: member.status_membre };
          }
        }
        });

          taskModel.update(
              { _id: req.query.idTache},
              { statusMembre: updateMember },
              function(error, raw) {
                console.log(req.query.idMember);
                  res.json(req.query.idMember);
              }
          );
      }
  )
});

router.get('/accept', function(req, res, next) {
  var updateMember = [];

  taskModel.find(
      { _id: req.query.idTache } ,

      function (err, task) {

        updateMember = task[0].statusMembre.map(member => {

          if (member != null) {
          if (member.id_membre == req.query.idMember) {

            return {id_membre: member.id_membre, status_membre: "OK" };
          } else {

            return {id_membre: member.id_membre, status_membre: member.status_membre };
          }
        }
        });

          taskModel.update(
              { _id: req.query.idTache},
              { statusMembre: updateMember,
              statusTache: "accepte" },
              function(error, raw) {
                  res.json(req.query.idMember);
              }
          );
      }
  )
});

module.exports = router;
