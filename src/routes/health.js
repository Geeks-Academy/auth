const router = require('express').Router();
const HealthCheckController = require('../controllers/HealthCheckController');

router.get('/', (req, res) => {
  res.json({
    status: HealthCheckController.getServiceStatus()
  });
});

module.exports = router;