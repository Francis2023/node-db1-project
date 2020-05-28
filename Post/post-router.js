const express = require('express');


const db = require('../data/dbConfig.js');


const router = express.Router();

router.get('/', (req,res) => {
    db('accounts')
       .then(posts => {
           res.json(posts);
       })
       .catch(err => {
           res.status(500).json({ message: "errror retrieving posts", err });
       })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('accounts')
      .where({ id })
      .first()
      .then(post => {
          if(post){
              res.status(200).json({ data: post });
          } else {
              res.status(400).json({ message: "post not found"})
          }
      })
      .catch(err => {
          res.status(500).json({ message: "sorry, there's an error"})
      })
})

router.post('/', (req,res) => {
    const postData = req.body;

    db('accounts')
       .insert(postData)
       .then(post => {
           res.status(201).json(post);
       })
       .catch(err => {
           res.status(500).json({ message: "failed to create new post"})
       })
})

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts')
       .wherer({id})
       .update(changes)
       .then(count => {
           if(count > 0) {
               res.json({updated: count});
           } else {
               res.status(404).json({message: "invalid id"})
           }
       })
       .catch(err =>
          res.status(500).json({message: "error updating"})
        )
      
})

router.delete('/:id', (req, res) => {
    const {id} = req.params.id;

    db('accounts')
       .where({id })
       .del()
       .then(count => {
           if (count > 0) {
               res.status(200).json({ message: "Deleted"})
           } else {
               res.status(404).json({ message: "post not found"})
           }
       })
       .catch(err => {
           res.status(500).json({ message: "Error"})
       })
})


module.exports = router;
