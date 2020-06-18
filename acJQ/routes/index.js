var express = require('express');
var router = express.Router();


var ServerArray = [];
var lastID = 1;
var Item = function (pType, pVariation, pCount,pPrice) {
  this.type = pType;
  this.variation = pVariation;
  this.count = pCount;
  this.ID = indexCounter++;  //each time we create a new Item type and variation we give it a unique ID 
  this.price=pPrice;
  
}

/* GET home page. */
router.get('/getItems', function(req, res, next) {
  res.json(ServerArray);
});



/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
  res.sendfile("./public/");
});



router.post('/AddDelete', function (req, res){
  const newItem = req.body;
  newItem.ID = lastID++;
  ServerArray.push(newItem);
  res.status(200).json(newItem);

});

router.delete('/DeleteItem/:ID', (req, res) => {
  const delID = req.params.ID;
  let found = false;

  for(var i = 0; i < ServerArray.length; i++) // find the match
  {
    console.log(ServerArray[i].ID)
      if(ServerArray[i].ID == delID){
        ServerArray.splice(i,1);  // remove object from array
          found = true;
          break;
      }
  }

  if (!found) {
    console.log("not found");
    return res.status(500).json({
      status: "error"
    });
  } else {
  res.send('Item with ID: ' + delID + ' deleted!');
  }
});
module.exports = router;
