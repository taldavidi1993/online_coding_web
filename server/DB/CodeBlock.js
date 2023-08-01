const mongoose = require('mongoose');

const CodeBlockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CodeBlock = mongoose.model('CodeBlock', CodeBlockSchema);
module.exports = { CodeBlock };
