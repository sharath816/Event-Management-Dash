// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Event = require('../models/Event'); 

router.get('/event', async (req, res) => {
    const { title } = req.query; 
    try {
        const event = await Event.findOne({ title });
        
        if (!event) return res.status(404).send({ message: 'Event not found' });

        const tasks = await Task.find({ eventId: event._id });
        
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});

router.post('/', async (req, res) => {
    const { title, eventId } = req.body;
    try {
        const newTask = new Task({ title, eventId });
        await newTask.save();
        res.status(201).send(newTask);
    } catch (error) {
        console.error('Error creating task:', error); 
        res.status(500).send({ message: 'Failed to create task', error });
    }
});
module.exports = router;
