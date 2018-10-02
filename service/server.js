var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var json_file = 'book_list.json';
var json_file2 = JSON.parse(fs.readFileSync('book_list.json').toString());

var port = process.env.PORT||4000;

var router = express.Router();


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());




function jsRead(){

  return new Promise(resolve => {
    fs.readFile(json_file, 'utf8', function (err, response) {
        if (err) {
            console.log("jsRead error");
            return reject(err);
        }
        return resolve(JSON.parse(response));
    });
  });

}

function jsWrite(data){

  return new Promise(resolve => {

    fs.writeFile(json_file, data, 'utf8', function(err, response){
      if (err) {
          return reject(err);
      }
      return resolve(JSON.parse(data));
    });
  });

}

router.get('/',function(req,res){
  res.json({error:'Erişim verilmedi.'});
});

/* LIST*/
router.get('/list',function(req,res){
  var collection = jsRead();
  jsRead().then(function(ret){
    return res.json(ret);
  }).catch(function(err){
    console.log(err);
    return res.json({ error: err });
  });
});
/* LIST*/

router.get('/book',function(req, res){
      return res.json({error:'invalidBookId'});
});

/* GET ID */
router.get('/book/:id',function(req, res){
    if(! req.params.id) return res.json({ error: 'invalidBookId' });
    var bookId =  parseInt(req.params.id);

    jsRead().then(function(ret){

      const book = ret.find((book) => parseInt(book.id) === bookId)

      if(book){
         return res.json(book);
      } else{
        return res.json({ error: 'bookNotFound' });
      }


    }).catch(function(err){
        console.log(err);
        return res.json({ error: err });
    });

});
/* GET ID */

/* POST */
router.post('/book', function (req, res) {

    if(req.body.id){
        res.json({error:'Lütfen ID göndermeyin.'});
    }

    var bigId = 0;
    var json = req.body;

    jsRead().then(function(ret){

        for(var i = 0; i < ret.length; i++){
          if(parseInt(ret[i].id) > bigId){
            bigId = parseInt(ret[i].id);
          }
        }
        bigId++;
        json.id = bigId;


        ret.unshift(json);
        ret = JSON.stringify(ret);

        jsWrite(ret).then(function(ret2){
          return res.json({message:'create'});
        }).catch(function(err){
          console.log(err);
          return res.json({ error: err });
        });

    }).catch(function(err){
      console.log(err);
      return res.json({ error: err });
    });

});
/* POST */

/* PUT */
router.put('/book/:id',function(req, res){
    var bookId = parseInt(req.params.id);
    var collection = req.body;
    collection.id = bookId;

    jsRead().then(function(ret){

      for(var i = 0; i < ret.length; i++){
        if(parseInt(ret[i].id) === bookId){
            ret.splice(i, 1);
        }
      }

      ret.unshift(collection);
      ret = JSON.stringify(ret);

      jsWrite(ret).then(function(ret2){
        return res.json(ret2);
      }).catch(function(err){
        console.log(err);
        return res.json({ error: err });
      });


    }).catch(function(err){
      console.log(err);
      return res.json({ error: err });
    });

});
/* PUT */



/* DELETE */
router.delete('/book/:id', function (req, res) {

    var bookId = parseInt(req.params.id);


    jsRead().then(function(ret){

      for(var i = 0; i < ret.length; i++){
        if(parseInt(ret[i].id) === bookId){
            ret.splice(i, 1);
        }
      }

      ret = JSON.stringify(ret);

      jsWrite(ret).then(function(ret2){
        return res.json(ret2);
      }).catch(function(err){
        console.log(err);
        return res.json({ error: err });
      });


    }).catch(function(err){
      console.log(err);
      return res.json({ error: err });
    });




});
/* DELETE */




app.use('/api',router);


app.listen(port);
console.log('Server '+port+' portu üzerinde çalışmaya başladı!');
