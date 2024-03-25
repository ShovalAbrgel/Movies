import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditMovie from './EditMovie';
import EditMember from './EditMember';
import AddMember from './AddMember';

const Members = () => {
    const urlMembers = 'http://localhost:5000/members';
    const urlSubscriptions = 'http://localhost:5000/subscriptions';
    const urlMovies = 'http://localhost:5000/movies';
    const [isUserClick, setIsUserClick] = useState(false);
    const [isUserClickAdd, setIsUserClickAdd] = useState(false);
    const [members, setMembers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [movies, setMovies] = useState([]);
    const [editMemberId, setEditMemberId] = useState(null);
    const [showSection, setShowSection] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [selectedDate, setSelectedDate] = useState(""); 
    const [selectedMovieId, setSelectedMovieId] = useState(null); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const membersResponse = await fetch(urlMembers);
                const membersData = await membersResponse.json();
                if (membersData) {
                    setMembers(membersData);
                }

                const subscriptionsResponse = await fetch(urlSubscriptions);
                const subscriptionsData = await subscriptionsResponse.json();
                if (subscriptionsData) {
                    setSubscriptions(subscriptionsData);
                }

                const moviesResponse = await fetch(urlMovies);
                const moviesData = await moviesResponse.json();
                if (moviesData) {
                    setMovies(moviesData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedMember) {
            const watchedMovieIds = subscriptions
                .filter(sub => sub.MemberId === selectedMember._id)
                .flatMap(sub => sub.Movies.map(movie => movie.movieId));
            const unwatched = movies.filter(movie => !watchedMovieIds.includes(movie._id));
            setUnwatchedMovies(unwatched);
        }
    }, [selectedMember, subscriptions, movies]);

    const handleAllMembersClick = () => {
        setIsUserClick(true);
    };
    const handleAddMembersClick = () => {
        setIsUserClickAdd(true);
        navigate('/addMember'); 
    };

    const deleteMember = async (id) => {
        try {
            const memberId = typeof id === 'object' ? id.toString() : id;

            const resp = await fetch(`${urlMembers}/${memberId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (resp.ok) {
                const updatedMembers = members.filter(member => member._id !== memberId);
                setMembers(updatedMembers);
                dispatch({ type: 'DELETE_MEMBER', payload: memberId });
                console.log('Member deleted successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubscribe = async (movieId) => {
        try {
            const response = await fetch(urlSubscriptions, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MemberId: selectedMember._id,
                    Movies: [{ movieId,date: selectedDate  }]
                })
            });
            if (response.ok) {
                const newSubscription = await response.json();
                setSubscriptions([...subscriptions, newSubscription]);
                setShowSection(false); 
                setSelectedDate(""); 
            }
        } catch (error) {
            console.error('Error subscribing to movie:', error);
        }
    };

 

    const handelClickSub = (member) => {
        setSelectedMember(member);
        setShowSection(prevState => !prevState);
    }

    const handelEditClick = (memberId) => {
        setEditMemberId(memberId);
    };
    
    const handleCancelEdit = () => {
        setEditMemberId(null);
    };

    if (editMemberId !== null) { 
        const memberToEdit = members.find(member => member._id === editMemberId); 
        return <EditMember member={memberToEdit} onCancelEdit={handleCancelEdit}  />
    }

    return (
        <div>
            <h1>Movies - Subscriptions Web Site</h1>
            <h2>Subscriptions</h2>
            <button style={{ backgroundColor: isUserClick ? 'yellow' : '' }} onClick={handleAllMembersClick}>All Members</button>
            <button style={{ backgroundColor: isUserClickAdd ? 'yellow' : '' }} onClick={handleAddMembersClick}>Add Members</button>

            {isUserClick && (
                <div>
                    <h2>All Members</h2>
                    {members.map(member => (
                        <div key={member._id} style={{ border: '2px solid black', margin: '10px', padding: '10px', width: '400px' }}>
                            <h3>{member.Name}</h3>
                            <p>Email: {member.Email}</p>
                            <p>City: {member.City}</p>
                            <button onClick={() => handelEditClick(member._id)}>Edit</button>
                            <button onClick={() => deleteMember(member._id)}>Delete</button>
                            <p>Movies Watched:</p>
                            <button onClick={() => handelClickSub(member)}>Subscribe on new movie</button>
                            <br/>
                            <br/>
                            {showSection && selectedMember && selectedMember._id === member._id && (
                                <div style={{border:'3px solid rosybrown'}}>
                                    <h3>Add a new movie</h3>
                                   <select onChange={(e) => setSelectedMovieId(e.target.value)}>
                                        {unwatchedMovies.map(movie => (
                                            <option key={movie._id} value={movie._id}>{movie.Name}</option>
                                        ))}
                                    </select>
                                    <input type='text' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                                    <br/>
                                    <button onClick={() => handleSubscribe(selectedMovieId)}>Subscribe</button>
                                </div>
                            )}
                            <ul>
                                {subscriptions.filter(sub => sub.MemberId === member._id).map(sub => (
                                    <li key={sub._id}>
                                        {sub.Movies.map(movie => {
                                            const movieDetails = movies.find(m => m._id === movie.movieId);
                                            return movieDetails ? (
                                                <div key={movieDetails._id}>
                                                    <Link to={`/movies`}>{movieDetails.Name}</Link>
                                                    {' '}
                                                    {new Date(movieDetails.Premiered).toLocaleDateString()}
                                                </div>
                                            ) : 'Unknown Movie';
                                        })}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            
        </div>
    );
};

export default Members;
