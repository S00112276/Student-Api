const express = require('express');
const router = express.Router();
const DiaryEntry = require('../models/diaryModel');
const Course = require('../models/courseModel');

// Add to diary
router.post('/addtodiary', (req, res, next) => {
    let newEntry = new DiaryEntry({
        title: req.body.title,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        lecturer: req.body.lecturer,
        groups: req.body.groups,
        room: req.body.room,
        module: req.body.module,
        percentage: req.body.percentage,
        description: req.body.description
    });

    // Save New Diary Entry & Check For Errors
    DiaryEntry.addEntry(newEntry, (err, entry) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add entry: ' + err });
        } else {
            res.json({ success: true, msg: 'Entry added to diary!' });
        }
    });
});

// Retrieve All Diary Entries
router.get('/diaryentries', (req, res) => {
    DiaryEntry.find({}, function (err, entry) {
        if (err)
            res.send(err);

        res.json(entry);
    });
});

// Retrieve an Entry
router.get('/diaryentry', (req, res) => {
    DiaryEntry.find({ _id: req.params.diaryId }, function (err, entry) {
        if (err)
            res.send(err);

        res.json(entry);
    });
});

// Update or add an Entry
router.put('/updateentry/:entry', (req, res) => {
    DiaryEntry.findOneAndUpdate({ _id: req.params.entry._id }, req.body,
        { upsert: true }, function (err, entry) {
            if (err) {
                res.json({ success: false, msg: 'Failed to add entry: ' + err });
            } else {
                res.json({ success: true, msg: 'Entry added to diary!' });
            }
        })
});

// Delete an Entry
router.delete('/removefromdiary/:diaryId', (req, res) => {
    DiaryEntry.findOneAndRemove({ _id: req.params.diaryId }, function (err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Entry Deleted' });
    });
})

// Retrieve All Courses
router.get('/courses', (req, res) => {
    Course.find({}, function (err, course) {
        if (err)
            res.send(err);

        res.json(course);
    })
});

// Retrieve Student Groups
router.get('/studentgroups', (req, res) => {
    Course.find({}, function (err, studentgroup) {
        if (err)
            res.send(err);

        res.json(studentgroup);
    })
});

// Retrieve Student GRoup where Group Name = Soft Dev A2
router.get('/studentgroup', (req, res) => {
    Course.find({ "groups.name": "Soft Dev A2" }, function (err, studentgroup) {
        if (err)
            res.send(err);

        res.json(studentgroup);
    })
});

module.exports = router;