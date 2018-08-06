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
    owner: String,
    title: String,
});

var taskModel = mongoose.model('tasks', taskSchema);

var addMember = [{
lastName: 'avatar-1'
},{
lastName: 'avatar-2'
},{
lastName: 'avatar-3'
},{
lastName: 'avatar-4'
},{
lastName: 'avatar-5'
}];
console.log(addMember.length);
for (var i=0; i<addMember.length; i++) {
  var newMember = new MemberModel (addMember[i]  );
  newMember.save(function(error, member){});
}



/*

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
