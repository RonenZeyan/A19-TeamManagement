import Table from "../../components/Table/Table"
import NewEmployeeModal from "../../components/Modals/NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom';
import NewMissionModal from '../../components/Modals/NewMissionModal';
import SearchCompo from '../../components/Search/Search';
import { API_URL } from '../../constants';

/**
 * this page display the missions of specific user in table (all exist missions of user in all type of status)
 * @returns - a html code of page including a search component and table component and NewMissionModal component
 * @ComponentsUsed - search component and table component and NewMissionModal component
 */
//this component used for display the mission of user
export default function UserMissions(){
    /**
     * line: 24 - a useState hook for show and unshow modal 
     * line : 26 - the id of user sended as a param and we use it to know witch mission we should get from backend to display it
     * line : 27 - The columns to display in the table.
     * line : 28 - a useState hook for include userMission 
     * line : 29 - a useState hook for include userMission 
     */
    const [showModal,setShowModal] = useState(false)
    // const [users,setUsers] = useState([])
    const {id} = useParams()
    const tableHead=["_id","missionDescription","status","delete"]
    const [UserMissions,setUserMissions] = useState([])
    const [allUserMissions,setAlluserMissions] = useState([])



    /**
     * a useEffect hook Fetches the data of mission of user from the server and sets the initial state.
     */
    useEffect(()=>{ //in the display of the page the data fetched from db and displayed in page 
        axios.get(`${API_URL}/users/userMissions/${id}`)
        .then(
            (UserMissions) =>{setUserMissions(UserMissions.data);setAlluserMissions(UserMissions.data); console.log(UserMissions.data);}
            )
        .catch(err=>console.log(err))
    },[])




    /**
     * handle the add of new mission and change the usestate hook data 
     * @param {object} newMission - a object include the data new mission that used add 
     */
    const handleAddNewMission = (newMission) => {
        setUserMissions([...UserMissions, newMission]);
        setAlluserMissions([...allUserMissions, newMission]);
    };



    /**
     * handle the deletation of mission including a alert that ask you if you sure and send the id of mission to backend to delete it 
     * @param {object} mission - a object include the data mission we want to delete 
     */
    const handleDeleteMission = (mission) =>{
        console.log(mission)
        const isConfirmed = window.confirm("Are you sure you want to delete this mission?"); 
        if (isConfirmed) {
            //in case user press yes then the delete happen
            axios.delete(`${API_URL}/userMissions/delete/${mission._id}`)
                .then(() => {
                     //we filtered the undisired mission (filter func return a new array with the remain mission of the user)
                    const updatedUserMissions = UserMissions.filter(miss => miss._id !== mission._id);
                    setUserMissions(updatedUserMissions); //we change state to render the table 
                    setAlluserMissions(updatedUserMissions) //this used for the search (to get old data after we finish the search)
                })
                .catch(err => console.error(err));
        } else {
            //in case user press cancel
            console.log("User deletion was cancelled.");
        }
    }



    /**
     * this function include html code that include icon of delete mission (have onclick for delete)
     * @param {object} mission - a object include the data mission we want to delete 
     * @returns a html code include icon of delete a mission 
     */
    const renderDeleteMission = (mission) => (
        // <Link to={`user/missions/${user._id}`}><svg className='inline mr-2 border border-red-700 w-6 rounded-full hover:bg-blue-400' fill="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg></Link>
        
            <div onClick={() => {handleDeleteMission(mission)}} className='cursor-pointer inline m-auto pl-2 w-6'>
            <svg className='inline mr-2 w-6 rounded-full hover:bg-blue-400' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m 11.714844 8.011719 c -0.960938 0.066406 -1.863282 0.480469 -2.542969 1.160156 c -1.5625 1.5625 -1.5625 4.09375 0 5.65625 s 4.09375 1.5625 5.65625 0 s 1.5625 -4.09375 0 -5.65625 c -0.820313 -0.820313 -1.957031 -1.246094 -3.113281 -1.160156 z m -1.128906 1.570312 c 0.253906 0 0.511718 0.101563 0.707031 0.296875 l 0.707031 0.707032 l 0.707031 -0.707032 c 0.390625 -0.390625 1.023438 -0.390625 1.414063 0 s 0.390625 1.023438 0 1.414063 l -0.707032 0.707031 l 0.707032 0.707031 c 0.390625 0.390625 0.390625 1.023438 0 1.414063 s -1.023438 0.390625 -1.414063 0 l -0.707031 -0.707032 l -0.707031 0.707032 c -0.390625 0.390625 -1.023438 0.390625 -1.414063 0 s -0.390625 -1.023438 0 -1.414063 l 0.707032 -0.707031 l -0.707032 -0.707031 c -0.390625 -0.390625 -0.390625 -1.023438 0 -1.414063 c 0.195313 -0.195312 0.453125 -0.296875 0.707032 -0.296875 z m 0 0" class="error" fill="#e01b24"></path> <path d="m 7 0 c -0.554688 0 -1 0.445312 -1 1 h -2 c -1.644531 0 -3 1.355469 -3 3 v 9 c 0 1.644531 1.355469 3 3 3 h 2 c 0.550781 0 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 h -2 c -0.570312 0 -1 -0.429688 -1 -1 v -9 c 0 -0.570312 0.429688 -1 1 -1 h 1 v 1 c 0 0.554688 0.445312 1 1 1 h 4 c 0.554688 0 1 -0.445312 1 -1 v -1 h 1 c 0.570312 0 1 0.429688 1 1 v 2 c 0 0.550781 0.449219 1 1 1 s 1 -0.449219 1 -1 v -2 c 0 -1.644531 -1.355469 -3 -3 -3 h -2 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" fill="#2e3436" fill-opacity="0.35"></path> </g></svg>
            </div>
        
    );
   
    

    return (
        <div className="user_home h-[100vh] my-10  content flex flex-col justify-center items-center">
                    <h1 className="font-bold text-3xl text-center pt-4">
                    {UserMissions.length > 0 ? UserMissions[0].employeeName + " Missions" : "No Missions"} 
                    </h1>
                    <button onClick={()=>{setShowModal(true)}} id="showModalBtn" class=" !items-center rounded-md bg-indigo-600 mx-54 py-2 px-4 my-10  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span class="font-bold">Add New Mission +</span></button>
                <SearchCompo searchByList={["missionDescription"]} setData={setUserMissions} allData={allUserMissions} initialSearchState={'missionDescription'}/> 
    
                <div className=""> 
                {/* in extraColumns we dont need more Columns then we send an empty Function */}
                {UserMissions && <Table tableSort={tableHead} data={UserMissions} extraColumns={[renderDeleteMission]}/>}            
                </div>
                <NewMissionModal setVisiblity={setShowModal} userId={id} isVisible={showModal} setNewMission={handleAddNewMission}/>

        </div>
    )

}