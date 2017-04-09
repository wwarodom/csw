var express = require('express'); 
var app = express(); 
var router = express.Router(); 
var bodyParser = require('body-parser')
// var urlencodedParser = bodyParser.urlencoded({ extended: false }); 

var bears = [{'id':0,'name':'pooh','weight': 211}, 
	       {'id':1, 'name':'vinnie','weight': 111}]

app.use(express.static('public'))

router.route('/bears') 	  // get all the bears (accessed at GET http://localhost:8000/api/bears)
    .get(function(req, res) {    	
    	res.json(bears);
    })

    // insert a new bear
	.post(function(req, res) { 
		var bear = {}; 
		bear.id = req.body.id
		bear.name = req.body.name
		bear.weight = req.body.weight		
		bears.push(bear); 
		res.json(bears)
	}) 

// get a single bear
router.route('/bears/:bear_id')
	.get (function(req,res) {
    	res.json(bears[req.params.bear_id])
    })

	.put (function(req,res) {
		var id = req.params.bear_id
        bears[id].name = req.body.name;  // update the bears info
        bears[id].weight = req.body.weight;  // update the bears info
        res.json({ message: 'Bear updated!' });        
     })

	.delete (function(req,res) {
		var id = req.params.bear_id
		delete 	bears[id]
        res.json({ message: 'Bear deleted!' });        
    })

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' }) 
});

// all of our routes will be prefixed with /api 
// user with angular.js
 // app.use('/api', bodyParser.json(), router);  

// use with post man xxx-urlencoded form
 app.use('/api', bodyParser.urlencoded({ extended: false }), router);   



app.use("*",function(req,res){
  res.status(404).send('404 Not found');
 // res.sendFile(__dirname + "/public/404.html");
});

app.listen(80, function() {
	console.log("Server is running")
});
