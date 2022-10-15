const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const healthCheckController = require('../controllers/healthCheck.controller');

router.route('/health')
    .get( // localhost:3000/api/API_VERSION/health
        awaitHandlerFactory(healthCheckController.getHealthStatus)
    );

module.exports = router;