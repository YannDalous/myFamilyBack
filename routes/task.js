var mongoose= require('mongoose');

var options = { server: { socketOptions: {connectTimeoutMS: 5000 } }};
mongoose.connect('mongodb://adm:azerty123@ds259361.mlab.com:59361/myfamilyapp',
    options,
    function(err) {
     console.log(err);
    }
);

var taskSchema = mongoose.Schema({
    nomTache: String,
    description: String,
    date:{ type: Date, default: Date.now },
    idPieceJointe: String,
    idOwner: String,
    statusTache: String,
    statusMembre:[]

});

var taskModel = mongoose.model('tasks', taskSchema);
console.log(Date.now);

  var newTask = new taskModel ({
    nomTache: 'Lessive',
    description: 'Etendre le linge',

    idPieceJointe:'',
	idOwner: '1',
	statusTache: 'Soumis',
	statusMembre: [{id: '2', status: ''}, {id: '3', status: ''}]
  });
console.log(newTask);
  newTask.save(
      function (error, user) {
         console.log(user);
      }
  );
