import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../components/Auth/AuthContext";
import {decodeToken,getUserIdFromToken} from "../../utils/JWTutils"; //in jwtUtils there is a code that can decode the secret token send by the backend
import { API_URL } from '../../constants';

/**
 * this component used for login page (in this page we can display two types of home (userHome or adminHome))
 * the userHome or adminHome displayed by check the role (if it admin or user) in the decoded token that sended by the backend
 * token include email,username,id,role(admin/user) etc...
 * @returns a html code of page 
 */
export default function Login() {


  
  /**
   * line 23 - a useAuth hook for used for login 
   * line 24 - a useState hook for display and set email
   * line 25 - a useState hook for display and set email
   * line 26 - used for the navigation between pages 
   * line 27 - a useState hook for display and set email
   */
    const { login } = useAuth(); 
    const [Email,setEmail] = useState()
    const [Password,setPassword] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    

    /**
     * handle the submit of form of login and send the data to backend to check their correction and return a token include data of the user like id and etc
     * save the data in localStorage like id 
     * @param {event} e event 
     */
    const handleSubmit = async (e)=>{
        e.preventDefault()  //to stop refresh to the page 
        axios.post(`${API_URL}/login`,{Email,Password})
        .then(result => {console.log(result.data)
          const resData = result.data;
          if(resData.loginStatus==true)
          {
            setError(null)
            localStorage.setItem('token', resData.token);
            const userInfo = decodeToken(resData.token); //decode the token
            login(resData.token)
            localStorage.setItem('userID',resData.userID) //save some decoded data from token in the localstorage (we can save in session storage also)
            if(userInfo.role==='admin') { //check role to know if the who loggedIN is user/admin
                navigate('/adminHome');  //in case it's admin then display a adminHome
            } 
            else {
                navigate('/userHome'); //in case it's user then display userHome
            }
          }
          else
          {
            setError(resData.ErrorMSG)
          }
        })
        .catch(err=>console.log(err))
    }




    //the html code that displayed 
    return (
        <div class="font-[sans-serif]">
          <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
            <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
              <div class="max-md:text-center ">
                <h2 class="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]  ">
                  Seamless Login for Exclusive Access
                </h2>
                <p class="text-sm mt-6 text-gray">Immerse yourself in a hassle-free login journey with our intuitively designed login form. Effortlessly access your account.</p>
              </div>
              <form class="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full " action="" onSubmit={handleSubmit}>
                <h3 class="text-3xl font-extrabold mb-8 max-md:text-center">
                  Login
                </h3>
                <div className='shadow-md'>
                  <input name="email" type="email" autocomplete="email" required className="bg-gray-100 text-black w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Email address" onChange={e=>setEmail(e.target.value)}/>
                </div>
                <div className='shadow-md'>
                  <input name="password" type="password" autocomplete="current-password" required className="bg-gray-100 text-black w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label for="remember-me" class="ml-3 block text-sm">
                      Remember me
                    </label>
                  </div>
                  <div class="text-sm">
                    <a href="jajvascript:void(0);" class="text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div class="!mt-10">
                  <button id="submitButton" type="submit" class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Log in
                  </button>
                </div>
                <p className="font-extrabold text-red-900 text-center pt-3">{error&&error}</p>
              </form>
            </div>
          </div>
        </div>
    )
  }