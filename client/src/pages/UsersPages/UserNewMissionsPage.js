import Table from "../../components/Table/Table"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import SearchCompo from '../../components/Search/Search';
import { API_URL } from '../../constants';


/**
 * this page used for display the mission of user in the waiting status
 * @returns a html code of the page 
 * @componentsUsed - SearchCompo and table 
 */ 
export default function UserNewMissions(){


    const tableHead=["missionDate","endDate","missionDescription","status","Action"]
    const [Missions,setMissions] = useState([])
    const [allMissions,setAllMissions] = useState([])
    const userID = localStorage.getItem('userID');


    useEffect(()=>{
        axios.get(`${API_URL}/newUserMissions/${userID}`)
        .then(
            (Missions) =>{
                // console.log(Missions.data);
                if(Missions.data.missionsStatus==true)
                {
                    setMissions(Missions.data.Missions)
                    setAllMissions(Missions.data.Missions)
                    // console.log(Missions.data.Missions)
                }
                else
                {
                    console.log("failed")
                }}).catch(err=>console.log(err))
    },[allMissions])



    const renderAcceptMissionButton = (mission) => (
        // <Link className='inline font-bold font-mono bg-gray-400 mx-2 py-2 px-3 rounded-xl hover:bg-gray-600 hover:px-4 hover:py-3 transitions' to={`user/missions/${user._id}`}>Show Missions</Link>
        <button onClick={()=>{handleOnClickAcceptMissionButton(mission)}} className='bg-gray-400 px-2 py-2 rounded-lg m-1 font-serif font-bold hover:bg-gray-500'>accept Mission</button>    
    );


    /**
     * this method send post to backend to change the mission status (send the id of mission)
     * @param {object} mission - a object mission include data about mission
     */
    const handleOnClickAcceptMissionButton = (mission) =>
    {
        console.log(mission)
        const isConfirmed = window.confirm("Are you sure you want to accept the mission?");
        if(isConfirmed)
        {
            axios.post(`${API_URL}/acceptMission/${mission._id}`)
            .then(res=>
                {
                setMissions(prevMissions => prevMissions.filter(m => m._id !== mission._id)); //filter the accepted mission and render the table by useState
                }) 
            .catch(err=>{console.log(err)})
        }
        else
        {
            console.log('user not accept');
        }
    };



    return (
        <div className="user_home h-[100vh] content flex flex-col justify-center items-center my-8">     
            <h1 className="font-bold text-3xl text-center py-4 ">New Missions</h1>
            <SearchCompo searchByList={["missionDescription"]} setData={setMissions} allData={allMissions} initialSearchState={'missionDescription'} />
            <h1 className='font-bold text-5xl mt-14 font-serif'>
            {Missions.length > 0 ?null: "No Missions"} 
            </h1>
            <div>
            {Missions && <Table tableSort={tableHead} data={Missions} extraColumns={[renderAcceptMissionButton]}/>}            
            </div>

        </div>
    )

}