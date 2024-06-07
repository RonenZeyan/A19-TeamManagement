const express = require('express');
const router = express.Router()
const allUserRoute = require('../controllers/AllUsersController');

const upload = require('../middleware/uploadimage')

/**
 * This file defines all the routes for the user (Not admin)
 * Each route is mapped to a corresponding function in controller that handles logic.
 */


router.post('/login', allUserRoute.login)  //user login route
router.get('/newUserMissions/:id', allUserRoute.getNewUserMissions) //get all the mission in status waiting
router.get('/ExistingUserMissions/:id', allUserRoute.getExistingUserMissions) //get all the missions in status "in process" and "completed" 
router.get('/userData/:id', allUserRoute.getUserData)  //get the data of a user (like age and phone etc)
router.post('/editUserData/:id',upload.single('image'), allUserRoute.editUserData) //update the data of user 
router.get('/numMissionsMessages/:id', allUserRoute.getNumMissionsMessages) //get the number of missions
router.get('/numMessages/:id', allUserRoute.getNumMessages) //get the number of messages 
router.post('/acceptMission/:id', allUserRoute.acceptMission) //accept a mission (change status from waiting to in process)
router.post('/finishMission/:id', allUserRoute.finishMission) //finish a mission (change status from in process to finish)

module.exports = router;