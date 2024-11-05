import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "../features/Books/bookSlice";
import { movieSlice } from "../features/movies/movieSlice";

export default configureStore({
    reducer:{
        books: bookSlice.reducer,
        movies: movieSlice.reducer,
    }
})