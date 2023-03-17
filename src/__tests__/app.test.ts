import http from 'http';
import request from 'supertest';
import app from '../app';

describe("Server Tests", () => {
  let server: http.Server;

  beforeAll(() => {
    server = app.listen(3000); 
  });

  afterAll((done) => {
    server.close(done); 
  });

  describe("Server setup and configuration", () => {
    it("should start the server and listen on the specified port", async () => {
      const address = server.address();
      expect(address).toHaveProperty('port', 3000);
    });
  });

  describe("JSON handling", () => {
    it("should accept valid JSON input and return JSON output", async () => {
      const validInput = { key: "value" };
      const response = await request(app)
        .post('/') 
        .send(validInput)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('key', 'value'); 
    });

    it("should reject invalid JSON input", async () => {
      const invalidInput = "Not a JSON";
      await request(app)
        .post('/') 
        .send(invalidInput)
        .set('Accept', 'application/json')
        .expect(400); 
    });
  });

  describe("Response time", () => {
    it("should not exceed 1 second for an average request", async () => {
      const startTime = Date.now();
      await request(app)
        .get('/') 
        .expect(200);

      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThanOrEqual(1000); 
    });
  });
});
