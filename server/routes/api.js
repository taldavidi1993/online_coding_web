const express = require('express');
const router = express.Router();

const { login } = require('../controller/user');
const {
  findAllCodeBlocks,
  findOneCodeBlock,
  changeCodeBlockName,
} = require('../controller/codeblock');

router.put('/login', login);
router.get('/findAllCodeBlocks', findAllCodeBlocks);
router.get('/findOneCodeBlock/:id', findOneCodeBlock);
router.put('/changeCodeBlockName', changeCodeBlockName);
module.exports = router;
