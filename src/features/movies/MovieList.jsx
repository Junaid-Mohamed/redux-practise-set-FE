import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAsyncMovie } from "./movieSlice";



const MovieList = ({movies}) => {

    const dispatch = useDispatch();

    return(
        <div>
          {movies?.map((movie)=>(
            <div key={movie._id}>
                <h3>Title: {movie.title}</h3>
                <p>Director: {movie.director}</p>
                <p>Genre: {movie.genre}</p>
                <p>Rating: {movie.rating}</p>
                <p>Release year: {movie.releaseYear}</p>
                <Link to={'/add-movie'} state={{movie}} > Edit Movie</Link>
                <button onClick={()=> dispatch(deleteAsyncMovie(movie._id))} >Delete Movie</button>
            </div>
          ))}
        </div>
    )
}

export default MovieList;