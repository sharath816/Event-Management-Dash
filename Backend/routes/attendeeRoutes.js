const express = require('express');
const router = express.Router();
const Attendee = require('../models/Attendee');

router.post('/', async (req, res) => {
    const attendee = new Attendee(req.body);
    await attendee.save();
    res.status(201).send(attendee);
});

router.get('/', async (req, res) => {
    const attendees = await Attendee.find();
    res.send(attendees);
});

router.delete('/:id', async (req, res) => {
    await Attendee.findByIdAndDelete(req.params.id);
    res.send({ message: 'Attendee deleted' });
});

module.exports = router;
