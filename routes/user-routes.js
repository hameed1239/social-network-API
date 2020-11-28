const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../controllers/User-controller');

// /api/Users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /Users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /Users/:id/:friendId
router
    .route('/:id/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;