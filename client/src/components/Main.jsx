import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ManageUsers from './ManageUsers';
import AddUser from './AddUser'; 

const MainPage = () => {
  const Navigate = useNavigate();
  const isAdmin = useSelector(state => state.isAdmin); 
  const [isClickAdmin, setIsClickAdmin] = useState(false); 
  const [isUserClick, setUserClick] = useState(false);
  const [isAddUserVisible, setIsAddUserVisible] = useState(false); 

  const logOut = () => {
    Navigate('/');
  }

  const handleAddUserClick = () => {
    Navigate('/addUser');
  };

  return (
    <div className="main-container">
      <div className="main-buttons">
        <Link to="/movies"><button className="main-button">Movies</button></Link>
        <Link to="/subscriptions"><button className="main-button">Subscriptions</button></Link>
        <button className="main-button" onClick={logOut}>LogOut</button>
      </div>
      {isAdmin && 
        <>
          <button className="main-button" style={{ backgroundColor: isClickAdmin ? 'lightpink' : '' }} onClick={() => setIsClickAdmin(!isClickAdmin)}>Manage Users</button> 
          {isClickAdmin && 
            <div>
              <br/>
              <button className="main-button" onClick={handleAddUserClick}>Add User</button>
              <ManageUsers />
            </div>
          }
          {isAddUserVisible && <AddUser />} 
        </>
      }
    </div>
  );
};

export default MainPage;
