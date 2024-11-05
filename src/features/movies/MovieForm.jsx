import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addAsyncMovie, updateAsyncMovie } from "./movieSlice";

const MovieForm = () =>{

    const dispatch = useDispatch();

    const movie = useLocation().state?.movie;

    useEffect(()=>{
        if(movie){
            setMovieFormData({
                id: movie._id,
                title: movie.title,
                director: movie.director,
                releaseYear: movie.releaseYear,
                rating:movie.rating,
                genre:movie.genre 
            })
        }else{
            setMovieFormData({
                id:"",
                title:"",
                director:"",
                releaseYear:"",
                rating:"",
                genre:"" 
            })
        }
    },[movie])


    const [movieFormData, setMovieFormData] = useState({
        id:"",
        title:"",
        director:"",
        releaseYear:"",
        rating:"",
        genre:""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setMovieFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    const handleSubmit = () => {
        if(movie){
            dispatch(updateAsyncMovie(movieFormData));
            setMovieFormData({
                id:"",
                title:"",
                director:"",
                releaseYear:"",
                rating:"",
                genre:""
                })
        }else{ 
        dispatch(addAsyncMovie(movieFormData));
        setMovieFormData({
        id:"",
        title:"",
        director:"",
        releaseYear:"",
        rating:"",
        genre:""
        })
    }

    }
    return(
        <div>
            <h1>Movie Form</h1>
            <label>Title: </label><br />
            <input type="text" name="title" onChange={handleChange} value={movieFormData.title}/><br /><br />
            <label>Director: </label><br />
            <input type="text" name="director" onChange={handleChange} value={movieFormData.director}/><br /><br />
            <label>Release year: </label><br />
            <input type="text" name="releaseYear" onChange={handleChange} value={movieFormData.releaseYear}/><br /><br />
            <label>Rating: </label><br />
            <input type="text" name="rating" onChange={handleChange} value={movieFormData.rating}/><br /><br />
            <label>Genre: </label><br />
            <input type="text" name="genre" onChange={handleChange} value={movieFormData.genre}/><br /><br />
            <button onClick={handleSubmit} >{movie ? `Save Movie` : `Add Movie` }</button>
        </div>
    )
}

export default MovieForm;