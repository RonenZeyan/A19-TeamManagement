import Table from "../../components/Table/Table"
import NewEmployeeModal from "../../components/Modals/NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import SearchCompo from '../../components/Search/Search';
import { API_URL } from '../../constants';

/**
 * this page display the missions table (all exist missions in all type of status)
 * @returns - a html code including a search component and table component
 * @ComponentsUsed - search component and table component
 */

export default function Missions(){
        
    /**
     * The columns to display in the table.
     */
    const tableHead=["employeeName","missionDate","endDate","missionDescription","status"]
    /**
     * this two use state hook for refresh the DOM when missions changed 
     */
    const [Missions,setMissions] = useState([])
    const [AllMissions,setMAllissions] = useState([]) //hook useState

        /**
         * a useEffect hook Fetches the table of all missions exist from the server and sets the initial state.
         */
    useEffect(()=>{
        axios.get(`${API_URL}/allMissions`)
        .then(
            (Missions) =>{setMissions(Missions.data);setMAllissions(Missions.data); console.log(Missions.data);}
            )
        .catch(err=>console.log(err))
    },[])

    
    //in this component we make reuse of the component search (there is more than one page have the same search)
    //then we make search as a indepedent component to use it in more than one place
    //we also use table component for reuse (becasue there are many pages include table)
    //then we make a table and cell and row pages and use them in each page we have a table (we just send the data then the table will created)
    return (
        <div className="user_home h-[100vh] content flex flex-col justify-center items-center my-8">
                    <h1 className="font-bold text-3xl text-center py-4 ">Missions</h1>
                    <SearchCompo searchByList={["missionDescription","employeeName"]} setData={setMissions} allData={AllMissions} initialSearchState={'missionDescription'}/>
                <div className=""> 
                {Missions && <Table tableSort={tableHead} data={Missions} extraColumns={[()=>{}]}/>}            
                </div>
        </div>
    )

}