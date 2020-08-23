const mongoose = require('mongoose');

function isConnected() {
  return (mongoose.connection.readyState == 1)
}

function getMongoStatusMessage() {
  switch (mongoose.connection.readyState) {
    case 0:
      return "An error occured while connecting to MongoDB database";
    
    case 1:
      return "Successfully connected to MongoDB database";

    case 2:
      return "Connecting to MongoDB database";

    case 3:
      return "Disconnecting from MongoDB database";
    
    default:
      return "Unexpected MongoDB connection status";
  }
}

function isReady() {
  return isConnected();
}

function getServiceNumericStatus() {
  if(!isConnected())
    return 0;
  else
    return 1;
}

function getServiceStatusMessage() {
  switch(getServiceNumericStatus()) {
    case 0:
      return "Not ready"

    case 1:
      return "Ready"
  }
}

const HealthCheckController = {
  getServiceStatus: () => {
    return {
      database: {
        isConnected: isConnected(),
        status: mongoose.connection.readyState,
        message: getMongoStatusMessage()
      },
      service: {
        isReady: isReady(),
        status: getServiceNumericStatus(),
        message: getServiceStatusMessage()
      }
    }
  }
}

module.exports = HealthCheckController;