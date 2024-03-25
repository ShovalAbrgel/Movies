import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EditPage from './EditUser';
import { Link } from 'react-router-dom';


const ManageUsers = () => {
    const dispatch = useDispatch();
    const urlUsers = 'http://localhost:4000/users';

    const [users, setUsers] = useState([]);
    const [isUserClick, setIsUserClick] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        if (isUserClick) {
            fetchUsers();
        }
    }, [isUserClick]);

    const fetchUsers = async () => {
        const usersConfig = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };

        try {
            const resp = await fetch(urlUsers, usersConfig);
            const data = await resp.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async (userId) => {
        try {
            await fetch(`${urlUsers}/${userId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
    
            const updatedUsers = users.filter(user => user._id !== userId);
            setUsers(updatedUsers);
    
            dispatch({ type: 'DELETE_USER', payload: userId }); 
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditUser = async (userId) => {
        setEditUserId(userId);
        setIsUserClick(false); 
    }

    const handleAllUsersClick = () => {
        setIsUserClick(true);
        setEditUserId(null); 
    }

    return (
        <div>
          <button className='main-button'  style={{ backgroundColor: isUserClick ? 'lightpink' : '' }} onClick={handleAllUsersClick}>All Users</button>
          <h2>All Users</h2>
          {!editUserId && users.map(user => (
          <div style={{ border: '1px solid black', width: '500px', margin: '20px', padding: '20px' }} key={user.id}>
              <p>FirstName: {user.FirstName}</p>
              <p>LastName: {user.LastName}</p>
              <p>User Name: {user.UserName}</p>
              <p>CreatedDate: {user.CreatedDate}</p>
              <p>SessionTimeOut: {user.SessionTimeOut}</p>
              <p>Permissions: {user.permissions.join(', ')}</p>
              <button className='main-button' onClick={() => handleEditUser(user._id)}>Edit</button>
              <button className='main-button'  onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </div>
          ))}
        {editUserId && <EditPage user={users.find(user => user._id === editUserId)} />}
        </div>
      );
      
};

export default ManageUsers;
