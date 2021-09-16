const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const http = require('https')
const axios = require('axios')

/*------------------------------------------------------------------------------------------ */
/*-------------------------------------USER------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */

router.post('/gas', async (req, res) => {
    const resp = await axios({
        method: "GET",
        url: `https://google.com`,
      });

      console.log(resp.data)

      res.status(200).send("test")
})

//POST: USER: CREATE A NEW EVENT
router.post('/new/:userId', (req, res) => {

    event = new Event({
        userId: req.params.userId,
        eventTitle: req.body.eventTitle,
        eventDetails: req.body.eventDetails,
        eventDate: req.body.eventDate,
        eventType: req.body.eventType,
        eventChecked: req.body.eventChecked,
        synced: req.body.synced
    })
    event.save().then(event => {
        res.json(event)
    }).catch(error => {
        res.status(500).send("Event was not stored in the database, error: " + error)
    })

})

//GET: USER: GET ALL EVENTS FROM USER
router.get('/all/:userId', async (req, res) => {

    const events = await Event.find({ userId: req.params.userId }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET SINGLE EVENT BY ID
router.get('/get/:eventId', async (req, res) => {

    const event = await Event.findById(req.params.eventId)

    if (!event) return res.status(404).send("Event not found")

    res.json(event)

})

//GET: USER: GET ALL USER EVENTS BASED ON SYNCED STATE
router.get('/all/:userId/:synced', async (req, res) => {

    const events = await Event.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET ALL USER EVENTS DONE/PENDING
router.get('/all/:userId/:checked', async (req, res) => {

    const events = await Event.find({
        userId: req.params.userId,
        eventChecked: req.params.checked
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: USER: UPDATE EVENT BASED ON ID
router.put('/put/:eventId', async (req, res) => {

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        {
            eventTitle: req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate: req.body.eventDate,
            eventType: req.body.eventType,
            eventChecked: req.body.eventChecked,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedEvent) return res.status(404).send("Event not found")

    res.json(updatedEvent)

})

//PATCH: USER: UPDATE EVENT BASED ON ID
router.patch('/patch/:eventId', async (req, res) => {

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId,
        {
            eventTitle: req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate: req.body.eventDate,
            eventType: req.body.eventType,
            eventChecked: req.body.eventChecked,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedEvent) return res.status(404).send("Event not found")

    res.json(updatedEvent)

})

//DELETE: USER: DELETE EVENT
router.delete('/delete/:eventId', async (req, res) => {

    const event = await Event.findByIdAndRemove(req.params.eventId)

    if (!event) return res.status(404).send("Event not found")

    res.json(event)

})


module.exports = router;