'use strict';
// exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'https://sheltered-hamlet-99872.herokuapp.com/';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/react-capstone-api';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/react-capstone-api-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';