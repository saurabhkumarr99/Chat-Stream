const requestSkr = require('supertest'); // Import supertest to make HTTP assertions
const appSkr = require('../server'); // Import the server configuration

// Describe block defines the suite of tests for the "Get Users API"
describe('Get Users API Skr', () => {
  // Nested describe block specifically for testing the GET /users endpoint
  describe('GET /users Skr', () => {
    // Individual test case to check if all users are retrieved correctly
    it('should get all users Skr', async () => {
      const responseSkr = await requestSkr(appSkr).get('/users'); // Perform GET request on /users endpoint
      
      expect(responseSkr.status).toBe(200); // Assert that the HTTP status code is 200
      expect(responseSkr.body).toBeInstanceOf(Array); // Assert that the response body is an array
    });
  });
});
