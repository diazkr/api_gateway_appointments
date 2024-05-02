const request = require('supertest');
const nock = require('nock');
const app = require('../index'); 

describe('Pruebas de integración básicas', () => {
  beforeAll(() => {
    // Mocking the external services
    nock('https://appointments-gogtlsicya-uk.a.run.app')
      .get('/appointment')
      .reply(200, 'Appointment service response');

    nock('http://35.221.2.215:3002')
      .get('/users')
      .reply(200, 'Users service response');
  });

  it('Debe responder con código 200 en la ruta de prueba', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('Debe redirigir las solicitudes al servicio de citas', async () => {
    const response = await request(app).get('/appointment-service/appointment');
    expect(response.statusCode).toBe(200);
  });

  it('Debe redirigir las solicitudes al servicio de usuario', async () => {
    const response = await request(app).get('/users-service/users');
    expect(response.statusCode).toBe(200);
  });
});
