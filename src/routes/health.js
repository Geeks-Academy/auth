const router = require('express').Router();

router.get('/ready', (req, res) => {
  res.json({
    status: "Ready"
  })
});

module.exports = router;