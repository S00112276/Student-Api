const express = require('express'); 
const router = express.Router();
const Course = require('../models/courseModel');
const Module = require('../models/moduleModel');

// Retrieve All courses 
router.get('/courses', (req, res) => { 
    Course.find({}, function (err, entry) { 
        if (err) 
            res.send(err); 
         
        res.json(entry); 
    }); 
}); 

// Retrieve All Modules 
router.get('/modules', (req, res) => { 
    Module.find({}, function (err, entry) { 
        if (err) 
            res.send(err); 
         
        res.json(entry); 
    }); 
}); 

// Add a Course
router.post('/addcourse', (req, res, next) => {
    let newCourse = new Course({
        name: req.body.name,
        groups: req.body.groups
    });

    // Save New Course & Check For Errors
    newCourse.save(function(err) {
        if(err)
            res.send(err);

        else
            res.json({ message: 'Entry Added to DB!' });
    });
});

// Add a Module
router.post('/addmodule', (req, res, next) => {
    let newModule = new Module({
        name: req.body.name,
        day: req.body.day,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        lecturer: req.body.lecturer,
        groups: req.body.groups,
        room: req.body.room
    });

    // Save New Module & Check For Errors
    newModule.save(function(err) {
        if(err)
            res.send(err);

        else
            res.json({ message: 'Entry Added to DB!' });
    });
});

// Find Module based on groupId
router.get('/studentmodules/:groupId', (req, res, next) => {
    Module.find({ groups : req.params.groupId }, function (err, entry) {
        if(err)
        res.send(err);

        res.json(entry);
    });
});

// Find Modules based on lecturerId
router.get('/lecturermodules/:lecturerId', (req, res, next) => {
    Module.find({ lecturer : req.params.lecturerId }, function (err, entry) {
        if(err)
        res.send(err);

        res.json(entry);
    });
});

module.exports = router;