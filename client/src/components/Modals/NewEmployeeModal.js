import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

/**
 * @component
 * this component used for display the modal of create new user/employee in the usersTable page 
 * @param {Object} props - The properties object.
 * @param props.setVisiblity - display or not the modal
 * @param props.isVisible - is modal display or not 
 * @param props.setNewUser - new user object
 * @returns {JSX.Element} - a rendered modal component. 
 */
export default function NewEmployeeModal({setVisiblity,isVisible,setNewUser}){

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        phone : "",
        gender : "male",  //in case user not change in modal then we save the default value 
      });

      

    const handleSubmit = (e)=>{
        e.preventDefault()
        setVisiblity(false)
       axios.post(`${API_URL}/add_employee`,employee) //send a employee as param to the backend
        .then(result => {
            setNewUser(result.data);
        })
        .catch(err=>console.log(err))
    }

    if(isVisible) {
        return (
            <div class="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-2xl border-2 border-gray-950 p-5 text-center shadow-sm" id="modalContent">
                <form action="" onSubmit={handleSubmit}>  
                    <div className="flex flex-col justify-center font-bold">
                            <div className="flex justify-between p-2">
                            <label className='text-black' for="TXTemplyeeName">Name: </label> 
                            {/* <input id="TXTemplyeeName" className="border-2 rounded-xl" type="text"/> */}
                            <input onChange={(e)=>setEmployee({...employee, name: e.target.value})} id="TXTemplyeeName" className="border-2 px-2 rounded-md text-black" type="text"/>
                            </div>
                            <div className="flex justify-between p-2">
                            <label className='text-black' for="TXTemplyeePhone">phone: </label>
                            <input onChange={(e)=>setEmployee({...employee, phone: e.target.value})} id="TXTemplyeePhone" className="border-2 px-2 rounded-md text-black" type="text"/>
                            </div>
                            <div className="flex justify-between p-2">
                            <label className='text-black' for="TXTemplyeePhone">email:</label>
                            <input onChange={(e)=>setEmployee({...employee, email: e.target.value})} id="TXTemplyeeEmail" className="border-2 px-2 rounded-md text-black" type="text"/>
                            </div>
                            <div className="flex justify-between p-2">
                                <label className='text-black' for="genderSelect">gender:</label>
                                <select onChange={(e)=>setEmployee({...employee, gender: e.target.value})} className="border-2 rounded text-black" id="genderSelect">
                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>
                            </div>
                            <div className='my-2'>
                                <button type="submit" id="addModalBtn" className="!items-center rounded-md bg-indigo-600 py-2 px-4 mx-24 my-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Employee</button>
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