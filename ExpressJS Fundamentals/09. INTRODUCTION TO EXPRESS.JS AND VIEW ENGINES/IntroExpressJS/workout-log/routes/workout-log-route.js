const express = require('express');
const workoutLogRouter = express.Router();
const WorkoutLogModel = require('../data/models/workout-log-model');

workoutLogRouter
    .get('/all', (req, res) => {
        const query = WorkoutLogModel.find({});

        query.limit(20);

        query.exec((err, result) => {
            if (err) {
                throw err;
            }

            res.render('workout-logs', { logs: result })
        });
    })
    .get('/:logId', (req, res) => {
        const { logId } = req.params;
        const query = WorkoutLogModel.findById(logId);

        query.exec((err, log) => {
            if (err) {
                throw err;
            }

            res.render('workout-log', log);
        });
    })
    .get('/create', (req, res) => {
        res.redirect('/');
    })
    .post('/create', (req, res) => {
        const { name, exercises } = req.body;
        const mappedExercises = exercises.map((ex) => {
            return Object.assign({}, ex, {
                reps: parseInt(ex.reps),
                sets: parseInt(ex.sets)
            });
        });

        const newWorkoutLog = new WorkoutLogModel({
            name,
            date: new Date(),
            exercises: mappedExercises
        });

        newWorkoutLog.save(() => {
            res.redirect('/');
        });
    });

module.exports = workoutLogRouter;