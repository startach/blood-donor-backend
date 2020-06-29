const express = require('express');
const router = express.Router();
const locations = require('./locations');

router.get('/', (req, res) => {
    res.render("home", {
      title: 'blod donation organaization',
      username: "cordinator",
    })
  })

 router.get('/locations',locations.getAllLocations ); 


module.exports = router;