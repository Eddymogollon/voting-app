const mongoose = require('mongoose');
const _ = require('lodash');
const Poll = mongoose.model('polls');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  // Get Requests

  app.get('/api/all-polls', (req, res) => {
    Poll.find().then(polls => {
      res.send(polls);
    });
    
  });

  // Post Requests
  // app.post('/api/add-option', requireLogin, (req, res) => {
  //   const { id, option } = req.body;

  //   Poll.findOneAndUpdate(
  //     { _id: id }, 
  //     { $push: option } 
  //   ).then(poll => {
  //     res.send(poll);
  //   })

  // });

  app.post('/api/remove-poll', requireLogin, (req, res) => {

    //pollId = {_id: '5a1791335f02540614cfecb9'}
    console.log(req.body.pollId);
    Poll.findOneAndRemove({_id: req.body.pollId}).then(res => {
      console.log(res);
    });
    res.send("Poll removed");
  });

  app.get('/api/user-polls', requireLogin, (req, res) => {

    Poll.find({ownerId: req.user._id}).then((poll) => {
      res.send(poll);
    });

  });

  app.post('/api/create-poll', requireLogin, (req, res) => {

    // console.log(req.query.title);
    // const { title, options }
    const { title, options } = req.body;
    
    Poll.create({ title, options, ownerId: req.user._id });
    
    res.send('Poll created!');
    
  });

  app.post('/api/get-poll', (req, res) => {

    //console.log(req.body);  
    // Chocolate or Vanilla?  
    Poll.findOne(req.body)
      .then(poll => {
        res.send(poll);
      })
      .catch(error => {
        console.log(error);
      });

  });

  app.post('/api/add-vote', (req, res) => {

    console.log(req.body);
    console.log("hello?");


    // Check if user already voted
    // pollId = '5a18d801663b3a3640adfff0';
    pollId = req.body.pollId;
    // optionName = 'Strawberry';
    optionName = req.body.option;
    // console.log(req.body);

    // if vote doesnt exist, add it
    Poll.findById({_id: pollId}).then(poll => {
      
      // const userId = req.user._id;
      // if (poll.usersVoted.indexOf(userId) >= 0) {
      //   console.log("The user already exists!!");
      //   res.send('User already voted!');
      // } else {
      //   poll.usersVoted.push(userId);
      // }

      index = _.findIndex(poll.options, { option: optionName });

      if (index >= 0) {
        poll.options[index].votes += 1;
      } else {
        poll.options.push({option: optionName, votes: 1});
      }

      console.log(poll);
      poll.save().then((updatedPoll) => {
        res.send(updatedPoll);
      });
      
    });
  
  });

};
