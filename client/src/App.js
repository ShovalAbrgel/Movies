import './App.css';
import './Login.css';
import './Main.css';
import './Movie.css';
import './Member.css'
import LoginPage from './components/Login';
import SignUpPage from './components/signUp';
import MainPage  from './components/Main';
import UsersData from './components/ManageUsers';
import EditPage from './components/EditUser';
import AddUser from './components/AddUser';
import Movies from './components/Movies';
import Member from './components/Member';
import AddMovie from './components/AddMovie'; 
import AddMember from './components/AddMember';
import MemberInfo from './components/MemberInfo';
import { Routes, Route } from 'react-router-dom';
import EditMovie from './components/EditMovie';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/users/:userId" element={<UsersData />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/subscriptions" element={<Member />} />
        <Route path="/addMember" element={<AddMember/>} />
        <Route path="/members/:memberid" element={<MemberInfo/>} />











        {/* <Route path="/members/:id" element={<Member />} /> */}
      </Routes>
    </div>
  );
}

export default App;
