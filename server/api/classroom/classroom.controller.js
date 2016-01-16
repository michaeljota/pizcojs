var Classroom = require('./classroom.model');

function errorHandler (res, err) {
    res.status(500).send(err.message);
}

function successHandler (res, obj) {
    res.status(200).jsonp(obj);
}

function findAll (req, res) {
    Classroom.loadMany()
        .then(function(classroom) {
            successHandler(res, classroom);
        })
        .catch(function(err){
            errorHandler(res, err);
        });
}

function find (req, res) {
    Classroom.loadOne({_id: req.params.classId})
        .then(function(classroom){
            successHandler(res, classroom);
        })
        .catch(function(err){
            errorHandler(res, err);
        });
}

function add (req, res) {
    var classroom = Classroom.create({
        name: req.body.name
    });
    classroom.save()
        .then(function(classroom){
            successHandler(res, classroom);
        })
        .catch(function(err){
            errorHandler(res, err);
        });
}

function update (req, res) {
    Classroom.loadOneAndUpdate(
        {_id: req.params.classId},
        {
            name: req.body.name
        })
        .then(function(classroom){
            successHandler(res, classroom);
        })
        .catch(function(err){
            errorHandler(res, err);
        });
}

function remove (req, res) {
    Classroom.loadOneAndDelete(
        {_id: req.params.classId})
        .then(function(){
            successHandler(res, {});
        })
        .catch(function(err){
            errorHandler(res, err);
        });
}

module.exports.findAll = findAll;
module.exports.find = find;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
