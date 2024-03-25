import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const createUserUrl = 'http://localhost:4000/signup';
  const checkUsernameUrl = `http://localhost:4000/check-username/${username}`;

  const checkUsername = async () => {
    const checkUsernameConfig = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    try {
      const checkUsernameResponse = await fetch(checkUsernameUrl, checkUsernameConfig);
      if (!checkUsernameResponse.ok) {
        throw new Error('Error checking username');
      }

      const checkUsernameData = await checkUsernameResponse.json();
      console.log('Username check response:', checkUsernameData);

      return !checkUsernameData.usernameExists;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error checking username');
    }
  };

  const createAccountClick = async (event) => {
    event.preventDefault();
  
    try {
      const config = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      };
  
      const response = await fetch(createUserUrl, config);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Response:', data);
  
      dispatch({ type: 'CREATE_USER_SUCCESS', payload: data });
      console.log('CREATE_USER_SUCCESS');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      dispatch({ type: 'CREATE_USER_FAILED', payload: error.message });
      setErrorMessage('Username does not exist');
    }
  };
  

  return (
    <div className="login-container"> 
      <h1>Create Account Page</h1>
      <form>
        <input
          className="input-field" 
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="input-field" 
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="login-button" onClick={createAccountClick}>Create Account</button>
      </form>
      <p style={{textAlign:"center"}} className="error-message">{errorMessage}</p> 
    </div>
  );
}

export default CreateAccountPage;
