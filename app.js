const express = require('express');

const PORT = 8080;

const app = express();

app.get('/', function(req, res) {
    res.send('Hellow World');
});

app.get('/user', function(req, res) {
    res.send({
        nome: 'José'
    });
});

app.delete('/user', function(req, res) {
    res.send({
        nome: 'José deletado'
    });
});

app.listen(PORT, function() {
    console.log('Servidor rodando na porta: ', PORT);
});