import {BrowserRouter,Route,Routes} from 'react-router-dom'
import axios from 'axios';

//===============Start Pages=====================
import LoginPage from './pages/StartPages/LoginPage.js';
import LearnMorePage from './pages/StartPages/LearnMorePage.js';
import HomePage from './pages/StartPages/HomePage.js';

//===============Admin Pages=====================
import AdminHomePage from './pages/AdminPages/AdminHomePage.js';
import EmployeesPage from './pages/AdminPages/EmployeesPage.js'
import MissionsPage from './pages/AdminPages/MissionsPages.js';
import UserMissionsPage from './pages/AdminPages/UserMissionsPage'
import EditUserByAdminPage from './pages/AdminPages/EditUserByAdminPage.js'
import CreateNewMessage from './pages/AdminPages/CreateNewMessage.js';

//===============Users Pages=====================
import UserHomePage from './pages/UsersPages/UserHomePage.js'
import ProfilePage from './pages/UsersPages/ProfilePage.js';
import MessagesPage from './pages/UsersPages/MessagesPage.js'
import UserNewMissionsPage from './pages/UsersPages/UserNewMissionsPage.js';
import UserExistingMissionsPage from './pages/UsersPages/UserExistingMissionsPage.js'

//===============Components=====================
import Navbar from './components/Navbar/Navbar.js';
import Footer from './components/Footer/FooterNew.js';
import { AuthProvider } from './components/Auth/AuthContext.js'; 

//===============footer=====================
import ContactUs from './pages/FooterPages/ContactUs';
import AboutUs from './pages/FooterPages/AboutUs.js'
import FAQs from './pages/FooterPages/FAQs.js';

import './App.css';

axios.defaults.withCredentials = true;


function App() {
  return (
<AuthProvider>
      <BrowserRouter>
        <Navbar />
        
        <div className="site-container">
          <Routes>
            {/* start pages */}
              <Route path='/' element={<HomePage />} />
              <Route path='/learnMore' element={<LearnMorePage />} />
              <Route path='/login' element={<LoginPage />} />

            {/* footer pages */}
              <Route path='/contactUs' element={<ContactUs />} />
              <Route path='/AboutUs' element={<AboutUs />} />
              <Route path='/FAQs' element={<FAQs />} />


            {/* admin pages */}
              <Route path='/adminHome' element={<AdminHomePage />} />
              <Route path='/employeesPage' element={<EmployeesPage />} />
              <Route path='/missions' element={<MissionsPage />} />
              <Route path='/editUser/:id' element={<EditUserByAdminPage />} />
              <Route path='/employeesPage/user/missions/:id' element={<UserMissionsPage />} />
              <Route path='/createNewMessage' element={<CreateNewMessage />} />
              

            {/* userPages */}
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/userHome' element={<UserHomePage />} />
              <Route path='/messages' element={<MessagesPage />} />
              <Route path='/userNewMissions' element={<UserNewMissionsPage />} />
              <Route path='/userExistingMissions' element={<UserExistingMissionsPage />} />

          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
</AuthProvider>


  );
}

export default App;
