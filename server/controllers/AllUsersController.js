const jwt = require('jsonwebtoken');  //used for token

const UserModel = require('../models/Users')
const MissionModel = require('../models/Missions') // Assuming the Missions model is located in this path
const MsgModel = require('../models/MSG')
const mongoose = require("mongoose") //used mongoose for mongodb



/**
 * This file include all the controller functions of the user.
 * These functions handle the logic for user operations such as fetching missions and msg's.
 */



/**
 * User login.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @returns {Object} - Returns a JWT token if login is successful.
 */
const login = async (req, res) => {
    const {Email,Password} = req.body
    console.log(Email,Password)
    UserModel.find({email:Email,password:Password})
    .then(users=>{
            if(users.length>0)
            {
                const email = users[0].email
                const id = users[0].id
                const username = users[0].name
                let token;
                if(email==="admin@gmail.com") //we have just one admin then we check if email is this (email is unique) and make a token for admin (role == admin ) this role help us to know in front end witch type of home to display 
                {
                    token = jwt.sign(
                            {role:"admin",name:username,email:email,userID:id},
                            "jwt_secret_key",
                            {expiresIn:"1d"}  //the token is expires just for one day not more 
                    )
                }
                else //in case it a normal user then we make a token with role user (and in front end dispaly a user home not admin home )
                {
                    token = jwt.sign(
                        {role:"user",name:username,email:email,userID:id},
                        "jwt_secret_key",
                        {expiresIn:"1d"}
                )  
                }
                console.log(email,id)
                res.json({ loginStatus: true, token: token ,userID:id}); // we send the token as a json in res (Res that back to frontend as response to the Request) 
            }
            else  //data length back 0 then something wrong
            {
                console.log('failed')
                res.json({ loginStatus: false,ErrorMSG:"email or password is wrong"})
            }
            
                })
    .catch(err=>console.log(err))
    // .catch(err=>res.json(err))
};


/**
 * Fetches all the existing missions in waiting status of the user 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object of the all mission in status waiting or an error message.
 */
const getNewUserMissions = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    MissionModel.find({"employeeId":objectId,"status":"waiting"}) //get all missions in status waiting
    .then(missions => 
        // {res.json(missions)
        {if(missions.length>0)
        {
            res.json({ missionsStatus: true, Missions:missions});
        }
        else{
           res.json({ missionsStatus: false,ErrorMSG:"no missions founded"})
        }
        })
    .catch(err=>res.json(err));
};



/**
 * Fetches all the existing missions in in process or completed status of the user 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object of the all mission in status in process or completed or an error message.
 */
const getExistingUserMissions = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    // MissionModel.find({"employeeId":objectId,"status":"waiting"})
    MissionModel.find({"employeeId":objectId,"status":{$in: ['IN PROCESS','completed']}})
    .then(missions => 
        // {res.json(missions)
        {if(missions.length>0)
        {
            res.json({ missionsStatus: true, Missions:missions});
        }
        else{
           res.json({ missionsStatus: false,ErrorMSG:"no missions founded"})
        }
        })
    .catch(err=>res.json(err));
};


/**
 * Fetches the data of user 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object including the data of the user 
 */
const getUserData = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    UserModel.findById(objectId)
    .then(user=>res.json(user))
    .catch(err=>res.json(res))
};


/**
 * edit the data of user 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object including nsg if editing success or not 
 */
const editUserData = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    const formData = req.body
    console.log(req.file)
    if(req.file){
        formData.image = req.file.path.split('public\\')[1]; //split the string path in the public place and the second part (delete public/ from the path string)
    }
    UserModel.updateOne({_id:objectId},{$set:formData})
    .then(res=>res.send('success')) //dont forget to check if length big than 0 then update success
    .catch(err=>res.send(err))
};



/**
 * Fetches all the missions in waiting status 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object all the missions in status waiting of the user
 */
const getNumMissionsMessages = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.find({"employeeId":objectId,"status":"waiting"}) //we can right employeeID and status with "" or without
    .then(missions=>res.json(missions.length))
    .catch(err=>res.json(err))
};



/**
 * Fetches the number of the messages 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object including all the messages 
 */
const getNumMessages = async (req, res) => {
    MsgModel.find() //we can write employeeID and status with "" or without
    .then(msg=>res.json(msg.length))
    .catch(err=>res.json(err))
};



/**
 * accept a mission (change the status from waiting to in process)
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object of msg if update success or not 
 */
const acceptMission = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.updateOne({ _id: objectId }, { $set: { status: 'IN PROCESS' } })
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).send('Mission not found');
            }
            res.send('Mission updated successfully');
        })
        .catch(err => {
            res.status(500).send('Error updating mission');
        });
};


/**
 * finish a mission (change the status from in process to completed)
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object of msg if update success or not 
 */
const finishMission = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id); 
    MissionModel.updateOne({ _id: objectId }, { $set: { status: 'completed' } })
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).send('Mission not found');
            }
            res.send('Mission updated successfully');
        })
        .catch(err => {
            res.status(500).send('Error updating mission');
        });
};

module.exports = {
    login,
    getNewUserMissions,
    getExistingUserMissions,
    getUserData,
    editUserData,
    getNumMissionsMessages,
    getNumMessages,
    acceptMission,
    finishMission
  };
