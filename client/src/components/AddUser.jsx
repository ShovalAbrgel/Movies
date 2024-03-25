import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';


const AddUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        FirstName: '',
        LastName: '',
        UserName: '',
        SessionTimeOut: '',
    });
    const [permissions, setPermissions] = useState([]);
    const [addUserVisible, setaddUserVisible] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const userUrl = 'http://localhost:4000/addUser';

    const addNewUser = async () => {
        try {
            const createdDate = new Date().toISOString().split('T')[0];
            const config = {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...user, permissions: permissions, CreatedDate: createdDate })
            }
            const resp = await fetch(userUrl, config);

            if (!resp.ok) {
                throw new Error(`Failed to update user: ${resp.status} ${resp.statusText}`);
            }

            const data = await resp.json();

            if (data) {
                dispatch({ type: 'ADD_NEW_USER', payload: data });
                setIsSaved(true);
                setSuccessMessage('User added successfully. Click "OK" to go back to the main page.');
            }
        } catch (error) {
            console.log(error);
        }
    }

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

            if (
                name === 'Create Subscriptions' ||
                name === 'Update Subscriptions' ||
                name === 'Delete Subscriptions'
            ) {
                setPermissions((prevPermissions) =>
                    prevPermissions.filter((permission) => permission !== 'View Subscriptions')
                );
            }
            else if (
                name === 'Create Movies' ||
                name === 'Update Movies' ||
                name === 'Delete Movies'
            ) {
                setPermissions((prevPermissions) =>
                    prevPermissions.filter((permission) => permission !== 'View Movies')
                );
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.FirstName && user.LastName && user.UserName && user.SessionTimeOut && permissions.length > 0) {
        const createdDate = new Date().toISOString().split('T')[0];
        setUser({ ...user, CreatedDate: createdDate });
        addNewUser();
        }else{
            alert('Please fill in all fields and select at least one permission.');
        }
    };

    const handleCancelClick = () => {
        setaddUserVisible(false);
        navigate('/mainPage');
    }

    const handleAlertClose = () => {
        setSuccessMessage('');
        setIsSaved(false);
        navigate('/mainPage');
    }

    return (
        <div style={{ border: '1px solid black', width: '700px', height: '700px', padding: '10px' }}>
            <h1>Add New User</h1>
            <form onSubmit={handleSubmit}>
                {addUserVisible && (
                    <>
                        <br />
                        <br />
                        First Name: <input type="text" name="FirstName" value={user.FirstName} onChange={handleInputChange} />
                        <br />
                        <br />
                        <br />
                        Last Name: <input type="text" name="LastName" value={user.LastName} onChange={handleInputChange} />
                        <br />
                        <br />
                        <br />
                        User Name: <input type="text" name="UserName" value={user.UserName} onChange={handleInputChange} />
                        <br />
                        <br />
                        <br />
                        Session Time Out (Minutes): <input type="number" name="SessionTimeOut" value={user.SessionTimeOut} onChange={handleInputChange} />
                        <br />
                        <br />
                        <br />
                        Permissions:
                        <label>
                            View Subscriptions
                            <input
                                type="checkbox"
                                name="View Subscriptions"
                                checked={permissions.includes('View Subscriptions')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <label>
                            Create Subscriptions
                            <input
                                type="checkbox"
                                name="Create Subscriptions"
                                checked={permissions.includes('Create Subscriptions')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <label>
                            Update Subscriptions
                            <input
                                type="checkbox"
                                name="Update Subscriptions"
                                checked={permissions.includes('Update Subscriptions')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <label>
                            Delete Subscriptions
                            <input
                                type="checkbox"
                                name="Delete Subscriptions"
                                checked={permissions.includes('Delete Subscriptions')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <br />
                        <br />
                        <label>
                            View Movies
                            <input
                                type="checkbox"
                                name="View Movies"
                                checked={permissions.includes('View Movies')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <label>
                            Create Movies
                            <input
                                type="checkbox"
                                name="Create Movies"
                                checked={permissions.includes('Create Movies')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <label>
                            Update Movies
                            <input
                                type="checkbox"
                                name="Update Movies"
                                checked={permissions.includes('Update Movies')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <label>
                            Delete Movies
                            <input
                                type="checkbox"
                                name="Delete Movies"
                                checked={permissions.includes('Delete Movies')}
                                onChange={handleCheckbox}
                            />
                        </label>
                        <br />
                        <br />
                        <Button  style={{margin:'10px'}} variant="contained" onClick={handleSubmit}>Save</Button>
                        <Button variant="contained" onClick={handleCancelClick}>Cancel</Button>
                        <Alert
                            severity="success"
                            onClose={handleAlertClose}
                            style={{ visibility: isSaved ? 'visible' : 'hidden' }}
                        >
                            {successMessage}
                            <Button style={{margin:'10px'}} variant="contained" onClick={handleAlertClose}>OK</Button>
                        </Alert>
                    </>
                )}
            </form>
        </div>
    );
};

export default AddUser;
