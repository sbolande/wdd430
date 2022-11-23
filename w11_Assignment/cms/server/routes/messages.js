const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
var express = require("express");

var router = express.Router();

router.get("/", (req, res, next) => {
  Message.find()
    .then((msgs) => {
      res.status(200).json({
        message: "Retrieved messages from database.",
        messageObjs: msgs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving messages from the database.",
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const msg = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });
  msg
    .save()
    .then((createdMsg) => {
      res.status(201).json({
        message: "Message added successfully.",
        messageObj: createdMsg,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the message.",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((msg) => {
      msg.subject = req.body.subject;
      msg.msgText = req.body.msgText;
      msg.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, msg)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem updating the message.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Message not found.",
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((msg) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully.",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the message.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Message not found.",
        error: err,
      });
    });
});

module.exports = router;
