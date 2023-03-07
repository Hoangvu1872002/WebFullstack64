var express = require('express');
var router = express.Router();
const { userRegister,
    authLogin,
    getUserProfile,
    getAllUser,
    updateUserProfile,
    deleteUser,
    getUser,
    updateUser } = require('../controller/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// 1. @desc: Register a new user
// @route: POST /api/users
// @access: Public - return token
router.post('/', userRegister);

// 2. @desc: User can login to system
// @route: POST /api/users/login
// @access: Public - return token
router.post('/login', authLogin);

// 3. @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private - Su dung token
router.get('/profile', protect, getUserProfile);

// 4. @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private
router.put('/profile', protect, updateUserProfile);

// 5. @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get('/', protect, isAdmin, getAllUser);

// 6. @desc: Delete user
// @route: DELETE /api/users/:id
// @access: Private/admin
router.delete('/:id', protect, isAdmin, deleteUser);

// 7. @desc: Get user by ID
// @route: GET /api/users/:id
// @access: Private/admin
router.get('/:id', protect, isAdmin, getUser);

// @desc: Update user by ID
// @route: PUT /api/users/:id
// @access: Private/admin
router.put('/:id', protect, isAdmin, updateUser)


module.exports = router;
