const sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");
var express = require("express");

var router = express.Router();

router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      res.status(200).json({
        message: "Retrieved contacts from database.",
        contacts: contacts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving contacts from the database.",
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });
  contact
    .save()
    .then((createdContact) => {
      res.status(201).json({
        message: "Contact added successfully.",
        contact: createdContact,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the contact.",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contact)
        .then((result) => {
          res.status(204).json({
            message: "Contact updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem updating the contact.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Contact not found.",
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then((contact) => {
      Contact.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Contact deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the contact.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Contact not found.",
        error: err,
      });
    });
});

module.exports = router;
