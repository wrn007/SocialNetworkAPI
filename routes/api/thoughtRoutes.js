const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtsController.js');

// /api
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//api
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;