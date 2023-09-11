const express = require('express');

const PORT = 8080;

const app = express();

app.get('/', function(req, res) {
    res.send('Hellow World TESTE');
});

app.get('/user', function(req, res) {
    res.send({
        nome: 'José'
    });
});

app.get('/user/:nome', function(req, res) {
    res.send({
        nome: req.params.nome
    });
});

app.get('/user/:nome/sobrenome/:sobrenome', function(req, res) {
    res.send({
        nome: req.params.nome,
        sobrenome: req.params.sobrenome
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