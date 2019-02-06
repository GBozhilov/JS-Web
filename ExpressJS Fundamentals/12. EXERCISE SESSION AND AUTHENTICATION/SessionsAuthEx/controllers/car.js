const Car = require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
    addGet: (req, res) => {
        res.render('car/add');
    },
    addPost: async (req, res) => {
        const carBody = req.body;
        const {model, image, pricePerDay} = carBody;

        if (!model || !image || !pricePerDay) {
            carBody.error = 'Please Fill All Fields';
            res.render('car/add', carBody);
            return;
        }

        try {
            const car = await Car
                .create({
                    model,
                    image,
                    pricePerDay,
                });

            res.redirect('/car/all');
        } catch (err) {
            console.log(err);
            carBody.error = err;
            res.render('car/add', carBody);
        }
    },
    allGet: (req, res) => {
        Car.find({isRented: false})
            .then(cars => {
                //cars = cars.filter(c => c.isRented === false);
                res.render('car/all', {cars});
            })
            .catch(console.error);
    },
    editGet: (req, res) => {
        const carId = req.params.id;

        Car.findById(carId)
            .then(car => {
                res.render('car/edit', car);
            })
            .catch(err => console.log(err));
    },
    editPost: async (req, res) => {
        const carId = req.params.id;
        const editedCar = req.body;
        const {model, image, pricePerDay} = editedCar;

        let car = await Car.findById(carId);

        if (!car) {
            editedCar.error = 'The Car Was Not FOund';
            res.render('car/edit', editedCar);
            return;
        }

        car.model = model;
        car.image = image;
        car.pricePerDay = pricePerDay;

        car.save()
            .then(() => {
                res.redirect('/car/all');
            })
            .catch(err => console.log(err));
    },
    rentGet: (req, res) => {
        const carId = req.params.id;

        Car.findById(carId)
            .then(car => {
                res.render('car/rent', car);
            })
            .catch(err => console.log(err));
    },
    rentPost: (req, res) => {
        const car = req.params.id;
        const user = req.user._id;
        const days = Number(req.body.days);

        let expDate = new Date();
        expDate.setDate(expDate.getDate() + days);
        const expiresOn = expDate.toISOString().slice(0, 10);

        Rent.create({days, car, user, expiresOn})
            .then(rent => {
                Car.findById(car)
                    .then(c => {
                        c.isRented = true;
                        return c.save();
                    })
                    .then(() => {
                        res.redirect('/car/all');
                    })
            })
            .catch(err => console.log(err));
    }
};