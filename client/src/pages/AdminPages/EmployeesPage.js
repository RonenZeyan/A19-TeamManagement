import Table from "../../components/Table/Table"
import NewEmployeeModal from "../../components/Modals/NewEmployeeModal"
import React,{ useState, useEffect } from 'react'
import axios from "axios"
import { Link,useNavigate } from "react-router-dom";
import SearchCompo from '../../components/Search/Search';
import { API_URL } from '../../constants';

/**
 * this page display the table of all employees 
 * @returns {string} a html code include table component and search component and newEmployee modal component
 * @ComponentsUsed - search component and table component and newEmployee Modal Component
 * */
export default function Employees(){

        /**
         * useState hook for display modal (modal of add new employee)
         */
        const [showModal,setShowModal] = useState(false)

        /**
        * Allows navigation to different pages within the application.
        */
        const navigate = useNavigate();

        /**
         * The columns to display in the table.
         */
        const tableHead=["gender","image","name","email","password","age","phone", "missions", "edit", "delete"]
        
        /**
         * this two use states used for update users table (update/delete/add new one)
         */
        const [users,setUsers] = useState([])
        const [allUsers,setAllusers] = useState([])

        /**
         * Fetches the table of users from the server and sets the initial state.
         */
        useEffect(()=>{
            console.log(users)
            axios.get(`${API_URL}/users`)
            .then(
                (users) =>{setUsers(users.data); setAllusers(users.data); console.log(users.data);}
                )
            .catch(err=>console.log(err))
        },[])

        /**
         * handle the addition of new user and refersh the table of users (by change value in use state)
         * @param {object} newUser - result of adding the newuser 
         */

        const handleAddNewUser = (newUser) => {
            setUsers([...users, newUser]);
            setAllusers([...allUsers, newUser]);
        };


        /**
         * handle the edit of the data of user 
         * @param {String} userId - id of the user we want to change his data 
         */
        const handleEditUser=(userId) => {
            // setShowModal(true)
            navigate(`/editUser/${userId}`)
        }

        /**
         * handle the deletation of exist user 
         * @param {String} userId - id of the user we want to delete him
         */
        const handleDeleteUser = (userId) => {
            //this window like alert it ask before delete if user sure want to delete
            const isConfirmed = window.confirm("Are you sure you want to delete this user?");
            
            if (isConfirmed) {
                //in case user press yes then the delete happen
                axios.delete(`${API_URL}/users/delete/${userId}`)
                    .then(() => {
                         //we filtered the undisired user (filter func return a new array with the remain users)
                        const updatedUsers = users.filter(user => user._id !== userId);
                        setUsers(updatedUsers); //we change state to render the table 
                    })
                    .catch(err => console.error(err));
            } else {
                //in case user press cancel
                console.log("User deletion was cancelled.");
            }
        };
        
    
        /**
         * a mission button in employees/users table
         * @param {object} user - the user object,including data about user like id and etc 
         * @returns a html code including a button that when user press it navigated to missions of user page 
         */ 
        const renderShowMissionsButton = (user) => (
            <Link className='hover:text-white border  hover:bg-gray-900 hover:border-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' to={`user/missions/${user._id}`}>Show Missions</Link>
            
        );

        /**
         * a icon of edit user data 
         * @param {object} user - the user object,including data about user like id and etc 
         * @returns - a html code including a button(icon) that when press it start handleEditUser function and navigate to edit user data page
         */
        const renderEditUserDetails = (user) =>(
            // <Link to={`user/missions/${user._id}`}><svg className='inline border border-blue-700 w-6 rounded-full mr-2 hover:bg-gray-400' fill="#004cff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#004cff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg></Link>
            <div onClick={() => handleEditUser(user._id)} className='cursor-pointer inline-flex items-center justify-center w-10 h-10'>
                <svg className='border border-blue-700 w-6 h-6 rounded-full hover:bg-gray-400' fill="#004cff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#004cff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path>
                    </g>
                </svg>           
            </div>

            );

        /**
         * a icon of delete user 
         * @param {object} user - the user object,including data about user like id and etc 
         * @returns -  a html code including a button(icon) that when press it start handleDeleteUser function and delete exist user 
         */
        const renderDeleteUser = (user) => (
            // <Link to={`user/missions/${user._id}`}><svg className='inline mr-2 border border-red-700 w-6 rounded-full hover:bg-blue-400' fill="#ff0000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg></Link>
            <div onClick={() => handleDeleteUser(user._id)} className='cursor-pointer inline-flex items-center justify-center w-10 h-10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-[#FF3A3A]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </div>

        );

        //this component reuse the table component and the search compoent also (in missionTable.jsx) we explain we more details 
        return (
            <div className="container mx-auto text-center flex flex-col justify-center items-center my-8'">
                <h1 className="font-bold text-3xl text-center py-3 ">Employees</h1>
                <div className="flex flex-col m-4 gap-4">
                    <button onClick={()=>{setShowModal(true)}} id="showModalBtn"  class=" !items-center rounded-md bg-indigo-600 mx-64 p-2  text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span className="font-bold">Add New Employee +</span></button>
                    <SearchCompo searchByList={["name","email","phone"]} setData={setUsers} allData={allUsers} initialSearchState={'name'} />
                </div>
                <div className="font-sans"> 
                    {/* {users && <Table tableSort={tableHead} data={users} extraColumns={renderShowMissionsButton}/>}             */}
                    <Table 
                        tableSort={tableHead} 
                        data={users} 
                        extraColumns={[renderShowMissionsButton, renderEditUserDetails, renderDeleteUser]}
                        />
                </div>
                <NewEmployeeModal setVisiblity={setShowModal} isVisible={showModal} setNewUser={handleAddNewUser}/>
            </div>
        )
        
}