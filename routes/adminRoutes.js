const express = require('express');
const router = express.Router();
const adminRouter = require('../controller/adminController');
router.post('/register',adminRouter.createAdmin);
router.post('/login-user',adminRouter.adminLogin);
module.exports = router;