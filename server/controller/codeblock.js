const { CodeBlock } = require('../db/CodeBlock');

exports.findAllCodeBlocks = async (req, res, next) => {
  try {
    const codeBlock = await CodeBlock.find().select({ title: 1, name: 1 });

    res.send(codeBlock);
  } catch {}
};

exports.findOneCodeBlock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const codeBlock = await CodeBlock.findById(id).select({
      content: 1,
      _id: 0,
    });
    res.send(codeBlock).status(200);
  } catch (err) {
    console.log(err);
  }
};

exports.findOneAndUpdate = async (id, content) => {
  await CodeBlock.findOneAndUpdate({ _id: id }, { content: content });
};
exports.changeCodeBlockName = async (req, res, next) => {
  try {
    const { id, newName } = req.body;
    await CodeBlock.findOneAndUpdate({ _id: id }, { name: newName });
    res.send('name of code block changed');
  } catch (err) {
    console.log(err);
  }
};
