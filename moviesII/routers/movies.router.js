
const express = require('express');
const Movie = require('../models/Movie');

const moviesRouter = express.Router();

//Crear un endpoint get que devuelva todas las películas.
moviesRouter.get('/', (req, res, next) => {
    let filter = {};
    //Crear un endpoint get que devuelva los documentos según su género.
    if (req.query.genre) {
        filter = { ...filter, genre: req.query.genre };
    }

    //Crear un endpoint get que devuelva un valor por su titulo.
    if (req.query.title) {
        filter = { ...filter, title: req.query.title };
    }

    const madeAfter = Number(req.query.madeAfter);
    const madeBefore = Number(req.query.madeBefore);
    //Crear un endpoint get que devuelva las películas que se han estrenado a partir de 2010.
    if (!isNaN(madeAfter) && !isNaN(madeBefore)) {
        filter = { ...filter, year: { $lt: madeBefore, $gte: madeAfter } };
    } else if (!isNaN(madeBefore)) {
        filter = { ...filter, year: { $lt: madeBefore } } // $lt === menor que, $lte === menor o igual que
    } else if (!isNaN(madeAfter)) {
        filter = { ...filter, year: { $gte: madeAfter } }; // $gt === mayor que, $gte === mayor o igual que
    }

    return Movie.find(filter)
        .then(moviesRead => {
            return res.status(200).json(moviesRead);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

//Crear un endpoint get que devuelva una película según su _id
moviesRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Movie.findById(id)
        .then((movie) => {
            if (!movie) {
                const error = new Error('Movie not found');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(movie);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

moviesRouter.post('/', (req, res, next) => {
    console.log('Body recibido', req.body);
    const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre
    });

    return newMovie.save()
        .then(() => {
            return res.status(201).json(newMovie);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

moviesRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    return Movie.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(movieUpdated => {
            return res.status(200).json(movieUpdated);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

moviesRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Movie.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Movie with id: ${id} deleted`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

module.exports = moviesRouter;