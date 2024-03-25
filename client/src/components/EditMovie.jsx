import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const EditMovie = ({ movie, onCancelEdit }) => {
    const urlMovie = 'http://localhost:5000/movies';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [editPageVisible, setEditPageVisible] = useState(true);
    const [movieData, setMovieData] = useState({
        Name: movie.Name ,
        Genres: movie.Genres,
        Image: movie.Image,
        Premiered: movie.Premiered 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const updateMovieData = async () => {
        const MovieIdString = movie._id.toString();
        const updatedMovie = { ...movieData };

        try {
            const response = await fetch(`${urlMovie}/${MovieIdString}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedMovie)
            });

            if (response.ok) {
                setIsUpdate(true);
                setEditPageVisible(false);
                dispatch({type:'UPDATE_MOVIE' , payload:updatedMovie})
                setSuccessMessage('Movie Update successfully. Click "OK" to go back to the all Movies Page.');
            } else {
                console.error('Failed to update movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    const handleCancelClick = () => {
        onCancelEdit();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovieData();
    };

    const handleAlertClose = () => {
        setSuccessMessage('');
        setIsUpdate(false);
        onCancelEdit();
    }

    return (
        <div className='movie-container'>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name : <input className='input-field' type='text' name="Name" value={movieData.Name} onChange={handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    Genres : <input className='input-field' type='text' name="Genres" value={movieData.Genres} onChange={handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    Image : <input className='input-field' type='text' name="Image" value={movieData.Image} onChange={handleInputChange} />
                </label>
                <br />
                <br />
                <label>
                    Premiered : <input className='input-field' type='date' name="Premiered" value={movieData.Premiered} onChange={handleInputChange} />
                </label>
                <br />
                <br />
                <Button className='movie-button' type="submit">Update</Button>
                <Button className='movie-button' type="button" onClick={handleCancelClick}>Cancel</Button>
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
    );
};

export default EditMovie;
