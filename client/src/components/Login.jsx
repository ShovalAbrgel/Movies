import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const loginUrl = "http://localhost:4000/";

const LoginPage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 



  const loginClick = async (event) => {
    event.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
    };
  
    try {
      const response = await fetch(loginUrl, config);
      if (!response.ok) {

        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (data) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data }); 
        console.log(data);
        console.log("LOGIN_SUCCESS");
        setUsername("");
        setPassword("");
        Navigate('/mainPage');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch({ type: 'LOGIN_FAILED', payload: error.message });
      setErrorMessage('Username or password is incorrect');
    }
  }
  
  const handleCreateAccountClick = () => {
    Navigate("/signup"); 
  }

  return (
    <div className="login-container">
      <h1>Login Page</h1>
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
        <button className="login-button" onClick={loginClick}>Login</button>
      </form>
      <p style={{textAlign:"center" }} id="errorMessage">{errorMessage}</p>
      <p className="create-account-link">New User? : <button className="create-account-button" onClick={handleCreateAccountClick}>Create Account</button></p> 
    </div>
  );
}

export default LoginPage;
