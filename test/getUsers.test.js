const request = require('supertest');
const app = require('../server'); 

describe('Get Users API', () => {
  // Test get all users endpoint
  describe('GET /users', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
