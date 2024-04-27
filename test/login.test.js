const request = require('supertest');
const app = require('../server');

describe('Login API', () => {
  // Test login endpoint
  describe('POST /login', () => {
    it('should login with valid credentials', async () => {
      const userCredentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/login')
        .send(userCredentials);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 with invalid credentials', async () => {
      const invalidCredentials = {
        email: 'invalid@example.com',
        password: 'invalidpassword'
      };

      const response = await request(app)
        .post('/login')
        .send(invalidCredentials);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid email or password');
    });

    it('should return 500 if server encounters an error', async () => {
      const userCredentials = {
        email: 'test@example.com',
        password: 'password123'
      };

      // Mocking an error by sending invalid request body
      const response = await request(app)
        .post('/login')
        .send();

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal Server Error');
    });
  });
});
