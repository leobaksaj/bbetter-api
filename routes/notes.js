const express = require('express')
const router = express.Router()
const Note = require('../models/note')


/*------------------------------------------------------------------------------------------ */
/*-------------------------------------USER------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: USER: CREATE A NEW NOTE
router.post('/new/:userId', (req, res) => {

    note = new Note({
        userId: req.params.userId,
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        noteArchived: req.body.noteArchived,
        synced: req.body.synced
    })
    note.save().then(note => {
        res.json(note)
    }).catch(error => {
        res.status(500).send("Note was not stored in the database, error: " + error)
    })

})

//GET: USER: GET ALL NOTES
router.get('/all/:userId', async (req, res) => {

    const notes = await Note.find({ userId: req.params.userId }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET NOTE BY ID
router.get('/get/:noteId/:userId', async (req, res) => {

    const note = await Note.find({
        _id: req.params.noteId,
        userId: req.params.noteId
    }).exec()

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})

//GET: USER: GET ALL USER NOTES BASED ON SYNCED STATE
router.get('/all/:userId/:synced', async (req, res) => {

    const notes = await Note.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})
//GET: USER: GET ALL USER NOTES BASED ON ARCHIVED STATE
router.get('/all/:userId/:archived', async (req, res) => {

    const notes = await Note.find({
        userId: req.params.userId,
        archived: req.params.archived
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: USER: UPDATE NOTE BASED ON ID
router.put('/put/:noteId', async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedNote) return res.status(404).send("Note not found")

    res.json(updatedNote)

})
//PATCH: USER: UPDATE NOTE BASED ON ID
router.patch('/patch/:noteId', async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedNote) return res.status(404).send("Note not found")

    res.json(updatedNote)

})

//DELETE NOTE
router.delete('/delete/:noteId', async (req, res) => {

    const note = await Note.findByIdAndRemove(req.params.noteId)

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})

//GET: GET SINGLE NOTE BY ID
router.get('/get/:noteId', async (req, res) => {

    const note = await Note.findById(req.params.noteId)

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})



module.exports = router;