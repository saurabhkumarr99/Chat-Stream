const request = require('supertest');
const app = require('../server'); 

describe('Register API', () => {
  // Test registration endpoint
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('username', newUser.username);
      expect(response.body).toHaveProperty('email', newUser.email);
    });
  });
});
