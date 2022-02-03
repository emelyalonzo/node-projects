const mongoose = require('mongoose');
const db = require('../db');
const Movie = require('../models/Movie');

const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción',
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

const moviesDocuments = movies.map(movie => new Movie(movie));

db.connectDB()
    // Si hay peliculas eliminarlas
    .then(async () => {
        const allMovies = await Movie.find();
        if (allMovies.length > 0) {
            await Movie.collection.drop();
        }
    })
    .catch(err => console.error(`Error eliminando información de la DB: ${err}`))
    // Añadir documentos de movies a la base de datos
    .then(async () => {
        await Movie.insertMany(moviesDocuments)
        // await Promise.all(cochesDocuments.map((coche) => Coche.insert(coche)));
    })
    .catch(err => console.error(`Error creando documentos en DB: ${err}`))
    // Cerrar la conexión
    .finally(() => mongoose.disconnect())