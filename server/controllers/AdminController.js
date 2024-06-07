const UserModel = require('../models/Users')
const MissionModel = require('../models/Missions')
const MsgModel = require('../models/MSG')
const mongoose = require("mongoose") //used mongoose for mongodb




/**
 * This file include all the controller functions of the admin.
 * These functions handle the logic for admin operations such as fetching users and missions and msg's.
 */



/**
 * Fetches all the existing employees/users חוץ מ the admin.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns users in type JSON array of user objects.
 */
const getUsers = async (req, res) => {
    UserModel.find({email:{$ne:"admin@gmail.com"}})  //we get all the users in the db חוץ מה admin
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
};

/**
 * Fetches all missions with all type of status (waiting,in process, completed).
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns missions in type JSON array of mission objects.
 */
const getAllMissions = async (req, res) => {
    MissionModel.find() 
    .then(missions => {
        console.log(typeof(missions[0].employeeId))
        res.json(missions)}) //return the missions
    .catch(err=>res.json(err));
};



/**
 * Fetches all missions of specific user in all type of status 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns missions in type JSON array of mission objects.
 */
const getUserMissions = async (req, res) => {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    MissionModel.find({"employeeId":objectId})
    .then(missions => res.json(missions))
    .catch(err=>res.json(err));
};



/**
 * delete a user with his all missions in db.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - return a msg if user deleted successfully.
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;

    // delete user then search his missions to delete them also 
    UserModel.findByIdAndDelete(id)
    .then(deletedUser => {
        return MissionModel.deleteMany({ employeeId: id });
    })
    .then(result => {
        res.status(200).send(`User and his missions were deleted successfully. ${result.deletedCount} missions were deleted.`);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
}



/**
 * delete a specific mission for specific user 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - return a msg if user deleted successfully.
 */
const deleteUserMissions = async (req, res) => {
    const { id } = req.params; //id of mission

    // delete user then search his missions to delete them also 
    MissionModel.findByIdAndDelete(id)
    .then(result => {
        res.status(200).send(`mission were deleted successfully.`);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });

}



/**
 * add new mission for specific user 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - return a msg if mision add successfully.
 */
const addMission = async (req, res) => {
    const { date, missionDescription, time, userid } = req.body;    
    try {
        // search user by his id
        const user = await UserModel.findById(userid);
        const endDateISO = `${date}T${time}`

        //we get the name of userId to send it to frontend and display his name beside the word mission (ronen missions)
        const employeeName = user.name;
        // create new object to add to our database
        const newMission = {
            employeeId: userid,
            employeeName,
            // missionDate: date,
            endDate: new Date(endDateISO),
            missionDescription,
            status: 'waiting',
        };

        // save to our db 
        const savedMission = await MissionModel.create(newMission);
        res.status(201).send(savedMission);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding mission");
    }
}



/**
 * add new msg 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - return a msg if msg added successfully.
 */
const addMessage = async (req, res) => {
    const {title,content} = req.body //get the title and content
    const status='new'; 
    const newMSG = {
        title,
        MsgContent:content,
        status,
    };
    MsgModel.create(newMSG)
    .then(result=>res.send('success'))
    .catch(err=>res.send('failed'))
}


/**
 * get all the messages 
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - return a JSON array of msg objects 
 */
const getMessage = async (req, res) => {
    MsgModel.find()  //we get all msg's
    .then(all_messages=>{
        res.json(all_messages)})
    .catch(err=>res.json(err))
}


/**
 * add new employee to db
 * here we create a random password and a default age (ofc can changed) and default pic
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object of the created employee or an error message.
 */
const addEmployee = async (req, res) => {
    const { name, email, phone, gender } = req.body;
    const password = Math.random().toString(36).slice(-8);  //create random password
    const age = 99; //default value chosen for age (user can change it)
    const image = gender==="male"?'./images/iconMan.png':'./images/iconFemale.png';
    const newEmployee = {
        name,
        email,
        phone,
        gender,
        age,
        image,
        password,
    };
    UserModel.create(newEmployee)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
}

module.exports = {
    getUsers,
    getAllMissions,
    getUserMissions,
    deleteUser,
    deleteUserMissions,
    addMission,
    addMessage,
    getMessage,
    addEmployee
  };