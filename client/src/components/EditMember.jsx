import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';


const EditMember=({member , onCancelEdit})=>{

    const urlMembers =  'http://localhost:5000/members';
    const [isUpdate, setIsUpdate] = useState(false);
    const [editPageVisible, setEditPageVisible] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [memberData , setMemberData] = useState({
        Name : member.Name,
        Email : member.Email,
        City : member.City
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMemberData({ ...memberData, [name]: value });
    };

    const handelUpdateMember = async (e) => {
        e.preventDefault();
        const MemberIdString = member._id.toString();
        const updateMember = { ...memberData };
        try {
            const response = await fetch(`${urlMembers}/${MemberIdString}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateMember)
            });
            if (response.ok) {
                setIsUpdate(true);
                setEditPageVisible(false);
                dispatch({ type: 'UPDATE_MEMBER', payload: updateMember });
                setSuccessMessage('Member Update successfully. Click "OK" to go back to the all Members Page.');
            } else {
                console.error('Failed to update member:', response.statusText);
            }
        } catch (error) {
            console.log("An error occurred while updating the member:");
            console.error(error);
        }
    };
    

    const handelCancelClick=()=>{
        navigate('/subscriptions');
    }


    const handleAlertClose = () => {
        setSuccessMessage('');
        setIsUpdate(false);
        onCancelEdit();
    }

    return(
        <div>
            <form>
            Name : <input className='input-field' type='text' name="Name" value={memberData.Name} onChange={handleInputChange} />
            <br/>
            <br/>
            Email : <input className='input-field' type='text' name="Email" value={memberData.Email} onChange={handleInputChange} />
            <br/>
            <br/>
            City : <input className='input-field' type='text' name="City" value={memberData.City} onChange={handleInputChange} />
            <br/>
            <br/>
            <Button  className='movie-button' type="submit"  onClick={handelUpdateMember}>Update</Button>
            <Button  className='movie-button' type="button"  onClick={handelCancelClick}>Cancel</Button>

            <Alert
                    severity="success"
                    onClose={handleAlertClose}
                    style={{ visibility: isUpdate ? 'visible' : 'hidden' }}
                >
                    {successMessage}
                    <Button className='movie-button' style={{ margin: '10px' }} variant="contained" onClick={handleAlertClose}>OK</Button>
                </Alert>
            </form>
        </div>
    )
 

}

export default EditMember;