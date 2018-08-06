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



// GET route "detail" => détail de la tache
router.get('/detail', function(req, res, next) {
   taskModel.find({_id:req.query.idTache}, function(err, task){

        res.json({nomTache:task.taskName,
                  descriptionTache:task.description,
                  date:task.date,
                  idOwner:task.idOwner});
   })


});


// Route delete 



module.exports = router;
