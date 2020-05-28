const express = require("express");

//const db = require("../data/dbConfig.js");

const postRouter = require("../Post/post-router.js")

const server = express();

server.use(express.json());

server.use('/api/post', postRouter);

server.get('/', (req,res) => {
    res.status(200).json({message: "node-db-js1"})
})

module.exports = server;
