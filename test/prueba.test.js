const request = require('supertest');
const app = require('../index'); 

describe('Pruebas de integración básicas', () => {
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