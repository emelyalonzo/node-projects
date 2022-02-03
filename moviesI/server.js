const express = require("express");
const moviesRouter = require('./routers/movies.router');
const db = require("./db");
const PORT = 3000;

db.connectDB();

const server = express();

//Middleware para leer los bodys
// Añadimos los middlewares para poder leer los body
server.use(express.json());
server.use(express.urlencoded({ extended: false })); // extended = false utiliza la librería querystring, extended = true utiliza la librería qs

server.get("/", (_req, res) => {
    res.status(200).send('Server is up & running');
});

server.use('/movies', moviesRouter);

server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    return next(error);
});

server.use((err, _req, res, _next) => {
    return res
        .status(err.status || 500)
        .json(err.message || 'Error inesperado en servidor');
});

db.connectDB().then(() => {
  console.log('Conectado a base de datos mongo')
  server.listen(PORT, () => {
  console.log(`Iniciado servidor en ${PORT}`);
  });
});
