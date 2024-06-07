import { Link } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import { useEffect,useState } from 'react';
import axios from "axios"
import { API_URL } from '../../constants';



/**
 * this page used for display home page of user (Not admin)
 * @returns a html code of the page 
 */ 

export default function UserHome(){
    const { user } = useAuth(); 
    const userID = localStorage.getItem('userID');
    const [newMissionsNum, setnewMissionsNum] = useState(0);//initialize the newMissionsNum in 0  
    const [messageNum, setMessageNum] = useState(0);
 

    useEffect(() => {
        axios.get(`${API_URL}/numMissionsMessages/${userID}`)
            .then((response) => {
                setnewMissionsNum(response.data); 
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${API_URL}/numMessages/${userID}`)
            .then((response) => {
                setMessageNum(response.data); 
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, []);

    //font-extrabold
    return (
        <div className='container mx-auto text-center flex flex-col justify-center items-center my-8'>
            <h1 className='text-3xl font-bold p-5 '>Welcome <span className='font-extrabold  uppercase text-[royalblue]'>{user?user.name:'unknown'}</span></h1>
            <div className='flex flex-col md:flex-row gap-10 justify-center items-center p-14 my-8'>
                <div className={`bg-gray-800 text-gray-300 w-[200px] h-[150px] shadow-md rounded-md text-center font-bold flex items-center justify-center text-2xl hover:bg-gray-600 hover:w-[220px] hover:h-[180px] transition-all duration-300 ${newMissionsNum === 0 ? "" : "border-4 border-red-600"}`}>
                    <Link to="/userNewMissions"  className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <h1>New Missions 
                        <div >
                            {newMissionsNum==0?"no missions":newMissionsNum}
                        </div>
                        </h1>
                    </Link>
                </div>
                <div className='bg-gray-800 text-gray-300 w-[200px] h-[150px] shadow-md rounded-md text-center font-bold flex items-center justify-center text-2xl hover:bg-gray-600 hover:w-[220px] hover:h-[180px] transition-all duration-300'>
                    <Link to="/profile" className='flex flex-col items-center'>
                        <svg fill="#d1d5db" width="67px" height="67px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                            <g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z">
                                </path>
                            </g>
                        </svg>
                        <h1>Profile</h1>
                    </Link>
                </div>
                <div className={`bg-gray-800 text-gray-300 w-[200px] h-[150px] shadow-md rounded-md text-center font-bold flex items-center justify-center text-2xl hover:bg-gray-600 hover:w-[220px] hover:h-[180px] transition-all duration-300 ${messageNum === 0 ? "" : "border-4 border-red-600"}`}>
                    <Link to="/messages">
                        <svg className='w-[67px] m-auto' viewBox="0 0 24 24" fill="#d1d5db" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                            <g id="SVGRepo_iconCarrier">
                                <path d="M7 9H17M7 13H17M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </svg>
                        <h1>New Messages
                        <div>{messageNum === 0 ? "no messages" : messageNum}</div>
                        </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}