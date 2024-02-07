const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/usersController');

// /api
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api
router.route('/:userId')
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateUser);

// /api
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;