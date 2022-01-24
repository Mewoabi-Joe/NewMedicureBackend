const Temperature = require('../models/temperature');

exports.createTemperature = (req, res, next) => {
    const temperature = new Temperature({
        value: req.body.value,
        date: req.body.date,
        userId: req.body.userId
    });
    temperature.save().then(
        () => {
            res.status(201).json({message: "Temperature added successfully"});
        }
    )
    .catch(
        (error) => {
            res.status(400).json({
              error: error
            });
        }
    )
    
};

exports.getAllTemperature = (req, res, next) => {
    Temperature.find()
    .then(
        (temperatures) => {res.status(200).json(temperatures);}
    )
    .catch(
        (error) => {
            res.status(400).json({error});
          }
    )

};

exports.getUserTemperature = (req,res,next) => {
    Temperature.find({userId: req.params.userId})
    .then(
        (temperatures) => {res.status(200).json(temperatures);}
    )
    .catch(
        (error) => {
            res.status(400).json({error});
          }
    )
};