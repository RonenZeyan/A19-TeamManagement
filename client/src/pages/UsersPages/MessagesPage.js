import { Link } from "react-router-dom";
import { useAuth } from '../../components/Auth/AuthContext'
import { useEffect,useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { API_URL } from '../../constants';


/**
 * this page used for display all the messages 
 * @returns a html code of the page 
 */
export default function Messages(){

    /**
     * this two use state used display the message and display in reverse way 
     */
    const [messages,setMessages] = useState([])
    const [reverseMessages,setReverseMessages] = useState([])

    let visible = 'hidden'


    /**
     * a useEffect hook to Fetches the all msg's from the server and sets the initial state.
     */
    useEffect(
        ()=>{
            axios.get(`${API_URL}/get_messages`)
            .then(res=>{ 
                if(res.data)
                {
                    setMessages(res.data)
                    setReverseMessages([...res.data].reverse())  //we set reverse to the msg list to get first the last msg added
                    //...res.data we get a copy not a refernce of data (copy being without state)
                    console.log(messages)

                }
                else
                {
                    alert('failed to display the messages or there is no messages, please try again') //display alert in case msg not displayed 
                }
            })
            .catch(err=>{  //in case the sending to backend failed then display alert to user to tell him that cant comminucate with backend
                alert('failed to request display the messages, maybe there is a problem,please report')
            })
        },[]
    )
    useEffect(() => {
        console.log(messages);
    }, [messages]);




    /**
     * this function used for open and close msg pressed by user 
     * @param {string} id - id of msg
     */
    function messageOpenClick(id)
    {
        document.getElementById(id).classList.toggle('hidden') //we know that the better way is not use getelementbyid. and use state but this way fine also 
    }

  
    

    return(
        <div className='flex flex-col justify-center items-center user_home h-[100vh] text-center content my-8'>
            <div className='flex flex-col gap-10 w-full justify-center items-center font-serif'>
                <h1 className=' font-bold text-3xl text-center py-3 font-sans'>Messages</h1>
                <div className='w-1/2'>
                
                    {reverseMessages.map((msg,idx)=>(
                        <>
                        <div  key={idx} onClick={()=>{messageOpenClick(msg._id)}} className="group py-3 marker:content-['']">

                            <div class="flex w-full cursor-pointer px-2 rounded-md bg-[#EFEFEF] select-none justify-between text-left text-base font-semibold leading-7 text-slate-900 group-open:text-indigo-600 [&::-webkit-details-marker]:hidden">
                                <p className='py-2 font-bold font-sans'>{msg.title}</p>
                                <p className='py-2 font-bold text-black font-sans'>{moment(msg.MsgDate).format('MM/DD/YYYY hh:mm:ss A')}</p>
                            </div>
                            <p id={msg._id} className={'py-2 min-h-10 bg-gray-300 rounded-sm text-start text-black px-2 font-bold hidden font-sans'}>{msg.MsgContent}</p>
                        </div>
                        </>
                    ))}

                </div>
            </div>
        </div>
    )

}