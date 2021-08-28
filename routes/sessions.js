const express = require('express')
const router = express.Router()
const Session = require('../models/session')
const User = require('../models/user')

/*------------------------------------------------------------------------------------------ */
/*-------------------------------------USER------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: USER: CREATE SESSION
router.post('/new/:userId', (req, res) => {

    session = new Session({
        userId: req.params.userId,
        sessionLength: req.body.sessionLength,
        sessionPoints: req.body.sessionPoints,
        sessionFinished: req.body.sessionFinished,
        synced: req.body.synced
    })
    session.save().then(session => {
        res.json(session)
    }).catch(error => {
        res.status(500).send("Session was not stored in the database, error: " + error)
    })

})

//GET: USER: GET ALL SESSIONS FROM USER
router.get('/all/:userId', async (req, res) => {

    const sessions = await Session.find({ userId: req.params.userId }).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET SESSION BY ID
router.get('/:sessionId/:userId', async (req, res) => {

    const session = await Session.findById(req.params.sessionId)

    if (!session) return res.status(404).send("Session not found")

    res.json(session)

})

//GET: USER: GET ALL SESSIONS FROM USER BASED ON SYNCED STATE
router.get('/all/:userId/:synced', async (req, res) => {

    const sessions = await Session.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: USER: UPDATE USER SESSION BASED ON ID
router.put('/put/:sessionId/:userId', async (req, res) => {

    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId,
        {
            sessionLength: req.body.sessionLength,
            sessionPoints: req.body.sessionPoints,
            sessionFinished: req.body.sessionFinished,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedSession) return res.status(404).send("Session not found")

    res.json(updatedSession)

})

//PATCH: USER: UPDATE USER SESSION BASED ON ID
router.patch('/patch/:sessionId/:userId', async (req, res) => {

    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId,
        {
            sessionLength: req.body.sessionLength,
            sessionPoints: req.body.sessionPoints,
            sessionFinished: req.body.sessionFinished,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedSession) return res.status(404).send("Session not found")

    res.json(updatedSession)

})

//DELETE: USER: DELETE USER SESSION
router.delete('/delete/:sessionId/:userId', async (req, res) => {

    const session = await Session.findByIdAndRemove(req.params.sessionId)

    if (!session) return res.status(404).send("Session not found")

    res.json(session)

})


module.exports = router;