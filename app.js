var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var User = require('./models').User

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/user', function(request, response){
  User.create(
    {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password
    }
  ).then((user)=>{
    response.json({
      message: 'success',
      user: user
    })
  }).catch((error)=>{
    response.status(400)
    response.json({
      message: "Unable to create User",
      errors: error.errors
    })
  })
})

app.get('/', function (request, response) {
  response.json({message: 'API Example App'})
});

app.post('/test', function(request, response){
  response.json({params: request.body})
})

app.listen(3000, function () {
 console.log('Todo Server listening on port 3000!');
});
