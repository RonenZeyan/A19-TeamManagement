const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminController.js');


/**
 * This file defines all the routes for the admin (Not employee/user)
 * Each route is mapped to a corresponding function in controller that handles logic.
 */

router.get('/users', adminController.getUsers)  //get all the employees/users
router.get('/allMissions', adminController.getAllMissions) //get all the existing mission in db with all types of staus
router.get('/users/userMissions/:id', adminController.getUserMissions) //get all the mission of specific user
router.delete('/users/delete/:id', adminController.deleteUser)  //delete a user 
router.delete('/userMissions/delete/:id', adminController.deleteUserMissions) //delete a specific mission of specific user 
router.post('/add_mission',adminController.addMission) //add new mission for specific user 
router.post('/add_message',adminController.addMessage)  // add new message 
router.get('/get_messages', adminController.getMessage) //get all existing messages
router.post('/add_employee', adminController.addEmployee)  //add a new employee 


module.exports = router;