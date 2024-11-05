import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addAsyncMovie = createAsyncThunk('movies/add-movie', async(movieData, {rejectWithValue})=>{
    try{
        const response = await axios.post('http://localhost:3000/movies', movieData);
        return response.data
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const fetchAsyncMovie = createAsyncThunk('movies/get-movie', async(_, {rejectWithValue})=> {
    try{
        const response = await axios.get('http://localhost:3000/movies');
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const updateAsyncMovie = createAsyncThunk('movies/update-movie', async(movieData, {rejectWithValue})=>{
    try{
        const response = await axios.put(`http://localhost:3000/movies/${movieData.id}`, movieData);
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})

export const deleteAsyncMovie = createAsyncThunk('movies/delete-movie', async(movieId, {rejectWithValue})=> {
    try{
        const response = await axios.delete(`http://localhost:3000/movies/${movieId}`);
        return response.data;
    }catch(error){
        return rejectWithValue(error.message);
    }
})


export const movieSlice = createSlice({
    name:'movies',
    initialState:{
        movies:[],
        status:'idle',
        error: null
    },
    reducers:{},
    // get movie 
    extraReducers: (builder) =>{
        builder.addCase(fetchAsyncMovie.pending, (state)=>{
            state.status = 'loading';
        })
        builder.addCase(fetchAsyncMovie.fulfilled, (state,action)=> {
            state.status = 'success',
            state.movies = action.payload;
        })
        builder.addCase(fetchAsyncMovie.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })
         // add movie
         builder.addCase(addAsyncMovie.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(addAsyncMovie.fulfilled, (state,action)=>{
            state.status = "success";
            console.log(action.payload);
            state.movies.push(action.payload);
        })
        builder.addCase(addAsyncMovie.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })

        // delete movie
        builder.addCase(deleteAsyncMovie.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(deleteAsyncMovie.fulfilled, (state,action)=>{
            state.status = "success";
            console.log(action.payload);
            state.movies = state.movies.filter((movie)=> movie._id !== action.payload.movie._id);
        })
        builder.addCase(deleteAsyncMovie.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })

         // update movie
         builder.addCase(updateAsyncMovie.pending, (state)=>{
            state.status = "loading"
        })
        builder.addCase(updateAsyncMovie.fulfilled, (state,action)=>{
            state.status = "success";
            const movieIndex = state.movies.findIndex((movie)=> movie._id === action.payload._id);

            if(movieIndex !== -1){
                state.movies[movieIndex] = action.payload
            }
        })
        builder.addCase(updateAsyncMovie.rejected, (state,action)=>{
            state.status = 'error';
            state.error = action.payload
        })
    }
})

export default movieSlice.reducer;