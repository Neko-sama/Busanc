var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



/* GET home page. */
router.get('/', function (req, res) {
    res.render('prueba', { title: 'INDEX' });
    //res.send('<form action="/" method="post"><input type="text" name="title" /><input type="submit" /></form>');
});


router.post('/', function (req, res) {
    console.log(req.body.title);
});

module.exports = router;