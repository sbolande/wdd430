const sequenceGenerator = require("./sequenceGenerator");
const Document = require("../models/document");
var express = require("express");

var router = express.Router();

router.get("/", (req, res, next) => {
  Document.find()
    .then((docs) => {
      res.status(200).json({
        message: "Retrieved documents from database.",
        documents: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem retrieving documents from the database.",
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });
  document
    .save()
    .then((createdDocument) => {
      res.status(201).json({
        message: "Document added successfully.",
        document: createdDocument,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was a problem creating the document.",
        error: err,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((doc) => {
      doc.name = req.body.name;
      doc.description = req.body.description;
      doc.url = req.body.url;

      Document.updateOne({ id: req.params.id }, doc)
        .then((result) => {
          res.status(204).json({
            message: "Document updated successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem updating the document.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Document not found.",
        error: err,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then((doc) => {
      Document.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Document deleted successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "There was a problem deleting the document.",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Document not found.",
        error: err,
      });
    });
});

module.exports = router;
