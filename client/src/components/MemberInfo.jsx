import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MemberInfo = () => {
    const { memberid } = useParams();
    const [member, setMember] = useState(null);
    const urlMembers = `http://localhost:5000/members/${memberid}`;

   console.log(memberid);
    useEffect(() => {
        const fetchMember = async () => {
            try {
                const resp = await fetch(urlMembers);
                const data = await resp.json();
                if (data) {
                    setMember(data);
                }
                console.log(setMember(data));
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMember();
    }, [urlMembers]);


    if (!member) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Member Details</h2>
            <p>Name: {member.Name}</p>
            <p>Email: {member.Email}</p>
            <p>City: {member.City}</p>
        </div>
    );
};

export default MemberInfo;
