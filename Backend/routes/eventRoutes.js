const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
});

router.get('/', async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

router.put('/:id', async (req, res) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(event);
});

router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ message: 'Event deleted' });
});

module.exports = router;
