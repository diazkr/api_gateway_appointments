const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
const port = 3005;

app.use(cors());

app.use('/appointment-service', createProxyMiddleware({
    target:'https://appointments-gogtlsicya-uk.a.run.app',
    pathRewrite:{
        '^/appointment-service':''
    },
    changeOrigin: true 
}))

app.use('/users-service', createProxyMiddleware({
    target:'http://35.221.2.215:3002',
    pathRewrite:{
        '^/users-service':''
    },
    changeOrigin: true 
}))



app.use('/register-login-service', createProxyMiddleware({
    target: 'https://us-east4-isbn-2024i-418019.cloudfunctions.net/login',
    pathRewrite: {
        '^/login-service': ''
    },
    changeOrigin: true 
}))

app.use('/login-service', createProxyMiddleware({
    target:'https://us-east4-isbn-2024i-418019.cloudfunctions.net/authentication',
    pathRewrite:{
        '^/register-login-service':''
    },
    changeOrigin: true 
}))

app.get('/', (req, res) => {
    res.status(200).send('¡Bienvenido a la aplicación Express con middleware de proxy!');
});


const server = app.listen(port, () => {
    console.log(`Api Gateway escuchando en puerto ${port}`);
});

const closeServer = () => {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

module.exports = { server, closeServer, app};