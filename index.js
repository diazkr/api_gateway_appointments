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
    target:'http://34.48.11.90:3002',
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



app.listen(port, ()=>{
    console.log(`Api Gateway escuchando es puerto ${port}`)
})


