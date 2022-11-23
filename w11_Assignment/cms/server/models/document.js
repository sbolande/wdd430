const mongoose = require("mongoose");

const childDocumentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
});

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  url: { type: String },
  children: [{ type: childDocumentSchema }],
});

module.exports = mongoose.model("Document", documentSchema);
