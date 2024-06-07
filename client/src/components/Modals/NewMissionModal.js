import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';


/**
 * @component
 * this component used for display the modal of create new mission in the mission page 
 * @param {Object} props - The properties object.
 * @param props.setVisiblity - display or not the modal
 * @param props.userId - id of the user 
 * @param props.isVisible - is modal display or not 
 * @param props.setNewMission - new mission object
 * @returns {JSX.Element} - a rendered modal component. 
 */
export default function NewMissionModal({setVisiblity,userId,isVisible,setNewMission}){

    const [mission, setMission] = useState({
        missionDescription: "",
        date: "",
        time : "",
        userid : userId,  //send the id of employee to know in backend for witch user this mission created
        
      });

      

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(mission)
        setVisiblity(false)
       axios.post(`${API_URL}/add_mission`,mission) //send a mission as param to the backend
        .then(result => {
            setNewMission(result.data);
        })
        .catch(err=>console.log(err))
    }

    if(isVisible) {
        return (
        <div class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-2xl border-2 border-gray-950 p-5 text-center shadow-sm" id="modalContent">
        <form action="" onSubmit={handleSubmit}>
                <div class="flex flex-col justify-center font-bold">
                        <label class="text-xl my-2 text-black" for="TXTemplyeeName">MissionDescription</label>
                        <textarea onChange={(e)=>setMission({...mission, missionDescription: e.target.value})} id="TXTemplyeeName" class="m-auto border-2 text-black mb-2 my-3 p-2 rounded-xl" name="" cols="30" rows="6"></textarea>
                        
                        <label className='my-2 text-black' for="dateMission">Choose a date and time for end mission:</label>
                        <div class="flex flex-col justify-center px-16">
                            <input onChange={(e)=>setMission({...mission, date: e.target.value})} class="bg-gray-200 text-black rounded-md px-2 m-2 my-2" type="date" id="dateMission" name="date"/>
                            <input onChange={(e)=>setMission({...mission, time: e.target.value})} class="bg-gray-200 text-black rounded-md px-2 m-2 my-2" type="time" id="timeMission" name="time"/>
                        </div>

                        <div className='my-2'>
                            <button type="submit" id="addModalBtn" className="!items-center rounded-md bg-indigo-600 py-2 px-4 mx-24 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Mission</button>
                        </div>
                        <div>
                            <button onClick={()=>{setVisiblity(false)}}  id="closeModalBtn" className="!items-center rounded-md bg-red-600 py-2 px-4 mx-24 text-sm font-semibold text-white shadow-sm hover:text-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Close</button>
                        </div>
                </div>
            </form>
        </div>
        );
    }
    else
    {
        return(<></>)
    }

}