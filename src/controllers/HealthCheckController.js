const mongoose = require('mongoose');

const serviceStatus = {
  database: {},
  service: "Ready"
}

const HealthCheckController = {

  getServiceStatus: () => {
    switch (mongoose.connection.readyState) {
      case 0:
        serviceStatus.database = "Connected successfully!"
        break;

      case 1:
        serviceStatus.database = "Database connection failed!"
        break;
      
      case 2:
        serviceStatus.database = "Trying to connect to database!"
        break;
    
      default:
        serviceStatus.database = "Error during DB connection state check!"
        break;
    }
  }
}

module.exports = HealthCheckController;