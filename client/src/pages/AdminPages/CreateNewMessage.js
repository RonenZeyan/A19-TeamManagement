import { useEffect,useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';


/**
 * this page used for create new msg by the admin
 * @returns - a html code of the page
 */
export default function CreateNewMessage(){
      /**
        * Allows navigation to different pages within the application.
        */ 
    const navigate = useNavigate()


    /**
     * this two use state used for set title and set content of msg
     */
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')


    /**
     * this function handle the submitation of form including send msg data to server/backend 
     * @param {event} e - event param 
     */
    const submit = function(e){
        e.preventDefault() //submit of form make a refresh to the page (this action stop this refersh )
        axios.post(`${API_URL}/add_message`,{title,content})
        .then(res=>{  //in case the comminucation with backend success then check if res from backend success mean the msg saved else mean the msg not saved
            if(res.data ==='success')
            {
                navigate('/adminHome')  //in case success mean the msg saved then go to homePage of admin
            }
            else
            {
                alert('failed to save the msg, please try again')
            }
        })
        .catch(err=>{  //in case the sending to backend failed then display alert to user to tell him that cant comminucate with backend
            alert('failed to send the msg, maybe there is a problem,please report')
        })
    }

    
    return(
        <div className='flex flex-col my-4 justify-center items-center user_home h-[100vh] text-center content'>
            <h1 className='text-5xl font-bold text-center my-6'>New Message</h1>
            <div className='my-4'>
                <form onSubmit={submit} action="">
                <div className='flex flex-col justify-center items-center gap-6 w-full font-bold'>
                    <div className='flex  w-3/4 justify-center items-center'>
                        <input onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className='p-3 border border-black rounded-md w-3/4 text-black' type="text" name="Title" id="" />
                    </div>
                    <div className='flex w-3/4 justify-center items-start'>
                        <textarea onChange={(e)=>setContent(e.target.value)} className='p-3 border border-black rounded-md w-3/4 text-black'  placeholder="Content" name="" id="" cols="102" rows="10"></textarea>
                    </div>
                    <button className='text-[royalblue] hover:text-white border border-[royalblue] hover:bg-[royalblue] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800' type="submit">Send Message</button>
                </div>
                </form>
            </div>
        </div>
    );

}