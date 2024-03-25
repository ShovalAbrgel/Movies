import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import EditMovie from './EditMovie';



const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [members, setMembers] = useState([]);
    const [isUserClick, setIsUserClick] = useState(false);
    const [isUserClickAdd, setIsUserClickAdd] = useState(false);
    const [userPermissions, setUserPermissions] = useState([]);
    const [editMovieId, setEditMovieId] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const urlMovie = 'http://localhost:5000/movies';
    const urlSubscriptions = 'http://localhost:5000/subscriptions';
    const urlMembers = 'http://localhost:5000/members';
    const urlUsers = 'http://localhost:4000/userPermission';

    useEffect(() => {
        if (isUserClick) {
            fetchMovies();
            fetchSubscriptions();
            fetchMembers();
            fetchUserPermissions();
        }
    }, [isUserClick]);

    const fetchMovies = async () => {
        try {
            const resp = await fetch(urlMovie);
            const data = await resp.json();
            if (data) {
                setMovies(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSubscriptions = async () => {
        try {
          const resp = await fetch(urlSubscriptions);
          const data = await resp.json();
          if (data) {
            setSubscriptions(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      
      const fetchMembers = async () => {
        try {
          const resp = await fetch(urlMembers);
          const data = await resp.json();
          if (data) {
            setMembers(data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      const fetchUserPermissions = async () => {
        try {
            const resp = await fetch(urlUsers);
            console.log('Response:', resp);
    
            if (resp.ok) {
                const userData = await resp.json(); 
                console.log('User Data:', userData); 
    
                if (userData && userData.permissions && userData.permissions.length > 0) {
                    setUserPermissions(userData.permissions);
                } else {
                    console.log('User permissions are empty or not provided.');
                }
            } else {
                console.log('Failed to fetch user permissions:', resp.statusText);
            }
        } catch (error) {
            console.log('Error fetching user permissions:', error);
        }
    };
    
    
    
    
    
      
 
      
      const handleAllMoviesClick = async () => {
        setIsUserClick(true);
        await fetchMovies();
        await fetchMembers();
        await fetchSubscriptions();
      };
      const handleCancelEdit = () => {
        setEditMovieId(null);
    };
      

    const handleEditClick = (id) => {
            setEditMovieId(id); 
        
    }

    if (editMovieId !== null) {
        const movieToEdit = movies.find(movie => movie._id === editMovieId); 
        return <EditMovie movie={movieToEdit} onCancelEdit={handleCancelEdit}  />
    }


    const handleDeleteClick = async (id) => {
        try {
            const response =  await fetch(`${urlMovie}/${id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                const updatedMovies = movies.filter(movie => movie._id !== id);
                setMovies(updatedMovies);
                dispatch({ type: 'DELETE_MOVIE', payload: id }); 
                console.log('Movie deleted successfully');
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    const handelFindMovie=()=>{
        const searchTerm = document.getElementById('searchInput').value;
        const filteredMovies = movies.filter(movie => movie.Name.toLowerCase().includes(searchTerm.toLowerCase()));
        setMovies(filteredMovies);
    }

    const canEditOrDelete = (userId) => {
        if (userPermissions && userPermissions.length > 0) {
            return userPermissions.some(permission => permission.user === userId);
        }
        return false;
    }

    const handelAddUser=()=>{
        setIsUserClickAdd(true); 
        navigate('/addMovie');
    }

    
    
    
    
    
    
    
    
    return (
        <div className='movie-container'>
            <h1>Movies - Subscriptions Web Site</h1>
            <h2>Movies</h2>
            <button className='movie-button' style={{ backgroundColor: isUserClick ? 'lightpink' : '' }} onClick={handleAllMoviesClick}>All Movies</button>
            <button className='movie-button' style={{ backgroundColor: isUserClickAdd ? 'lightpink' : '' }}  onClick={handelAddUser}>Add Movies</button>
            Find Movie : <input  type='text'  id='searchInput' /> <button className='movie-button' onClick={handelFindMovie}>Find</button>
            {movies.map(movie => (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid black', width: '700px', margin: '20px', padding: '20px' }} key={movie._id}>
        <div>
            <img src={movie.Image} alt={movie.Name} />
        </div>
        <div style={{ marginLeft: '20px' }}>
            <h3>{movie.Name}</h3>
            <h3>{new Date(movie.Premiered).getFullYear()}</h3>
            Genres : <p>{movie.Genres}</p>
           <div>
         
                <div>
                    <button className='movie-button' onClick={() => handleEditClick(movie._id)}>Edit</button>
                    <button className='movie-button' onClick={() => handleDeleteClick(movie._id)}>Delete</button>
                </div>
    
          
            </div>

        </div>
        
        <div style={{ marginLeft: '20px', border: '1px solid black', padding: '20px' }}>
            <h3>Subscriptions:</h3>
            <ul>
                {subscriptions
                    .filter(sub => sub.Movies.some(m => m.movieId === movie._id))
                    .map(sub => {
                        const member = members.find(member => member._id === sub.MemberId);
                        const subscriptionDate = new Date(sub.Movies.find(m => m.movieId === movie._id).date);
                        return member ? (
                            <li key={sub._id}>
                                <a href={`/members/${member._id}`}>{member.Name}</a> ({subscriptionDate.toLocaleDateString()})
                            </li>
                        ) : null;
                    })}
            </ul>
        </div>
     
        
    </div>
    
))}
   <br/>
    <br/>
            <div>

            </div>

          

            <div>
            </div>
        </div>
    )
}

export default Movies;

