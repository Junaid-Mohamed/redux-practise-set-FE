import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import MovieList from "./movieList";
import MovieList from "./movieList";
import { fetchAsyncMovie } from "./movieSlice";

const MovieView = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchAsyncMovie());
    },[])

    const {movies, status, error} = useSelector((state)=> state.movies);

    return(
        <div>
            <h1>Movie View</h1>
            {status === "loading" && <p>loading</p>}
            {error && <p>{error}</p>}
            {status === "success" && <MovieList movies={movies} /> }
          
        </div>
    )
}

export default MovieView;