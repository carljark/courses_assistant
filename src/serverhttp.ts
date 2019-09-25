import http from 'http';
import express from 'express';

const apphttp = express();

apphttp.use('', (req, res) => {
    console.log('redirigiendo');
    res.redirect('https://carlosalbertogodoy.ddns.net');
} )

const server = http.createServer(apphttp);

server.listen(8080, () => {
    console.log('escuchando en http');
})