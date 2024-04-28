const requestSkr = require('supertest');
const appSkr = require('../server');

// Describe block for testing the Register API functionality
describe('Register API Skr', () => {
  // Nested describe for the POST /register endpoint
  describe('POST /register Skr', () => {
    // Test case for successful user registration
    it('should register a new user Skr', async () => {
      const newUserSkr = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const responseSkr = await requestSkr(appSkr)
        .post('/register')
        .send(newUserSkr);

      expect(responseSkr.status).toBe(201);
      expect(responseSkr.body).toHaveProperty('username', newUserSkr.username);
      expect(responseSkr.body).toHaveProperty('email', newUserSkr.email);
    });
  });
});
