import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const AddMember=()=>{
    const urlMembers = 'http://localhost:5000/addMember';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [members , setMembers] = useState({
        Name: "",
        Email : "",
        City : ""
    });


    const handelSaveClick= async(e)=>{
        e.preventDefault();
        try{
            const config={
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({...members})
            }
            const response = await fetch(urlMembers , config);

            if (!response.ok) {
                throw new Error(`Failed to add movie`);
            }

            const data = await response.json();

            if(data){
                dispatch({ type: 'ADD_NEW_MEMBER', payload: data });
                console.log(data);
                setMembers({
                    Name: "",
                    Email : "",
                    City : ""
                })

            }

        }catch(error){
            console.log(error);
        }


    }


    const handelCancelClick=()=>{
        navigate('/subscriptions');
    }
    




    return(
        <div style={{border:'2px solid black' , width:'500px' , height:'400px' , padding:'20px' , margin:'20px'}}>
            <h1>Add new Member</h1>
            <form>
               Name : <input type='text' value={members.Name} onChange={(e)=> setMembers({...members , Name:e.target.value})} />
               <br/>
               <br/>
               Email :  <input type='text' value={members.Email} onChange={(e)=> setMembers({...members , Email:e.target.value})} />
               <br/>
               <br/>
               City :  <input type='text' value={members.City} onChange={(e)=> setMembers({...members , City:e.target.value})} />
               <br/>
               <br/>
                <button onClick={handelSaveClick}>Save</button>
                <button onClick={handelCancelClick}>Cancel</button>
            </form>
        </div>
    )
}


export default AddMember;