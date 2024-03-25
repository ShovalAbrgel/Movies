import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const EditPage = ({ user }) => {
  const [permissions, setPermissions] = useState([]);
  const [editPageVisible, setEditPageVisible] = useState(true);
  const [userData, setUserData] = useState({
    FirstName: user.FirstName,
    LastName: user.LastName,
    UserName: user.UserName,
    SessionTimeOut: user.SessionTimeOut,
    CreatedDate: user.CreatedDate,
  });
  const dispatch = useDispatch();

  const updateUserData = async () => {
    try {
      const userIdString = user._id.toString();
      const updatedUser = { ...userData, permissions };
      const usersConfig = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      };
  
      const resp = await fetch(`http://localhost:4000/users/${userIdString}`, usersConfig);
      console.log(resp);
      if (!resp.ok) {
        throw new Error(`Failed to update user: ${resp.status} ${resp.statusText}`);
      }
  
      const data = await resp.json();
      console.log(data);

      if(data){
        dispatch({ type: 'UPDATE_USER', payload: data });
        setEditPageVisible(false);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { checked, name } = e.target;

    if (checked) {
      setPermissions((prevPermissions) => [...prevPermissions, name]);

      if (
        name === 'Create Subscriptions' ||
        name === 'Update Subscriptions' ||
        name === 'Delete Subscriptions'
      ) {
        setPermissions((prevPermissions) => [
          ...prevPermissions,
          'View Subscriptions'
        ]);
      } else if (
        name === 'Create Movies' ||
        name === 'Update Movies' ||
        name === 'Delete Movies'
      ) {
        setPermissions((prevPermissions) => [...prevPermissions, 'View Movies']);
      }
    } else {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== name)
      );
    }
  };

  const handelCancelClick=()=>{
    setEditPageVisible(false);  
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    updateUserData();
  };
 

  return (
    <div>
      {editPageVisible && (
        <div>
          <h2>Edit user: {user.FirstName} {user.LastName}</h2>
          <div style={{ border: '1px solid black', width: '700px', height: '700px', }}>
            <form onSubmit={handleSubmit}>
              <br />
              <br />
              First Name: <input type='text' name='FirstName' value={userData.FirstName} onChange={handleInputChange} />
              <br />
              <br />
              <br />
              Last Name: <input type='text' name='LastName' value={userData.LastName} onChange={handleInputChange} />
              <br />
              <br />
              <br />
              User Name: <input type='text' name='UserName' value={userData.UserName} onChange={handleInputChange} />
              <br />
              <br />
              <br />
              Session Time Out (Minutes): <input type='number' name='SessionTimeOut' value={userData.SessionTimeOut} onChange={handleInputChange} />
              <br />
              <br />
              <br />
              Created Date: <input type='date' name='CreatedDate' value={userData.CreatedDate} readOnly />
              <br />
              <br />
              <br />
              Permissions:
              <label>
                View Subscriptions
                <input
                  type='checkbox'
                  name='View Subscriptions'
                  checked={permissions.includes('View Subscriptions')}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Create Subscriptions
                <input
                  type='checkbox'
                  name='Create Subscriptions'
                  checked={permissions.includes('Create Subscriptions')}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Update Subscriptions
                <input
                  type='checkbox'
                  name='Update Subscriptions'
                  checked={permissions.includes('Update Subscriptions')}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Delete Subscriptions
                <input
                  type='checkbox'
                  name='Delete Subscriptions'
                  checked={permissions.includes('Delete Subscriptions')}
                  onChange={handleCheckbox}
                />
              </label>
              <br />
              <br />
              <label>
                View Movies
                <input
                  type='checkbox'
                  name='View Movies'
                  checked={permissions.includes('View Movies')}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Create Movies
                <input
                  type='checkbox'
                  name='Create Movies'
                  checked={permissions.includes('Create Movies')}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Update Movies
                <input
                  type='checkbox'
                  name='Update Movies'
                  checked={permissions.includes('Update Movies')}
                  onChange={handleCheckbox}
                />
              </label>
              <label>
                Delete Movies
                <input
                  type='checkbox'
                  name='Delete Movies'
                  checked={permissions.includes('Delete Movies')}
                  onChange={handleCheckbox}
                />
              </label>
              <br />
              <button onClick={updateUserData}>Update</button>
              <button onClick={handelCancelClick}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
  
}

export default EditPage;
