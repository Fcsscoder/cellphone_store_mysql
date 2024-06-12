const express = require('express');
const router = express.Router();

router.use(require('./contatos'));
router.use(require('./sobre'));
router.use(require('./produtos'));

module.exports = router;