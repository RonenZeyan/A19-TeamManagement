import React, { useState, useEffect } from 'react'
import axios from "axios"
import EditableField from '../../components/EditUser/EditableField';
import { API_URL } from '../../constants';


//this component used for change user data 
/**
 * this page of edit the data of user by the user him self 
 * @returns a html code of page
 * @componentsUsed EditableField component
 */
export default function EditUserData(){


    //a id of user we saved in localstorage 
    const userID = localStorage.getItem('userID');
    

    /**
     * a use State hooks for change user data like name and phone and profilePic and state of disable or enable editing data 
     */
    const [userData, setUserData] = useState({ name: '', age: '', phone: '', password: '',image:'' });
    const [profilePicture,setProfilePicture] = useState(''); 
    const [isDisabled, setIsDisabled] = useState(true);



    /**
     * a useEffect hook to Fetches the data of user from the server and sets the initial state.
     */
    useEffect(() => {
        axios.get(`${API_URL}/userData/${userID}`)
            .then((response) => {
                setUserData(response.data); 
                console.log(response.data);
            })
            .catch(err => console.log(err));
    }, [userID]);



    /**
     * handle the updating of profile picture 
     * @param {event} e - event
     */
    const handleFileChange = (e)=>{
        setProfilePicture(e.target.files[0])
    }


    //handle the changing of user data 
    const handleChange = (key, value) => {
        setUserData(prev => ({ ...prev, [key]: value }));
    };

    //this method change the name of button of cancel to edit and להפך
    const toggleEdit = () => {
        setIsDisabled(!isDisabled);
    };


    /**
     * handle the submitation of form and send to backend in formData object and update (formData good for sending files and picture )
     */
    const handleSubmit = () => {
        setIsDisabled(!isDisabled);  //disable the inputs again 
        const formData = new FormData();
        formData.append('name',userData.name)
        formData.append('age',userData.age)
        formData.append('phone',userData.phone)
        formData.append('password',userData.password)
        console.log(profilePicture)
        if(profilePicture){
            formData.append('image',profilePicture);
        }
        console.log('Updating data:', userData);
        console.log('Updating data:', formData); //data sended by formdata because we send a picture and this type can save pictures 
        axios.post(`${API_URL}/editUserData/${userID}`,formData)
        .then(response=>{
            console.log(response)
            if(response.data && response.data.profilePicture)
            {
                setProfilePicture(response.data.profilePicture)
            }
        })
        .catch(err=>console.log(err))
    };



    return (
        <div className="user_home h-[100vh] content flex flex-col justify-center items-center py-7">
            <img className='rounded-full bg-white w-[200px] h-[200px] border border-black' src={userData.image? `${API_URL}/${userData.image}`:"/images/iconMan.png"}  alt="mypicture" />
            <h1 className='font-bold font-mono text-3xl py-4'>{userData.name}</h1>
            <EditableField className="custom-input" label="name" value={userData.name} onChange={(e) => handleChange('name', e.target.value)} isDisabled={isDisabled} />
            <EditableField label="Age" value={userData.age} onChange={(e) => handleChange('age', e.target.value)} isDisabled={isDisabled} />
            <EditableField label="Phone" value={userData.phone} onChange={(e) => handleChange('phone', e.target.value)} isDisabled={isDisabled} />
            <EditableField label="Password" value={userData.password} onChange={(e) => handleChange('password', e.target.value)} isDisabled={isDisabled} />
            <div className='flex w-1/4 my-3 font-bold'>
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input type="file" id="profilePicture" name="profilePicture" disabled={isDisabled} onChange={handleFileChange} />
            </div>
            <div className='flex gap-5 mt-4 font-bold'>
                <button className='bg-gray-400 p-2 rounded-md' onClick={toggleEdit}>{isDisabled ? 'Edit' : 'Cancel'}</button>
                <button className='bg-gray-400 p-2 rounded-md' onClick={handleSubmit} disabled={isDisabled}>Update</button>
            </div>
        </div>
    );
}
