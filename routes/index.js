var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

const Comander = require('../models/comander');
const Pilot = require('../models/pilot');

const sessionChecker = require('../middleware/auth');

//newfile

router.delete('/api/delete_comander', async (req, res, next) => {

  try {
    let user = req.session.user;
    console.log(user.id);
    const userForm = await Comander.findOne({_id: user._id});
    if (userForm) {
      await Comander.findOneAndDelete({_id: user._id});
    }
    res.json({response: 'success'});
  } catch (e) {
    res.status(404);
  }
});

router.delete('/api/delete_pilot', async (req, res, next) => {
  try {
    let user = req.session.user;
    const userForm = await Pilot.findOne({_id: user._id});
    if (userForm) {
      await Pilot.findOneAndDelete({_id: user._id});
    }
    res.json({response: 'success'});
  } catch (e) {
    res.status(404);
  }
});

router.post('/api/usersLength', async (req, res) => {
  try {
    const comanderLength = await Comander.countDocuments();
    const pilotLength = await Pilot.countDocuments();
    const users = comanderLength + pilotLength;

    res.json({usersLength: users});
  } catch (e) {
    res.status(400).json({response: 'fail'});
  }
});

module.exports = router;
