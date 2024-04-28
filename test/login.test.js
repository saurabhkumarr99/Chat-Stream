const requestSkr = require('supertest');
const appSkr = require('../server');

// Describe block for testing the Login API functionality
describe('Login API Skr', () => {
  // Nested describe for the POST /login endpoint
  describe('POST /login Skr', () => {
    // Test case for successful login with valid credentials
    it('should login with valid credentials Skr', async () => {
      const userCredentialsSkr = {
        email: 'test@example.com',
        password: 'password123'
      };

      const responseSkr = await requestSkr(appSkr)
        .post('/login')
        .send(userCredentialsSkr);

      expect(responseSkr.status).toBe(200);
      expect(responseSkr.body).toHaveProperty('message', 'Login successful');
      expect(responseSkr.body).toHaveProperty('token');
    });

    // Test case for failed login due to invalid credentials
    it('should return 401 with invalid credentials Skr', async () => {
      const invalidCredentialsSkr = {
        email: 'invalid@example.com',
        password: 'invalidpassword'
      };

      const responseSkr = await requestSkr(appSkr)
        .post('/login')
        .send(invalidCredentialsSkr);

      expect(responseSkr.status).toBe(401);
      expect(responseSkr.body).toHaveProperty('error', 'Invalid email or password');
    });

    // Test case for simulating a server error during login
    it('should return 500 if server encounters an error Skr', async () => {
      const userCredentialsSkr = {
        email: 'test@example.com',
        password: 'password123'
      };

      // Intentionally causing an error by sending an incomplete request
      const responseSkr = await requestSkr(appSkr)
        .post('/login')
        .send();

      expect(responseSkr.status).toBe(500);
      expect(responseSkr.body).toHaveProperty('error', 'Internal Server Error');
    });
  });
});
