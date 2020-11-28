
const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    removeReaction,
    getAllThoughts,
    getThoughtById,
    updateThought
} = require('../controllers/thought-controller');

// /thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought);
// /thought by ID
router.route('/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)
    .put(updateThought);

// /thoughts/<thoughtId>
router.route('/:thoughtId')
    .post(addReaction)
    .delete(removeThought);

// /thoughts/<thoughtsId>/<reactionId>
router.route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;