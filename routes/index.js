var express = require('express');
var router = express.Router();

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

module.exports = router;
