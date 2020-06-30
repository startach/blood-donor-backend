const express = require('express');
const router = express.Router();
const locations = require('./locations');

router.get('/', (req, res) => {
  res.render("home", {
    title: 'blood donation organaization',
    username: "cordinator",
  })
})

router.get('/goals', (req, res) => {
  res.render('goals', {
    data: {
      goal: '10,000',
      current: '2033',
    }
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/locations', locations.getAllLocations);


module.exports = router;