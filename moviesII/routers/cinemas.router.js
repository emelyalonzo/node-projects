const express = require('express');
const Cinema = require('../models/Cinema');

const cinemasRouter = express.Router();

cinemasRouter.get('/', (req, res, next) => {
    return Cinema.find()
        .then(cinemas => {
            return res.status(200).json(cinemas);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemasRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    return Cinema.findById(id).populate('movies')
        .then((cinema) => {
            if (!cinema) {
                const error = new Error('Cliente no encontrado');
                error.status = 404;
                return next(error);
            }
            return res.status(200).json(cinema);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemasRouter.post('/', (req, res, next) => {
    const newCinema = new Cinema({
        name: req.body.name,
        location: req.body.location,
        movies: [],
    })
    return newCinema.save()
        .then(() => {
            return res.status(201).json(newCinema);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemasRouter.put('/:id/movies', (req, res, next) => {
    const cinemaId = req.params.id;
    const idMovieToAdd = req.body.movieId;

    return Cinema.findByIdAndUpdate(
        cinemaId,
        { $push: { movies: idMovieToAdd } },
        { new: true }
    )
        .then(cinemaUpdated => {
            return res.status(200).json(cinemaUpdated);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});

cinemasRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    return Cinema.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json(`Cinema with id ${id} deleted`);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 500;
            return next(error);
        });
});


module.exports = cinemasRouter;