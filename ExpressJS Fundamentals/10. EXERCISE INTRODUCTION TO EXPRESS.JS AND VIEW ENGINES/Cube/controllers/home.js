const Cube = require('../models/Cube');
const qs = require('querystring');

function getErrors(from, to) {
    let errors = [];

    if (from < 1 || from > 6) {
        errors.push('"From" must be between 1 and 6');
    }

    if (to < 1 || to > 6) {
        errors.push('"To" must be between 1 and 6');
    }

    if (from > to) {
        errors.push('"From" must be smaller than "To"');
    }

    return errors;
}

module.exports = {
    homeGet: (req, res) => {
        Cube
            .find({})
            //.select('name difficulty')
            .sort('-difficulty')
            .then(cubes => {
                res.render('index', {cubes});
            })
            .catch(e => console.log(e));
    },
    about: (req, res) => {
        res.render('about');
    },
    search: async (req, res) => {
        const search = req.query.search;
        const from = Number(req.query.from);
        const to = Number(req.query.to);

        if (search && !from && !to) {
            Cube
                .find({})
                .then(cubes => {
                    const filtered = cubes.filter(c => {
                        const cubeName = c.name.toLowerCase();
                        const fragment = search.toLowerCase();
                        return cubeName.includes(fragment);
                    });
                    res.render('index', {cubes: filtered});
                })
                .catch(e => console.log(e));
            return;
        }

        let errors = getErrors(from, to);

        if (errors.length) {
            res.locals.globalErrors = errors;

            try {
                const cubes = await Cube.find({});
                res.render('index', {cubes});
                return;
            } catch (err) {
                console.log(err);
            }
        }

        if (search && from && to) {
            Cube
                .find({})
                .where('difficulty')
                .gte(from)
                .lte(to)
                .then(cubes => {
                    const filtered = cubes.filter(c => {
                        const cubeName = c.name.toLowerCase();
                        const fragment = search.toLowerCase();
                        return cubeName.includes(fragment);
                    });
                    res.render('index', {cubes: filtered});
                })
                .catch(e => console.log(e));
        }
    }
};