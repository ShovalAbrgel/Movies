import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const AddMovie = () => {
    const urlMovie = 'http://localhost:5000/addMovie';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [movies, setMovies] = useState({
        Name: "",
        Genres: [""],
        Image: "",
        Premiered: ""
    });

    const handleSaveMovieClick = async () => {
        try {
            const config = {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...movies })
            }
            const resp = await fetch(urlMovie, config);

            if (!resp.ok) {
                throw new Error(`Failed to add movie`);
            }

            const data = await resp.json();
            console.log("Response from server:", data);
            if (data) {
                dispatch({ type: 'ADD_NEW_MOVIE', payload: data });
                setIsSaved(true);
                setSuccessMessage('Movie added successfully. Click "OK" and go to see the new movie!');
                setMovies({
                    Name: "",
                    Genres: [""],
                    Image: "",
                    Premiered: ""
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAlertClose = () => {
        setSuccessMessage('');
        setIsSaved(false);    
    
    }

    const handelCancelClick=()=>{
        navigate('/movies');
    }

    return (
        <div>
            <h2>Add Movie</h2>
            <form>
            Name: <input type='text' value={movies.Name} onChange={(e) => setMovies({ ...movies, Name: e.target.value })} />
                <br/>
                <br/>
            Genres:  <input type='text' value={movies.Genres} onChange={(e) => setMovies({ ...movies, Genres: [e.target.value] })} />
                <br/>
                <br/>
            Image url:   <input type='text' value={movies.Image} onChange={(e) => setMovies({ ...movies, Image: e.target.value })} />
                <br/>
                <br/>
            Premiered:    <input type='date' value={movies.Premiered} onChange={(e) => setMovies({ ...movies, Premiered: e.target.value })} />
                <br/>
                <br/>
                <Button  type="button" onClick={handleSaveMovieClick}>Save</Button>         
                <Button type="button" onClick={handelCancelClick}>Cancel</Button>

                <Alert
                            severity="success"
                            onClose={handleAlertClose}
                            style={{ visibility: isSaved ? 'visible' : 'hidden' }}
                        >
                            {successMessage}
                            <Button style={{margin:'10px'}} variant="contained" onClick={handleAlertClose}>OK</Button>
                        </Alert>
            </form>
        </div>
    )
}

export default AddMovie;
